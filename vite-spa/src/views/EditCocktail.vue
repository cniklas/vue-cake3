<template>
	<h1>Cocktail {{ `#${id}` }}</h1>

	<form v-if="form" @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="name">Name:</label>
			<input v-model="form.name" type="text" id="name">
		</div>

		<div class="input-group">
			<label for="description">Description:</label>
			<input v-model="form.description" type="text" id="description">
		</div>

		<button type="submit">Speichern</button>
	</form>
</template>

<script setup>
import { defineProps, toRefs, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const props = defineProps({
	id: String
})
const { id } = toRefs(props)

const router = useRouter()

const form = reactive({
	name: '',
	description: ''
})

const { cocktails, hasLoaded } = useStore()
const getCocktail = () => {
	if (hasLoaded.value) {
		const cocktail = cocktails.value.find(item => item.id === +id.value)
		if (cocktail !== undefined) {
			form.name = cocktail.name
			form.description = cocktail.description
		}
	}
	else {
		// go to /cocktails first to fetch cocktails from database
		router.push({ name: 'cocktails' })
	}
}

const onSubmit = () => {
	console.log('onSubmit');
}

onMounted(() => {
	getCocktail()
})
</script>

<style lang="scss" scoped>

</style>