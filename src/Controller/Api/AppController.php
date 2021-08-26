<?php
/**
 * One of the great things about CakePHP 3 prefix routing is the automatic mapping to sub-namespaces which allows us to separate concern by creating dedicated controller files for (just) our API logic inside the src/Controller/Api subdirectory.
 *
 * To optimize separation even further we will create an AppController dedicated to the Api namespace that all controllers in the Api namespace will extend (instead of extending the application’s AppController).
 */
namespace App\Controller\Api;

use Cake\Controller\Controller;
use Cake\Event\Event;

class AppController extends Controller
{

	use \Crud\Controller\ControllerTrait;


	public function initialize()
	{
		parent::initialize();

		$this->loadComponent('RequestHandler', [
			'enableBeforeRedirect' => false,
		]);
		$this->loadComponent('Flash');

		/*
		 * Enable the following component for recommended CakePHP security settings.
		 * see https://book.cakephp.org/3.0/en/controllers/components/security.html
		 */
		// $this->loadComponent('Security');


		$this->loadComponent('Crud.Crud', [
			'actions' => [
				'Crud.Index',
				'Crud.View',
				'Crud.Add',
				'Crud.Edit',
				'Crud.Delete'
			],
			'listeners' => [
				'Crud.Api', // für User-Registrierung
				// 'Crud.ApiPagination',
				'Crud.ApiQueryLog',

				// /!\ ALL requests to your new API MUST use the application/vnd.api+json Accept Header
				// /!\ ALL requests with POST data MUST use the application/vnd.api+json Content-Type Header
				'CrudJsonApi.JsonApi',
				'CrudJsonApi.Pagination',
			]
		]);


		// JSON Web Token (JWT)
		$this->loadComponent('Auth', [
			// we use Memory based non-persistent storage for the authenticated user (instead of Cake’s session based default)
			'storage' => 'Memory',
			'authenticate' => [
				// FormAuthenticate MUST be included here or AuthComponent will not be able to validate the posted (non-JWT) JSON credentials during the `/token` action
				'Form' => [
					'scope' => ['Users.active' => 1]
				],

				'ADmad/JwtAuth.Jwt' => [
					'parameter' => 'token',
					'userModel' => 'Users',
					'scope' => ['Users.active' => 1],
					'fields' => [
						// `username` denotes the identifier field for fetching user record. The `sub` claim of JWT must contain identifier value
						'username' => 'id'
					],
					// by enabling `queryDataSource` the `sub` field in the JWT token will be used to query the database for user information (using the User model)
					'queryDatasource' => true
				]

			],
			'unauthorizedRedirect' => false,
			// `checkAuthIn` makes user information available in all Controller beforeFilter() functions
			'checkAuthIn' => 'Controller.initialize'
		]);
	}
}
