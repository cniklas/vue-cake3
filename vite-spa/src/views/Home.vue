<template>
	<h1>Home</h1>

	<!-- <template v-if="!this.$store.state.user"> -->
	<template v-if="true">
		<div>
			To use the app, you'll need to
			<router-link to="authenticate" @click.native="isNew(false)">Login</router-link>
			or
			<router-link to="authenticate" @click.native="isNew(true)">Register</router-link>
		</div>
	</template>
</template>

<script setup>
const isNew = (isNewUser) => {
	// this.$store.dispatch('isNewUser', !isNewUser)
	console.log('tbd: dispatch "isNewUser"')
}
</script>
