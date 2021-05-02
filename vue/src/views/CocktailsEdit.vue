<template>
	<div>
		<h1>Cocktail bearbeiten</h1>

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
	props: ['id'],
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

			const data = JSON.stringify({ data: { type: 'cocktails', id: this.id, attributes: this.cocktail } })

			this.$http
				// .patch('/cocktails/', data)
				.patch(`/cocktails/${this.id}`, data)
				.then(() => {
					this.$router.push({ name: 'home' })
				})
				.catch(() => {
				})
		}
	},

	mounted () {
		this.$http.get(`/cocktails/${this.id}`)
			.then(({data}) => {
				this.cocktail = data.data.attributes
			})
			.catch((/* error */) => {
				// console.error(error)
			})
	}
}
</script>
