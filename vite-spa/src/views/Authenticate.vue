<template>
	<component :is="loginOrRegister" />

	<div v-show="!isNewUser" class="auth-link">
		Don't have an account?
		<a @click="toggleComponent">Create one</a>
	</div>

	<div v-show="isNewUser" class="auth-link">
		Already have an account?
		<a @click="toggleComponent">Login</a>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../useStore'
import UserRegistration from '../components/UserRegistration.vue'
import UserLogin from '../components/UserLogin.vue'

const { isNewUser, setIsNewUser } = useStore()

const loginOrRegister = computed(() => {
	return isNewUser.value ? UserRegistration : UserLogin
})

const toggleComponent = () => {
	setIsNewUser(!isNewUser.value)
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