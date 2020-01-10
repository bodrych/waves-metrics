const Influx = require('influx');
const axios = require('axios');

const influx = new Influx.InfluxDB({
	host: 'localhost',
	database: 'waves',
	schema: [
		{
			measurement: 'blocks',
			fields: {
				height: Influx.FieldType.INTEGER,
				transactionCount: Influx.FieldType.INTEGER,
				totalFee: Influx.FieldType.INTEGER,
				reward: Influx.FieldType.INTEGER,
				blocksize: Influx.FieldType.INTEGER,
				generatingBalance: Influx.FieldType.INTEGER,
			},
			tags: [
				'generator',
			],
		},
	]
});

const getLastHeight = async () => {
	const result = await influx.query(
		`select last("height") from blocks`,
	);
	return result[0] && result[0]['height'] || 0;
}

const getHeight = async () => {
	const response = await axios.get('http://localhost:6869/blocks/height');
	return response.data.height;
}

const getGeneratingBalance = async ({ address, height }) => {
	const response = await axios.get(`http://localhost:6869/addresses/generatingBalance/${address}/${height}`);
	return response.data.balance;
}

const getBlockHeader = async ({ height }) => {
	const response = await axios.get(`http://localhost:6869/blocks/headers/at/${height}`);
	return response.data;
}

const getBlockHeaderSeq = async ({ from, to }) => {
	const response = await axios.get(`http://localhost:6869/blocks/headers/seq/${from}/${to}`);
	return response.data;
}

const main = async () => {
	try {
		let lastHeight = await getLastHeight();
		for (;;) {
			const height = await getHeight();
			if (height < lastHeight + 500) {
				await new Promise(r => setTimeout(r, 60000));
				continue;
			}
			const header = await getBlockHeader({ height: lastHeight + 1 });
			const result = await influx.query(
				`select "height" from blocks where "height" = ${header.height}`,
			);
			if (result.length > 0) {
				return;
			}
			const generatingBalance = await getGeneratingBalance({ address: header.generator, height: header.height });
			await influx.writePoints(
				[
					{
						measurement: 'blocks',
						fields: {
							height: header.height,
							transactionCount: header.transactionCount,
							totalFee: header.totalFee,
							reward: header.reward,
							blocksize: header.blocksize,
							generatingBalance,
						},
						tags: {
							generator: header.generator,
						},
						timestamp: new Date(header.timestamp)
					}
				],
			);
		}
	} catch (e) {
		console.log(e);
	}
}

main();