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
		<p v-if="errorResponse.code">
			{{ errorResponse.code }}: {{ errorResponse.message }}
		</p>

		<button type="submit">Login</button>
	</form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { login } = useStore()

const username = ref('')
const password = ref('')
// const status = ref(null)
const errorResponse = reactive({
	code: null,
	message: ''
})

const onSubmit = async () => {
	// status.value = null
	// errorResponse.code = null

	try {
		await login({
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
	}
}
</script>
