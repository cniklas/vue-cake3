<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
	<AppNav />
	<router-view />
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
import { onBeforeMount } from 'vue'
import { useStore } from './store'
// import HelloWorld from './components/HelloWorld.vue'
import AppNav from './components/AppNav.vue'

const { autoLogin } = useStore()
onBeforeMount(() => {
	autoLogin()
})
</script>

<!--
<style>
/* @import './index.css'; */
</style> -->