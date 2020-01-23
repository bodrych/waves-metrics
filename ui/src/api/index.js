import axios from 'axios';

const apiBase = 'https://api.surfsupnode.com/metrics/';

export const fetchPoolData = async () => {
	try {
		const response = await axios.get(apiBase + 'pool');
		return response.data;
	} catch (e) {
		return [];
	}
}

export const fetchPeersData = async () => {
	try {
		const response = await axios.get(apiBase + 'peers');
		return response.data;
	} catch (e) {
		return [];
	}
}

export const fetchGeneratingBalanceData = async () => {
	try {
		const response = await axios.get(apiBase + 'balance');
		return response.data;
	} catch (e) {
		return [];
	}
}

export const fetchStatusData = async () => {
	try {
		const response = await axios.get(apiBase + 'status');
		return response.data;
	} catch (e) {
		return {};
	}
}