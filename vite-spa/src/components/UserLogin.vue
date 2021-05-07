<template>
	<h1>Login</h1>

	<form @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="username">Username:</label>
			<input v-model="username" type="text" id="username">
		</div>

		<div class="input-group">
			<label for="password">Password:</label>
			<input v-model="password" type="password" id="password">
		</div>

		<!-- <p v-if="status === 401">Invalid login info.</p> -->
		<p v-if="errorCode" class="error-message">
			{{ errorCode }}: {{ errorMessage }}
		</p>

		<button type="submit">Login</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { login } = useStore()

const username = ref('')
const password = ref('')
// const status = ref(null)
const errorCode = ref(null)
const errorMessage = ref('')

const onSubmit = async () => {
	// status.value = null
	// errorCode.value = null

	try {
		await login({
			username: username.value,
			password: password.value
		})
		router.push({ name: 'cocktails' })
	}
	catch (error) {
		/**
		 * error.message `Network Error`, wenn Server nicht erreichbar
		 */
		// console.table(error.response)
		// status.value = error.response.status
		errorCode.value = error.response.status
		errorMessage.value = error.response.data?.data?.message ?? ''
	}
}
</script>
