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