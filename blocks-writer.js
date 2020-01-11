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
	return result[0] && result[0]['last'] || 0;
}

const getHeight = async () => {
	const response = await axios.get('http://localhost:6869/blocks/height');
	return response.data.height;
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
		const step = 99;
		const gap = 500;
		let lastHeight = await getLastHeight();
		for (;;) {
			const height = await getHeight();
			if (height < lastHeight + gap) {
				await new Promise(r => setTimeout(r, 60000));
				continue;
			}
			const from = lastHeight + 1;
			if (from > height - gap) {
				await new Promise(r => setTimeout(r, 60000));
				continue;
			}
			const to = from + step > height - gap ? height - gap : from + step;
			const headers = await getBlockHeaderSeq({ from, to });
			const promises = headers.map(async header => {
				const result = await influx.query(
					`select "height" from blocks where "height" = ${header.height}`,
				);
				if (result.length > 0) {
					throw new Error('height already exists');
				}
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
								generatingBalance: header.generatingBalance,
							},
							tags: {
								generator: header.generator,
							},
							timestamp: new Date(header.timestamp)
						}
					],
				);
			})
			await Promise.all(promises);
			lastHeight = to;
		}
	} catch (e) {
		console.log(e);
	}
}

main();