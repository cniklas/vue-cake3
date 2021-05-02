<?php
namespace App\Controller\Api;

use App\Controller\Api\AppController;

class CocktailsController extends AppController
{
	public $paginate = [
		'page' => 1, // Do NOT change the default `page` used for the index resultset to prevent frustrating further tests
		'limit' => 10,
		'maxLimit' => 15,
		'sortWhitelist' => [
			'id', 'name',
		],

		'sort' => 'id',
		'direction' => 'desc',
	];
}