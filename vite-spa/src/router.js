import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Authenticate from './views/Authenticate.vue'

const history = createWebHistory()
const routes = [
	{ path: '/', component: Home },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/authenticate', component: Authenticate },
]
const router = createRouter({ history, routes })

export default router