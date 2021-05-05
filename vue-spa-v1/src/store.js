import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { jsonapiModule } from 'jsonapi-vuex'

Vue.use(Vuex)

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTU5NTg3NDU4OH0.e8MfoPPAU7pbqr34N7frBG_pbKCi3Ah6Pc0SHfquWQU'
// https://github.com/mrichar1/jsonapi-vuex
const api = axios.create({
	baseURL: 'https://localhost.test/vue-cake3/api',
	headers: {
		'Accept': 'application/vnd.api+json',
		'Content-Type': 'application/vnd.api+json',
		'Authorization': `Bearer ${token}`
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
