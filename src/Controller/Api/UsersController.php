<?php
namespace App\Controller\Api;

use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;
use Cake\Utility\Security;
use Firebase\JWT\JWT;

class UsersController extends AppController
{
	public function initialize()
	{
		parent::initialize();

		// standard AuthComponent allow logic to allow non-authenticated access to the /add and /token actions
		// /!\ Auth-allowed actions MUST be set inside initialize() because we enabled the checkAuthIn configuration option
		$this->Auth->allow(['add', 'token']);
	}



	/**
	 * If the user is created successfully a JSON 201 response (Created) will be returned with a response body containing:
	 * - the id of the new user
	 * - a token field containing the new user’s JWT token
	 *
	 * Because the CRUD plugin normally only returns the id of the new record we will add the JWT token to the JSON response body by extending the add() method with some custom CRUD afterSave and serialize logic.
	 */
	public function add()
	{
		$this->Crud->on('afterSave', function(Event $event) {
			if ($event->subject->created) {
				$this->set('data', [
					'id' => $event->subject->entity->id,
					'token' => JWT::encode(
						[
							// Your JWT token (and thus the user information) will NOT contain an id field if you choose to disable the queryDataSource option!
							// This might break code depending on the presence of an id field but is easily solved by manually adding the id field to the JWT token (below `exp`).
							'sub' => $event->subject->entity->id,
							// Even though this is not required we are adding the JWT exp claim to the token payload so the token will expire after one week, effectively forcing the user to request a new unique token using the /token action.
							'exp' => time() + 86400,
						],
						Security::salt()
					)
				]);

				$this->Crud->action()->config('serialize.data', 'data');
			}
		});

		return $this->Crud->execute();
	}



	/**
	 * Users can request their JWT token by JSON posting their username and password to the /token action after which AuthComponent will use FormAuthenticate (and thus not JwtAuth) to validate the credentials.
	 *
	 * If validation is successful a JSON 200 response (Success) will be returned with a response body containing the JWT token.
	 */
	public function token()
	{
		$user = $this->Auth->identify();

		if (!$user) {
			throw new UnauthorizedException('Invalid username or password');
		}

		$this->set([
			'success' => true,
			'data' => [
				'token' => JWT::encode(
					[
						'sub' => $user['id'],
						'exp' => time() + 86400,
					],
					Security::salt()
				)
			],
			'_serialize' => ['success', 'data']
		]);
	}
}