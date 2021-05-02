<template>
	<nav>
		<router-link to="/">Home</router-link>
		<ul>
			<li v-for="route in routes" :key="route.to">
				<router-link :to="route.to" :class="{ active: isActive(route.to) }">{{ route.text }}</router-link>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const routes = [
	{ to: '/cocktails', text: 'Cocktails' },
	{ to: '/authenticate', text: 'Authenticate' }
]
const router = useRouter()

// the activeRoute value is created as computed so that it’s automatically updated whenever the router object changes
const activeRoute = computed(() => router.currentRoute.value.path)

// 'path' ist der Parameter, der an `isActive()` übergeben wird
const isActive = path => path === activeRoute.value
</script>