import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
// import Cocktails from './views/Cocktails.vue'
const Cocktails = () => import('./views/Cocktails.vue')
// import Authenticate from './views/Authenticate.vue'
const Authenticate = () => import('./views/Authenticate.vue')

const history = createWebHistory()
const routes = [
	{ path: '/', component: Home },
	{ path: '/cocktails', component: Cocktails },
	{ path: '/authenticate', component: Authenticate },
]
const router = createRouter({ history, routes })

router.beforeEach((to, from, next) => {
	// redirect to login page if user is not logged in and trying to access a restricted page
	const publicPages = ['/authenticate', '/']
	const authRequired = !publicPages.includes(to.path)
	const isLoggedIn = localStorage.getItem('user')

	if (authRequired && !isLoggedIn) {
		return next('/authenticate')
	}

	next()
})

export default router
