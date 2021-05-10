import { createWebHistory, createRouter } from 'vue-router'
import { useStore } from './store'
import Home from './views/Home.vue'
// import Authenticate from './views/Authenticate.vue'
const Authenticate = () => import('./views/Authenticate.vue')
const Cocktails = () => import('./views/Cocktails.vue')
const ListCocktails = () => import('./views/ListCocktails.vue')
const AddCocktail = () => import('./views/AddCocktail.vue')
const EditCocktail = () => import('./views/EditCocktail.vue')

const { user } = useStore()

const history = createWebHistory()
const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/authenticate', component: Authenticate },
	{ path: '/cocktails', component: Cocktails,
		children: [
			{ path: '', name: 'cocktails', component: ListCocktails },
			{ path: 'add', name: 'add-cocktail', component: AddCocktail },
			{ path: ':id', name: 'edit-cocktail', component: EditCocktail, props: true }
		]
	},

	// @deprecated
	// https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
	// { path: '*', redirect: { name: 'home' }}
	{ path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
]
const router = createRouter({ history, routes })

router.beforeEach((to, from, next) => {
	// redirect to auth page if user is not logged in and trying to access a restricted page
	const publicPages = ['/authenticate', '/']
	const authRequired = !publicPages.includes(to.path)

	if (authRequired && !user.value) {
		return next('/authenticate')
	}

	next()
})

export default router
