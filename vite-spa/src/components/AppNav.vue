<template>
	<nav>
		<router-link to="/">Home</router-link>

		<template v-if="user">
			<router-link to="/cocktails">Cocktails</router-link>
			<span class="nav-welcome">Hello, {{ user?.username }}</span>
			<button type="button" @click="logout">Log out</button>
		</template>

		<template v-else>
			<router-link to="/authenticate" class="button">Login</router-link>
		</template>
	</nav>
</template>

<script setup>
import { useStore } from '../useStore'

const { user, logout } = useStore()
</script>

<style lang="scss" scoped>
nav {
	display: flex;
	align-items: center;
	padding: 0.657em 1em;
	background: linear-gradient(to right, #16c0b0, #84cf6a);
	color: #0d0d0d;
}

.nav-welcome {
	margin-left: auto;
	margin-right: 1rem;
	color: #fff;
	display: none;
}

a {
	color: inherit;
	margin: 0 0.8em;
	text-decoration: none;
	border-bottom: 2px solid transparent;
}

.router-link-active {
	color: #fff;
	border-bottom-color: currentColor;
}

button,
.button {
	border: none;
	background: none #fff;
	text-decoration: none;
	color: inherit;
	height: auto;
	margin-top: unset;
	margin-bottom: unset;
	margin-left: auto;

	&.router-link-active {
		color: inherit;
	}
}

@media (min-width: 540px) {
	.nav-welcome {
		display: revert;
	}

	.nav-welcome + button {
		margin-left: 0;
	}
}
</style>