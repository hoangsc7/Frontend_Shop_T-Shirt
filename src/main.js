import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL_BE
console.log('Base URL:', process.env.VUE_APP_URL_BE)

// axios.defaults.baseURL = 'backend-shop-t-shirt.onrender.com'
createApp(App).use(store).use(router).mount('#app')
