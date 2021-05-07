<template>
	<h1>Cocktails</h1>

	<div v-if="hasLoaded" class="cocktails">
		<div class="cocktail" v-for="item in cocktails" :key="item.id">
			<router-link :to="{ name: 'edit-cocktail', params: { id: item.id } }" custom v-slot="{ navigate }">
				<dl @click="navigate" class="inline-list is-link">
					<dt>Id</dt>
					<dd>{{ item.id }}</dd>
					<dt>Name</dt>
					<dd>{{ item.name }}</dd>
					<dt>Description</dt>
					<dd>{{ item.description }}</dd>
				</dl>
			</router-link>

			<button type="button" @click.stop="deleteItem(item.id)">löschen</button>
		</div>
	</div>

	<p v-else :class="{'error-message': errorCode }">
		{{ errorCode && errorMessage ? `${errorCode}: ${errorMessage}` : 'Cocktails werden geladen …' }}
	</p>

	<p v-if="remaining > 0">
		<strong>… und {{ remaining }} weitere …</strong>
	</p>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../store'

const { cocktails, recordCount, hasLoaded, fetchCocktails } = useStore()
const errorCode = ref(null)
const errorMessage = ref('')

// 	methods: {
// 		deleteItem(id) {
// 			this.$http.delete(`/cocktails/${id}`)
// 				.then(() => {
// 					const item = this.cocktails.find(item => item.id === id);
// 					this.cocktails.splice(this.cocktails.indexOf(item), 1);
// 				})
// 				.catch(() => {
// 				})
// 		}
// 	},
const getCocktails = async () => {
	errorCode.value = null

	if (!hasLoaded.value) {
		try {
			await fetchCocktails()
		}
		catch (error) {
			// console.table(error.response)
			errorCode.value = error.response.status
			errorMessage.value = error.response.statusText ?? ''

			if (error.response.data?.errors?.length) {
				errorMessage.value = error.response.data.errors[0].detail ?? errorMessage.value
			}
		}
	}
}
const remaining = computed(() => recordCount.value ? recordCount.value - cocktails.value.length : 0 )

// 	mounted () {
// 		this.$http.get('/cocktails')
// 			.then(({data}) => {
// 				this.cocktails = data.data
// 				this.cocktails.map((item, index) => item.odd = !(index % 2))
// 				this.count = data.meta.record_count
// 			})
// 			.catch((error) => {
// 				if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.length) {
// 					this.errorMessage = error.response.data.errors[0].detail
// 				}
// 			})

// 		// this.$http.get('/cocktails/3')
// 		// 	.then(({data}) => {
// 		// 		this.cocktail = data.data
// 		// 	})
// 		// 	.catch((/* error */) => {
// 		// 		// console.error(error)
// 		// 	})

// 		// this.$store.dispatch('jv/get', 'cocktails')
// 		// 	.then((data) => {
// 		// 		console.log(data)
// 		// 		this.count = data._jv.json.meta.record_count
// 		// 	})
// 		// 	.catch(error => {
// 		// 		console.error(error)
// 		// 	})
// 	}
// }
onMounted(() => {
	getCocktails()
})
</script>

<style lang="scss" scoped>
.cocktails {
	display: flex;
	gap: .75rem;
	flex-wrap: wrap;
	justify-content: center;
	text-align: left;
}

.cocktail {
	// background-color: hsl(153, 37%, 71%);
	background: conic-gradient(from -120deg at center 80%, #16c0b0, #84cf6a, #16c0b0);
	color: #0d0d0d;
	flex: 0 1 220px;
	padding: .75rem;
	border-bottom-left-radius: calc(.75rem + 5px);
	border-bottom-right-radius: calc(.75rem + 5px);

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&:nth-child(odd) {
		// background-color: hsl(153, 60%, 80%)
		position: relative;
		mix-blend-mode: lighten;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			border-radius: inherit;
			background: linear-gradient(30deg, hsl(174deg 79% 42%), transparent);
		}
	}

	&:only-child {
		background-color: hsl(8, 60%, 80%);
	}
}

.inline-list {
	margin: 0 0 1rem;

	dt, dd {
		display: inline;
		margin: 0;
	}

	dt {
		font-weight: 700;

		&::after {
			content: ':';
		}
	}

	dd {
		&::before {
			content: '\0020';
		}

		&::after {
			content: '\a';
			white-space: pre;
		}
	}
}

.is-link {
	cursor: pointer;
}

button,
.button {
	background: none #fff;
	color: inherit;
	margin: 0;
}
</style>
