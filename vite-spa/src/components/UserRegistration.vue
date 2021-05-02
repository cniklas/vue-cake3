<template>
	<h1>Registration</h1>

	<form @submit.prevent="register">
		<label for="email">Email:</label>
		<input v-model="email" type="email">

		<label for="password">Password:</label>
		<input v-model="password" type="password">

		<p v-if="status === 400">
			Please enter different info.
		</p>

		<button type="submit">Register</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const status = ref(null)

const register = () => {
	// this.$store
	// 	.dispatch('register', {
	// 		email: email.value,
	// 		password: password.value
	// 	})
	// 	.then(() => { this.$router.push({ name: 'cocktails' }) })
	// 	.catch(err => { status.value = err.response.status })
	console.log('tbd: dispatch "register"')
}
</script>
