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
		const response = await axios.get('https://nodes.wavesnodes.com/transactions/unconfirmed/size');
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
		const response = await axios.get('https://nodes.wavesnodes.com/peers/connected');
		await influx.writePoints(
			[
				{
					measurement: 'peers',
					fields: {
						amount: +response.data.peers.length,
					},
				}
			],
			{
				retentionPolicy: '2d',
			}
		);
	} catch (e) {
		console.log(e);
	}
}

checkPool();
setInterval(checkPool, 5* 1000);
checkPeers();
setInterval(checkPeers, 5 * 60 * 1000);