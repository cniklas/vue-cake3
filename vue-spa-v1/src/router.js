import Vue from 'vue'
import Router from 'vue-router'
import CocktailsList from '@/views/CocktailsList.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: CocktailsList
		},
		{
			path: '/add',
			name: 'cocktails-add',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "cocktail-add" */ '@/views/CocktailsAdd')
		},
		{
			path: '/:id',
			name: 'cocktails-edit',
			component: () => import(/* webpackChunkName: "cocktail-edit" */ '@/views/CocktailsEdit'),
			props: true
		}
	]
})
