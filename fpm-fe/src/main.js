import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//vue bootstrap
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
//vuex
import store from "./store"
//vue axios
import axios from 'axios'
import VueAxios from 'vue-axios'
//vue cookies
import VueCookie from 'vue3-cookies'
//vue carousel

library.add(fas)

axios.defaults.baseURL = 'http://api.fpm.local'

createApp(App)
.use(BootstrapVue3)
.use(router)
.use(store)
.use(VueAxios, axios)
.use(VueCookie)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
