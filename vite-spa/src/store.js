// import { reactive, readonly } from 'vue'
import { reactive, computed } from 'vue'
import axios from 'axios'

const state = reactive({
	cocktails: [],
	user: null,
	isNewUser: false
});

// const addCocktail = function(todo) {
// 	if (todo) {
// 		const newTodoObj = {
// 			id: state.nextId,
// 			description: todo,
// 			done: false,
// 		};

// 		state.tasks.push(newTodoObj);
// 		state.nextId++;
// 	}
// }

// const deleteCocktail = function(task) {
// 	state.tasks = state.tasks.filter((todoObj) => todoObj.id !== task.id);
// }

// const isNewUser = function(val) {
// 	state.isNewUser = val
// }

// export default {
// 	state: readonly(state),
// 	addCocktail,
// 	deleteCocktail
// };


export const useStore = () => ({
	// We’re using the computed method inside the useStore function so that our state not be updated from outside
	cocktails: computed(() => state.cocktails),

	loadCocktails: () => {
		state.cocktails = []
	},

	addCocktail: (cocktail) => {
		/**
		 * We’re changing the cocktails array in an immutable way, always attributing to it a new array instead of changing the current value.
		 * That’s a safer and always recommended way to work with arrays and objects to ensure reactivity works.
		 */
		state.cocktails = [
			...state.cocktails,
			cocktail,
		]
	},

	removeCocktail: (cocktail) => {
		state.cocktails = state.cocktails.filter((c) => c.id !== cocktail.id)
	},

	user: computed(() => state.user),
	isNewUser: computed(() => state.isNewUser),

	toggleIsNewUser: (val) => {
		state.isNewUser = !!val
	},

	login: async (credentials) => {
		await axios.post('https://localhost.test/vue-cake3/api/users/token', credentials, {
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		})
	}
})
