<template>
	<h1>Home</h1>

	<div v-if="!user">
		To use the app, you'll need to
		<router-link to="authenticate" @click.native="setIsNewUser(false)">Login</router-link>
		or
		<router-link to="authenticate" @click.native="setIsNewUser(true)">Register</router-link>
	</div>
</template>

<script setup>
import { useStore } from '../store'

const { user, toggleIsNewUser } = useStore()

const setIsNewUser = (flag) => {
	toggleIsNewUser(flag)
}
</script>
