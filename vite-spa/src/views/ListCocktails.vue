<template>
	<h1>Cocktails</h1>

	<main v-if="hasLoaded" class="cocktails">
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

			<button type="button" @click.stop="onDelete(item.id)">löschen</button>
		</div>
	</main>

	<p v-else :class="{'error-message': errorCode }">
		{{ errorCode && errorMessage ? `${errorCode}: ${errorMessage}` : 'Cocktails werden geladen …' }}
	</p>

	<p v-if="remaining > 0">
		<strong style="cursor:pointer" @click="getAllCocktails">… und {{ remaining }} weitere …</strong>
	</p>

	<div v-if="hasLoaded">
		<router-link :to="{ name: 'add-cocktail' }" class="button">Add a cocktail</router-link>
	</div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from '../useStore'

const { cocktails, recordCount, hasLoaded, fetchCocktails, deleteCocktail } = useStore()
const errorCode = ref(null)
const errorMessage = ref('')
const handleError = error => {
	errorCode.value = error.response?.status
	errorMessage.value = error.response?.statusText ?? ''

	if (error.response?.data?.errors?.length) {
		errorMessage.value = error.response.data.errors[0].detail ?? errorMessage.value
	}
}

const getCocktails = async () => {
	errorCode.value = null

	if (!hasLoaded.value) {
		try {
			await fetchCocktails()
		}
		catch (error) {
			handleError(error)
		}
	}
}
const remaining = computed(() => recordCount.value ? recordCount.value - cocktails.value.length : 0 )
const getAllCocktails = async () => {
	errorCode.value = null

	try {
		await fetchCocktails(true)
	}
	catch (error) {
		handleError(error)
	}
}

const onDelete = async id => {
	if (confirm('Bist du sicher?')) {
		try {
			await deleteCocktail(id)
		}
		catch (error) {
			console.table(error.response)
		}
	}
}

onBeforeMount(() => {
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
	margin-bottom: 1rem;
}

.cocktail {
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
		background:
			linear-gradient(30deg, hsl(174deg 79% 42%), transparent),
			conic-gradient(from -120deg at center 80%, #16c0b0, #84cf6a, #16c0b0);
	}

	// &:only-child {
	// 	background: hsl(8, 60%, 80%);
	// }

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
				white-space: pre-line;
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
}
</style>
