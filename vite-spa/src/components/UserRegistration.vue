<template>
	<h1>Registration</h1>

	<form @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="username">Username:</label>
			<input v-model.trim="username" type="text" id="username" name="registrationUsername">
			<div v-if="validationErrors?.username" class="input-error-message">
				<span v-for="(error, i) in Object.keys(validationErrors.username)" :key="`username-error-${i}`">{{ validationErrors.username[error] }}</span>
			</div>
		</div>

		<div class="input-group">
			<label for="password">Password:</label>
			<input v-model.trim="password" type="password" id="password">
			<div v-if="validationErrors?.password" class="input-error-message">
				<span v-for="(error, i) in Object.keys(validationErrors.password)" :key="`username-error-${i}`">{{ validationErrors.password[error] }}</span>
			</div>
		</div>

		<!-- <p v-if="errorCode === 401">Please enter different info.</p> -->
		<p v-if="errorCode" class="error-message">
			{{ errorCode }}: {{ errorMessage }}
		</p>

		<button type="submit">Register</button>
	</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../useStore'

const router = useRouter()
const { register } = useStore()

const username = ref('')
const password = ref('')
const errorCode = ref(null)
const errorMessage = ref('')
const validationErrors = ref(null)
const isSubmitLocked = ref(false)

const onSubmit = async () => {
	if (!isSubmitLocked.value) {
		isSubmitLocked.value = true
		// errorCode.value = null
		validationErrors.value = null

		try {
			await register({
				username: username.value,
				password: password.value
			})
			router.push({ name: 'cocktails' })
		}
		catch (error) {
			errorCode.value = error.response?.status
			errorMessage.value = error.response?.data?.data?.message ?? error.response?.statusText ?? ''

			if (error.response?.data?.data?.errorCount) {
				validationErrors.value = { ...error.response.data.data.errors }
			}

			isSubmitLocked.value = false
		}
	}
}
</script>
