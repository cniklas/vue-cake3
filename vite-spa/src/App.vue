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
})
</script>
