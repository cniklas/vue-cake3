<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<AppNav />
	<router-view />
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from './store'
import AppNav from './components/AppNav.vue'

const { autoLogin } = useStore()
onBeforeMount(() => {
	autoLogin()

	// axios.interceptors.response.use(
	// 	response => response,
	// 	error => {
	// 		console.log(error.response)
	// 		if (error.response.status === 401) {
	// 			this.$router.push('/')
	// 			this.$store.dispatch('logout')
	// 		}
	// 		return Promise.reject(error)
	// 	}
	// )
})
</script>

<!-- <style lang="scss">
@import './index.scss';
</style> -->
