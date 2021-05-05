<template>
	<h1>Registration</h1>

	<form @submit.prevent="onSubmit">
		<div class="input-group">
			<label for="username">Username:</label>
			<input v-model="username" type="text" id="username">
			<div v-if="errorResponse.errors?.username" class="input-error-message">
				<span v-for="(error, i) in Object.keys(errorResponse.errors.username)" :key="`username-error-${i}`">{{ errorResponse.errors.username[error] }}</span>
			</div>
		</div>

		<div class="input-group">
			<label for="password">Password:</label>
			<input v-model="password" type="password" id="password">
			<div v-if="errorResponse.errors?.password" class="input-error-message">
				<span v-for="(error, i) in Object.keys(errorResponse.errors.password)" :key="`username-error-${i}`">{{ errorResponse.errors.password[error] }}</span>
			</div>
		</div>

		<!-- <p v-if="status === 401">Please enter different info.</p> -->
		<p v-if="errorResponse.code" class="error-message">
			{{ errorResponse.code }}: {{ errorResponse.message }}
		</p>

		<button type="submit">Register</button>
	</form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { register } = useStore()

const username = ref('')
const password = ref('')
// const status = ref(null)
const errorResponse = reactive({
	code: null,
	message: '',
	errors: null
})

const onSubmit = async () => {
	// status.value = null
	// errorResponse.code = null
	errorResponse.errors = null

	try {
		await register({
			username: username.value,
			password: password.value
		})
		router.push({ name: 'cocktails' })
	}
	catch (error) {
		// console.table(error.response)
		// status.value = error.response.status
		errorResponse.code = error.response.status
		errorResponse.message = error.response.data?.data?.message ?? ''

		if (error.response.data?.data?.errorCount) {
			errorResponse.errors = { ...error.response.data.data.errors }
		}
	}
}
</script>
