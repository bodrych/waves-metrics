const Influx = require('influx');
const axios = require('axios');

const maxDepth = 10000;
const step = 99;

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
	let lastHeight = await getLastHeight();
	for(;;) {
		const height = await getHeight();
		if (height - lastHeight > maxDepth) {
			throw new Error('maxDepth exceeded');
		}
		if (height < lastHeight + 500) {
			await new Promise(r => setTimeout(r, 1000));
			continue;
		}
		const currentHeight = lastHeight + 1;
		const nextHeight = currentHeight + step > height ? height : currentHeight + step;
		const headers = await getBlockHeaderSeq({ from: currentHeight, to: nextHeight });
		lastHeight = nextHeight;
		headers.forEach(async (item) => {
			const result = await influx.query(
				`select "height" from blocks where "height" = ${item.height}`,
			);
			if (result.length > 0) {
				return;
			}
			const generatingBalance = await getGeneratingBalance({ address: item.generator, height: item.height });
			await influx.writePoints(
				[
					{
						measurement: 'blocks',
						fields: {
							height: item.height,
							transactionCount: item.transactionCount,
							totalFee: item.totalFee,
							reward: item.reward,
							blocksize: item.blocksize,
							generatingBalance,
						},
						tags: {
							generator: item.generator,
						},
						timestamp: new Date(item.timestamp)
					}
				],
			);
		});
	}
}

(async () => {
	try {
		await main();
	} catch(e) {
		console.log(e);
	}
})()