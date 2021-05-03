<template>
	<nav>
		<router-link to="/">Home</router-link>
		<!-- <ul>
			<li v-for="route in routes" :key="route.to">
				<router-link :to="route.to" :class="{ active: isActive(route.to) }">{{ route.text }}</router-link>
			</li>
		</ul> -->

	 <template v-if="user">
			<router-link to="cocktails" :class="{ active: isActive('cocktails') }">Cocktails</router-link>
			<span class="nav-welcome">Hello, {{ user.name }}.</span>
			<button type="button" class="logout-button" @click="logout">Log out</button>
		</template>

		<template v-else>
			<router-link to="authenticate" class="button" :class="{ active: isActive('authenticate') }">Login</router-link>
		</template>
	</nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
// const routes = [
// 	{ to: '/cocktails', text: 'Cocktails' },
// 	{ to: '/authenticate', text: 'Authenticate' }
// ]
// the activeRoute value is created as computed so that it’s automatically updated whenever the router object changes
const activeRoute = computed(() => router.currentRoute.value.path)
// 'path' ist der Parameter, der an `isActive()` übergeben wird
const isActive = path => path === activeRoute.value

const store = useStore()
const user = ref(store.user)

const logout = () => {
	// this.$store.dispatch('logout')
	console.log('tbd: dispatch "logout"')
}
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	align-items: center;
	padding: 0.657em 1em;
	background: linear-gradient(to right, #16c0b0, #84cf6a);
}

.nav-welcome {
	margin-left: auto;
	margin-right: 1rem;
	color: #fff;
}

a {
	color: inherit;
	margin: auto 0.8em;
	text-decoration: none;
	border-bottom: 2px solid transparent;
}

// .router-link-exact-active {
.router-link-active {
	color: #fff;
	border-bottom-color: currentColor;
}

button,
.button {
	border: 0;
	background: none #fff;
	text-decoration: none;
	color: inherit;
	height: auto;
	margin-left: auto;

	&.router-link-active {
		color: inherit;
	}
}

.logout-button {
	cursor: pointer;
}

.nav-welcome + button {
	margin-left: 0;
}
</style>