<template>
	<component :is="loginOrRegister" />

	<div v-show="isNewUser" class="auth-link">
		Don't have an account?
		<a @click="toggleComponent">Create one</a>
	</div>

	<div v-show="!isNewUser" class="auth-link">
		Already have an account?
		<a @click="toggleComponent">Login</a>
	</div>
</template>

<script setup>
import UserRegistration from '../components/UserRegistration.vue'
import UserLogin from '../components/UserLogin.vue'
import { ref, computed } from 'vue'

const isLogin = ref(true)
const isNewUser = computed(() => {
	// return this.$store.state.isNewUser
	return isLogin.value
})

const loginOrRegister = computed(() => {
	return isNewUser.value ? UserLogin : UserRegistration
})

const toggleComponent = () => {
	// this.$store.dispatch('isNewUser', !this.isNewUser)
	isLogin.value = !isLogin.value
}
</script>

<style lang="scss">
.auth-link {
	font-size: 0.8em;

	a {
		text-decoration: underline;
		color: inherit;
		cursor: pointer;
	}
}
</style>