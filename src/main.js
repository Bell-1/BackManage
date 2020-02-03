import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './units/http.js'

import './scss/global.scss'

Vue.prototype.$http = http;
store.commit('setHttp', http);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')