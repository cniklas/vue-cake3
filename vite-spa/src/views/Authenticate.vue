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
[data-page='authenticate'] {
	background-color: hsl(210deg, 55%, 92%);

	form {
		background-color: #fff;
		border-radius: .5rem;
		padding: 1.5rem 1.5rem 1rem;
		width: calc(15em + 3rem);

		transform: translateY(0);
		filter: drop-shadow(1px 2px 0.25rem hsl(0deg 0% 0% / 0.2));
	}

	form:focus-within {
		transform: translateY(-0.25rem);
		filter: drop-shadow(2px 4px 1rem hsl(0deg 0% 0% / 0.2));
	}

	@media (prefers-reduced-motion: no-preference) {
		form {
			transition: filter 300ms, transform 300ms;
			will-change: transform;
		}
	}
}

.auth-link {
	font-size: 0.8em;

	a {
		text-decoration: underline;
		color: inherit;
		cursor: pointer;
	}
}
</style>