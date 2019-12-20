const Influx = require('influx');
const axios = require('axios');

const influx = new Influx.InfluxDB({
	host: 'localhost',
	database: 'waves',
	schema: [
		{
			measurement: 'pool',
			fields: {
				size: Influx.FieldType.INTEGER,
			},
			tags: [],
		},
		{
			measurement: 'peers',
			fields: {
				amount: Influx.FieldType.INTEGER,
			},
			tags: [],
		}
	]
});

const checkPool = async () => {
	try {
		const response = await axios.get('http://localhost:6869/transactions/unconfirmed/size');
		await influx.writePoints(
			[
				{
					measurement: 'pool',
					fields: {
						size: +response.data.size,
					},
				}
			],
			{
				retentionPolicy: '1h',
			}
		);
	} catch (e) {
		console.log(e);
	}
}

const checkPeers = async () => {
	try {
		const response = await axios.get('http://10.7.96.3:3000/api/status');
		await influx.writePoints(
			[
				{
					measurement: 'peers',
					fields: {
						amount: response.data.active_peers_count,
					},
				}
			],
			{
				retentionPolicy: '2h',
			}
		);
	} catch (e) {
		console.log(e);
	}
}

checkPool();
setInterval(checkPool, 10 * 1000);
checkPeers();
setInterval(checkPeers, 5 * 60 * 1000);