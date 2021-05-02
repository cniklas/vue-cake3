import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
// import Cocktails from './views/Cocktails.vue'
const Cocktails = () => import('./views/Cocktails.vue')
// import Authenticate from './views/Authenticate.vue'
const Authenticate = () => import('./views/Authenticate.vue')

const history = createWebHistory()
const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/cocktails', name: 'cocktails', component: Cocktails },
	{ path: '/authenticate', component: Authenticate },

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
	const isLoggedIn = localStorage.getItem('user')

	if (authRequired && !isLoggedIn) {
		return next('/authenticate')
	}

	next()
})

export default router
