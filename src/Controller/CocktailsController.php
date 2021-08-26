<?php
namespace App\Controller;

use App\Controller\AppController;

class CocktailsController extends AppController
{
	// https://api.cakephp.org/3.9/class-Cake.Controller.Component.PaginatorComponent.html#$_defaultConfig
	public $paginate = [
		'page' => 1,
		'limit' => 10,
		'maxLimit' => 100,
		// 'fields' => [
		// 	'id', 'name', 'description'
		// ],
		// 'sortWhitelist' => [
		// 	'id', 'name',
		// ],
		'sort' => 'id',
		'direction' => 'desc',
	];
}