import Vue from 'vue';
import Vuex from 'vuex';
import * as API from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		poolData: [],
		peersData: [],
		generatingBalanceData: [],
	},
	mutations: {
		setPoolData: (state, value) => state.poolData = value,
		setPeersData: (state, value) => state.peersData = value,
		setGeneratingBalanceData: (state, value) => state.generatingBalanceData = value,
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
		fetchGeneratingBalanceData: async ({ commit }) => {
			const data = await API.fetchGeneratingBalanceData();
			commit('setGeneratingBalanceData', data);
		},
	},
	getters: {
		getPoolData: (state) => state.poolData,
		getPeersData: (state) => state.peersData,
		getGeneratingBalanceData: (state) => state.generatingBalanceData,
	},
	modules: {
	}
});
