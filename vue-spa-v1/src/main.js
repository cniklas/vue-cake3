import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$http.defaults.baseURL = 'https://localhost.test/vue-cake3/api'
Vue.prototype.$http.defaults.headers.common['Accept'] = 'application/vnd.api+json'
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/vnd.api+json'
Vue.prototype.$http.defaults.headers.patch['Content-Type'] = 'application/vnd.api+json'
// https://stackoverflow.com/a/51098921
Vue.prototype.$http.defaults.headers.delete['Access-Control-Allow-Origin'] = 'https://localhost.test'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImV4cCI6MTU5NTg3NDU4OH0.e8MfoPPAU7pbqr34N7frBG_pbKCi3Ah6Pc0SHfquWQU'
Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`

new Vue({
	router,
	// store,
	render: h => h(App)
}).$mount('#app')
