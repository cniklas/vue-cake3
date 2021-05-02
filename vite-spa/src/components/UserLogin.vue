<template>
	<h1>Login</h1>

	<form @submit.prevent="login">
		<label for="email">Email:</label>
		<input v-model="email" type="email">

		<label for="password">Password:</label>
		<input v-model="password" type="password">

		<p v-if="status === 400">
			Invalid login info.
		</p>

		<button type="submit">Login</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const status = ref(null)

const login = () => {
	// this.$store
	// 	.dispatch('login', {
	// 		email: email.value,
	// 		password: password.value
	// 	})
	// 	.then(() => { this.$router.push({ name: 'cocktails' }) })
	// 	.catch(err => { status.value = err.response.status })
	console.log('tbd: dispatch "login"')
}
</script>
