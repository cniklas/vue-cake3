<template>
	<h1>Login</h1>

	<form @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="username">Username:</label>
			<input v-model.trim="username" type="text" id="username" name="loginUsername">
		</div>

		<div class="input-group">
			<label for="password">Password:</label>
			<input v-model.trim="password" type="password" id="password">
		</div>

		<!-- <p v-if="errorCode === 401">Invalid login info.</p> -->
		<p v-if="errorCode" class="error-message">
			{{ errorCode }}: {{ errorMessage }}
		</p>

		<button type="submit">Login</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../useStore'

const router = useRouter()
const { login } = useStore()

const username = ref('')
const password = ref('')
const errorCode = ref(null)
const errorMessage = ref('')
const isSubmitLocked = ref(false)

const onSubmit = async () => {
	if (!isSubmitLocked.value) {
		isSubmitLocked.value = true
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
			errorCode.value = error.response?.status
			errorMessage.value = error.response?.data?.data?.message ?? error.response?.statusText ?? ''
			isSubmitLocked.value = false
		}
	}
}
</script>
