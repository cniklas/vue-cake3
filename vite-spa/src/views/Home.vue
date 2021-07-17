<template>
	<h1>Home</h1>

	<div v-if="!user">
		To use the app, you'll need to
		<router-link to="/authenticate" @click.native="setIsNewUser(false)">Login</router-link>
		or
		<router-link to="/authenticate" @click.native="setIsNewUser(true)">Register</router-link>
	</div>

	<div v-else>
		You’re logged in. Wanna have a <router-link to="/cocktails">drink</router-link>?
	</div>
</template>

<script setup>
import { useStore } from '../store'

const { user, setIsNewUser } = useStore()
</script>
