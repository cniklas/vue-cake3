<template>
	<h1>Cocktail {{ `#${id}` }}</h1>

	<form v-if="form" @submit.prevent="onSubmit" novalidate>
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
import { defineProps, ref, toRefs, toRaw, reactive, computed, onBeforeMount } from 'vue'
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
const submit = ref(null) // template ref
const isInputEmpty = computed(() => Object.values(form).some(entry => entry === ''))
const isFormLocked = ref(false)

const { cocktails, hasLoaded, editCocktail } = useStore()
const getCocktail = () => {
	if (hasLoaded.value) {
		// prop `id`: String
		// item.id: Number
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

const onSubmit = async () => {
	if (!isFormLocked.value) {
		isFormLocked.value = true

		// submit.value.setAttribute('disabled', 'disabled')
		// @todo bei SUCCESS Formular mit bounce back nach oben(?) rausfahren
		try {
			await editCocktail(id.value, { ...toRaw(form) })
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
