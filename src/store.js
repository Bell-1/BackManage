import Vue from 'vue'
import Vuex from 'vuex'

import user from './store/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		alertMsg: {
			show: false,
			content: '',
			type: 'error'
		},
	},
	mutations: {
		showAlert(state, data) {
			state.alertMsg.show = data.show;
			if (data.show) {
				state.alertMsg.content = data.content || '';
				state.alertMsg.type = data.type || 'success';
			}
		}
	},
	actions: {
		showAlert({ commit }, data) {
			commit('showAlert', { show: true, ...data });
			setTimeout(() => {
				commit('showAlert', { show: false, ...data });
			}, 2000)
		}
	},
	modules: {
		user
	}
})