import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import './index.css'

// axios.defaults.headers.post['Accept'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

createApp(App)
	.use(router)
	.mount('#app')
