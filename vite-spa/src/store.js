import { reactive, computed } from 'vue'
import axios from 'axios'

const state = reactive({
	cocktails: [],
	user: null,
	isNewUser: false
});

const _saveUserData = (userData) => {
	localStorage.setItem('user', JSON.stringify(userData))
	axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
	state.user = userData
}

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

	register: async (credentials) => {
		const response = await axios.post('https://localhost.test/vue-cake3/api/users/register', { ...credentials, active: true }, {
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		})

		_saveUserData({ username: credentials.username, token: response?.data?.data?.token ?? '' })
	},

	login: async (credentials) => {
		const response = await axios.post('https://localhost.test/vue-cake3/api/users/token', credentials, {
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		})

		_saveUserData({ username: credentials.username, token: response?.data?.data?.token ?? '' })
	},

	logout: () => {
		localStorage.removeItem('user')
		location.reload()
	}
})
