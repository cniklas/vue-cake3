<template>
	<h1>{{ form.name || 'Create a new cocktail' }}</h1>

	<form v-if="hasLoaded" @submit.prevent="onSubmit" novalidate>
		<div class="input-group">
			<label for="name">Name:</label>
			<input v-model.trim="form.name" type="text" id="name" required>
		</div>

		<div class="input-group">
			<label for="description">Description:</label>
			<input v-model.trim="form.description" type="text" id="description" required>
		</div>

		<button ref="submit" type="submit" :disabled="isInputEmpty">Speichern</button>
	</form>
</template>

<script setup>
import { ref, toRaw, reactive, computed, /* watch, */ onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()

const form = reactive({
	name: '',
	description: ''
})
const submit = ref(null)
// const startValidation = ref(false)
const isInputEmpty = computed(() => /* startValidation.value && */ Object.values(form).some(entry => entry === ''))
const isSubmitLocked = ref(false)

const { hasLoaded, addCocktail } = useStore()

// watch(() => ({...form}), () => {
// 	startValidation.value = true
// })

const onSubmit = async () => {
	if (!isSubmitLocked.value) {
		isSubmitLocked.value = true

		// TODO bei SUCCESS Formular mit bounce back nach oben(?) rausfahren
		try {
			await addCocktail(toRaw(form))
			router.push({ name: 'cocktails' })
		}
		catch (error) {
			console.table(error.response)
		}
	}
}

onBeforeMount(() => {
	if (!hasLoaded.value) {
		// go to /cocktails first to fetch cocktails from database
		router.push({ name: 'cocktails' })
	}
})
</script>
