import Vue from 'vue';
import Vuex from 'vuex';
import * as API from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		poolData: [],
		peersData: [],
	},
	mutations: {
		setPoolData: (state, value) => state.poolData = value,
		setPeersData: (state, value) => state.peersData = value,
	},
	actions: {
		fetchPoolData: async ({ commit }) => {
			const data = await API.fetchPoolData();
			commit('setPoolData', data);
		},
		fetchPeersData: async ({ commit }) => {
			const data = await API.fetchPeersData();
			commit('setPeersData', data);
		},
	},
	getters: {
		getPoolData: (state) => state.poolData,
		getPeersData: (state) => state.peersData,
	},
	modules: {
	}
});
