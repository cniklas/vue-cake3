<template>
	<h1>Cocktail {{ `#${id}` }}</h1>

	<form v-if="cocktailFound" @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="name">Name:</label>
			<input v-model.trim="form.name" type="text" id="name" required>
		</div>

		<div class="input-group">
			<label for="description">Description:</label>
			<input v-model.trim="form.description" type="text" id="description" required>
		</div>

		<button ref="submit" type="submit" :disabled="isInputEmpty">Save</button>
	</form>

	<p v-else>
		Fetching data …
	</p>
</template>

<script setup>
import { ref, toRefs, toRaw, reactive, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../useStore'

const props = defineProps({
	id: String
})
const { id } = toRefs(props)

const router = useRouter()

const cocktailFound = ref(false)
const form = reactive({
	name: '',
	description: ''
})
const submit = ref(null)
const isInputEmpty = computed(() => Object.values(form).some(entry => entry === ''))
const isSubmitLocked = ref(false)

const { cocktails, hasLoaded, fetchCocktails, editCocktail } = useStore()
const getCocktail = async () => {
	if (hasLoaded.value) {
		// prop `id`: String
		// item.id: Number
		const cocktail = cocktails.value.find(item => item.id === +id.value)
		if (cocktail !== undefined) {
			form.name = cocktail.name
			form.description = cocktail.description

			cocktailFound.value = true
		}
		else {
			// TODO error handling
			return router.push({ name: 'cocktails' })
		}
	}

	else {
		try {
			await fetchCocktails()
			getCocktail()
		}
		catch (error) {
			// TODO error handling
			return router.push({ name: 'cocktails' })
		}
	}
}

const onSubmit = async () => {
	if (!isSubmitLocked.value) {
		isSubmitLocked.value = true

		// TODO bei SUCCESS Formular mit bounce back nach oben(?) rausfahren
		try {
			await editCocktail(id.value, toRaw(form))
			router.push({ name: 'cocktails' })
		}
		catch (error) {
			console.table(error.response)
		}
	}
}

onBeforeMount(() => {
	getCocktail()
})
</script>
