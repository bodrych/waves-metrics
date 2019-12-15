import Vue from 'vue';
import Vuex from 'vuex';
import * as API from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		poolData: [],
	},
	mutations: {
		setPoolData: (state, value) => state.poolData = value,
	},
	actions: {
		fetchPoolData: async ({ commit }) => {
			const data = await API.fetchPoolData();
			commit('setPoolData', data);
		},
	},
	getters: {
		getPoolData: (state) => state.poolData,
	},
	modules: {
	}
});
