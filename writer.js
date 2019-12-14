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
		}
	]
});

const checkPool = async () => {
	try {
		const size = (await axios.get('https://nodes.wavesnodes.com/transactions/unconfirmed/size')).size;
		await influx.writePoints(
			[
				{
					measurement: 'pool',
					fields: {
						size,
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

setInterval(checkPool, 5000);