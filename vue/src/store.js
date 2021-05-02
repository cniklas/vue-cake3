import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { jsonapiModule } from 'jsonapi-vuex'

Vue.use(Vuex)

// https://github.com/mrichar1/jsonapi-vuex
const api = axios.create({
	baseURL: 'https://localhost.test/vue-cake3/api/',
	headers: {
		'Accept': 'application/vnd.api+json',
		'Content-Type': 'application/vnd.api+json',
	},
})
// get meta information like 'record_count'
const config = { preserveJson: true }

export default new Vuex.Store({
	modules: {
		jv: jsonapiModule(api, config),
	},

	state: {

	},
	mutations: {

	},
	actions: {

	}
})
