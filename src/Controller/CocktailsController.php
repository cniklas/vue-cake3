<?php
namespace App\Controller;

use App\Controller\AppController;

class CocktailsController extends AppController
{
	public $paginate = [
		'page' => 1, // Do NOT change the default `page` used for the index resultset to prevent frustrating further tests
		'limit' => 10,
		'maxLimit' => 100,
		// 'fields' => [
		// 	'id', 'name', 'description'
		// ],
		'sortWhitelist' => [
			'id', 'name'/*, 'description'*/
		],

		'sort' => 'id',
		'direction' => 'desc',
	];
}