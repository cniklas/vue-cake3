<template>
	<div>
		<h1>Vue-Cocktails</h1>

		<div v-if="cocktails.length" class="cocktails">
			<div class="cocktail" v-for="item in cocktails" :key="item.id" :class="{'odd' : item.odd}">
				<router-link :to="{ name: 'cocktails-edit', params: { id: item.id } }" tag="dl" class="inline-list is-link">
					<dt>Id</dt>
					<dd>{{ item.id }}</dd>
					<dt>Name</dt>
					<dd>{{ item.attributes.name }}</dd>
					<dt>Description</dt>
					<dd>{{ item.attributes.description }}</dd>
				</router-link>

				<button type="button" @click.stop="deleteItem(item.id)">löschen</button>
			</div>
		</div>

		<p v-else>
			{{ errorMessage || 'Cocktails werden geladen …' }}
		</p>

		<p v-if="remaining > 0">
			<strong>… und {{ remaining }} weitere …</strong>
		</p>

		<!--
		<hr>

		<template v-if="cocktail">
			<h2>Cocktail #3</h2>

			<div class="cocktails">
				<div class="cocktail">
					<dl class="inline-list">
						<dt>Name</dt>
						<dd>{{ cocktail.attributes.name }}</dd>
						<dt>Description</dt>
						<dd>{{ cocktail.attributes.description }}</dd>
					</dl>
				</div>
			</div>
		</template>

		<p v-else>
			Cocktail #3 wird geladen …
		</p> -->
	</div>
</template>

<script>
export default {
	data () {
		return {
			cocktails: [],
			count: 0,
			cocktail: null,
			errorMessage: ''
		}
	},

	computed: {
		remaining() {
			return this.count - this.cocktails.length
		}
	},

	methods: {
		deleteItem(id) {
			this.$http.delete(`/cocktails/${id}`)
				.then(() => {
					const item = this.cocktails.find(item => item.id === id);
					this.cocktails.splice(this.cocktails.indexOf(item), 1);
				})
				.catch(() => {
				})
		}
	},

	mounted () {
		this.$http.get('/cocktails')
			.then(({data}) => {
				this.cocktails = data.data
				this.cocktails.map((item, index) => item.odd = !(index % 2))
				this.count = data.meta.record_count
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
					this.errorMessage = error.response.data.errors[0].detail
				}
			})

		// this.$http.get('/cocktails/3')
		// 	.then(({data}) => {
		// 		this.cocktail = data.data
		// 	})
		// 	.catch((/* error */) => {
		// 		// console.error(error)
		// 	})

		/**
		 * Der JSON-Response scheint der gleiche zu sein, egal, ob Axios normal oder das jsonapi-vuex-Modul verwendet wird.
		 * Evtl. habe ich das Modul aber noch nicht tief genug getestet
		 */
		// this.$store.dispatch('jv/get', 'cocktails')
		// 	.then((data) => {
		// 		console.log(data)
		// 	})
		// 	.catch(error => {
		// 		console.error(error)
		// 	})
	}
}
</script>

<style>
.cocktails {
	display: flex;
	gap: .75rem;
	flex-wrap: wrap;
	justify-content: center;
	text-align: left;
}

.cocktail {
	background-color: hsl(153, 37%, 71%);
	flex: 0 1 220px;
	padding: .75rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.cocktail.odd {
	background-color: hsl(153, 60%, 80%)
}

.cocktail:only-child {
	background-color: hsl(8, 60%, 80%);
}

.inline-list { margin: 0 0 1rem; }
.inline-list dt, .inline-list dd { display: inline; margin: 0; }
.inline-list dt { font-weight: 700; }
.inline-list dt:after { content: ':'; }
.inline-list dd:before { content: '\0020'; }
.inline-list dd:after { content: '\a'; white-space: pre; }

.is-link {
	cursor: pointer;
}
</style>