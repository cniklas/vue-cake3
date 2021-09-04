<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
	<AppNav />
	<router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import axios from 'axios'
import { useStore } from './useStore'
import AppNav from './components/AppNav.vue'

const { autoLogin, logout } = useStore()

onBeforeMount(() => {
	autoLogin()

	axios.interceptors.response.use(
		response => response,
		error => {
			// console.log(error.response)
			// CakePHP Auth: Unauthorized || Expired token
			if (error.response?.data?.errors?.[0]?.status === '401' || error.response?.data?.errors?.[0]?.detail === 'Expired token') {
				// router.push('/')
				logout()
			}
			return Promise.reject(error)
		}
	)
})
</script>
