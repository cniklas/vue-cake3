<template>
	<div>
		<h1>Cocktail hinzufügen</h1>

		<form ref="form" @submit.prevent="submitForm" role="form" accept-charset="utf-8">
			<div class="input">
				<label for="name">Name</label>
				<input type="text" v-model="cocktail.name" id="name" required>
			</div>

			<div class="input">
				<label for="description">Description</label>
				<input type="text" v-model="cocktail.description" id="description" required>
			</div>

			<div>
				<button type="submit" ref="submit" :disabled="isEmpty">Speichern</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			cocktail: {
				name: '',
				description: ''
			}
		}
	},

	computed: {
		isEmpty() {
			return this.cocktail.name === '' || this.cocktail.description === ''
		}
	},

	methods: {
		submitForm() {
			this.$refs.submit.setAttribute('disabled', 'disabled')

			const data = JSON.stringify({ data: { type: 'cocktails', attributes: this.cocktail } })

			this.$http
				.post('/cocktails', data)
				.then(() => {
					this.$router.push({ name: 'home' })
				})
				.catch(() => {
				})
		}
	}
}
</script>
