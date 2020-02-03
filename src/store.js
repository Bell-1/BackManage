import Vue from 'vue'
import Vuex from 'vuex'

import user from './store/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		http: null,
	},
	mutations: {
		/**
		 * 设置store中的全局 http
		 * @param {*} state 
		 * @param {*} http 
		 */
		setHttp(state, http){
			state.http = http;
		},
	},
	actions: {
	},
	modules: {
		user
	}
})