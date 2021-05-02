/**
 * The traditional way of sharing the state is to use Vuex or maybe a High Order Component that controls the state and pass it as props to both components.
 * But we can solve this the Vue 3 way, using the composition API
 */
import { reactive, computed, watch } from 'vue'

const storeName = 'vite-recipe-book-store'
const id = () => '_' + Math.random().toString(36).substr(2, 9)

/**
 * Another bonus is the use of the watch method to make the store state persistent in the localStorage of the user’s browser and the initial configuration of the state as the localStorage saved data or an object with empty ingredients and recipes arrays.
 * This kind of approach can be used to persist the data in a remote API too.
 */
const state = reactive(
	localStorage.getItem(storeName)
		? JSON.parse(localStorage.getItem(storeName))
		: { ingredients: [], recipes: [] }
)
watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)))

export const useStore = () => ({
	// We’re using the computed method inside the useStore function so that our ingredients and recipes arrays can not be updated from outside the store
	ingredients: computed(() =>
		state.ingredients.sort((a, b) => a.name.localeCompare(b.name))
	),

	recipes: computed(() =>
		state.recipes
			.map((recipe) => ({
				...recipe,
				// We’re mapping the ingredients array to its ingredient object.
				// This way we can store just the ingredients id and get the id and the name in our recipes list
				ingredients: recipe.ingredients.map((ingredient) =>
					state.ingredients.find((i) => i.id === ingredient)
				),
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
	),

	addIngredient: (ingredient) => {
		/**
		 * We’re changing the ingredients array in an immutable way, always attributing to it a new array instead of changing the current value.
		 * That’s a safer and always recommended way to work with arrays and objects to ensure reactivity works.
		 */
		state.ingredients = [
			...state.ingredients,
			{ id: id(), name: ingredient },
		]
	},

	// `removeIngredient()` checks if the ingredient (id) is included in a recipe before removing it
	removeIngredient: (ingredient) => {
		if (
			state.recipes.some((recipe) =>
				recipe.ingredients.some((i) => i.id === ingredient.id)
			)
		)
			return

		state.ingredients = state.ingredients.filter(
			(i) => i.id !== ingredient.id
		)
	},

	addRecipe: (recipe) => {
		/**
		 * We’re changing the recipes array in an immutable way, always attributing to it a new array instead of changing the current value.
		 * That’s a safer and always recommended way to work with arrays and objects to ensure reactivity works.
		 */
		state.recipes = [
			...state.recipes,
			{
				id: id(),
				...recipe,
				ingredients: recipe.ingredients.map((i) => i.id),
			},
		]
	},

	removeRecipe: (recipe) => {
		state.recipes = state.recipes.filter((r) => r.id !== recipe.id)
	},
})