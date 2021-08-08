import { reactive, computed } from 'vue'
import axios from 'axios'
import JsonApiResponseConverter from 'json-api-response-converter'

const state = reactive({
	cocktails: [],
	recordCount: null,
	hasLoaded: false,
	user: null,
	isNewUser: false
})

axios.defaults.baseURL = import.meta.env.DEV ? 'https://localhost.test/vue-cake3/api' : 'https://myplanner.de/cocktails-ep/api'

const _saveUserData = (userData) => {
	localStorage.setItem('user', JSON.stringify(userData))
	state.user = userData

	axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
	axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'

	axios.defaults.headers.post['Content-Type'] = 'application/vnd.api+json'
	axios.defaults.headers.patch['Content-Type'] = 'application/vnd.api+json'
	// https://stackoverflow.com/a/51098921
	if (import.meta.env.DEV) {
		axios.defaults.headers.delete['Access-Control-Allow-Origin'] = 'https://localhost.test'
	}
}

export const useStore = () => ({
	cocktails: computed(() => state.cocktails),
	recordCount: computed(() => state.recordCount),
	hasLoaded: computed(() => state.hasLoaded),

	fetchCocktails: async () => {
		const response = await axios.get('/cocktails')

		// console.table(response);
		state.cocktails = new JsonApiResponseConverter(response.data).formattedResponse
		state.recordCount = response.data.meta?.record_count ?? null
		state.hasLoaded = true
	},

	editCocktail: async (id, attributes) => {
		const data = JSON.stringify({ data: { type: 'cocktails', id, attributes } })
		const response = await axios.patch(`/cocktails/${id}`, data)

		const index = state.cocktails.findIndex(item => item.id === +id)
		if (index !== -1) {
			state.cocktails[index] = new JsonApiResponseConverter(response.data).formattedResponse
		}
	},

	addCocktail: async (attributes) => {
		const data = JSON.stringify({ data: { type: 'cocktails', attributes } })
		const response = await axios.post('/cocktails', data)

		/**
		 * We’re changing the cocktails array in an immutable way, always attributing to it a new array instead of changing the current value.
		 * That’s a safer and always recommended way to work with arrays and objects to ensure reactivity works.
		 */
		state.cocktails = [
			new JsonApiResponseConverter(response.data).formattedResponse,
			...state.cocktails
		]
		state.recordCount += 1
	},

	deleteCocktail: async (id) => {
		await axios.delete(`/cocktails/${id}`)

		state.cocktails = state.cocktails.filter(c => c.id !== id)
		state.recordCount -= 1
	},

	user: computed(() => state.user),
	isNewUser: computed(() => state.isNewUser),

	setIsNewUser: (val) => {
		state.isNewUser = !!val
	},

	register: async (credentials) => {
		const response = await axios.post('/users/register', { ...credentials, active: true }, {
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		})

		if (response.data?.data?.token) {
			_saveUserData({ username: credentials.username, token: response.data.data.token })
		}
	},

	login: async (credentials) => {
		const response = await axios.post('/users/token', credentials, {
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		})

		if (response.data?.data?.token) {
			_saveUserData({ username: credentials.email, token: response.data.data.token })
		}
	},

	autoLogin() {
		const user = localStorage.getItem('user')
			? JSON.parse(localStorage.getItem('user'))
			: {}
		if (!user.token) {
			return
		}

		// const expiresOn = localStorage.getItem('expiresOn')
		// const now = new Date()
		// if (expiresOn <= now) {
		// 	return false
		// }

		_saveUserData({ username: user.username ?? '', token: user.token })
	},

	logout: () => {
		localStorage.removeItem('user')
		location.reload()
	}
})
