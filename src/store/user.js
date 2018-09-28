export default {
	namespaced: true,
	state: {
		userInfo: undefined,
	},
	mutations: {
		loginSuccess(state, payload) {
			state.userInfo = payload;
			localStorage.setItem('userInfo', JSON.stringify(payload))
		},
		logout(state, payload) {
			state.userInfo = undefined;
			localStorage.removeItem('userInfo');
		},
	},
	actions: {
		login({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('loginSuccess', { name: 'Bell' })
					resolve()
				}, 0)
			})
		},

		logout({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('logout');
					resolve()
				}, 500)
			})
		},

		checkLogin({ commit, state, dispatch }) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					let userInfo = localStorage.getItem('userInfo');
					if (userInfo) {
						commit('loginSuccess', JSON.parse(userInfo))
						dispatch('showAlert', {
							content: '登陆成功',
						}, {root: true})
						resolve();
					} else {
						reject();
					}
				}, 200)
			})
		}
	},
}