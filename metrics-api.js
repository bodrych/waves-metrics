const Influx = require('influx');
const http = require('http');
const _ = require('lodash');
const app = require('express')();
const axios = require('axios)');

const getHeight = async () => {
	const response = await axios.get('http://localhost:6869/blocks/height');
	return response.data.height;
}

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
		},
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

http.createServer(app).listen(3000, function() {
	console.log('Listening on port 3000')
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/pool', async (req, res) => {
	try {
		const result = await influx.query(
			`select * from "1w".downsampled_pool`,
			{
				precision: 'ms',
			}
		);
		const data = _.map(result, (value) => {
			return [ Date.parse(value['time']), value['mean_size'] ]
		})
		res.json(data);
	} catch (e) {
		res.status(500).send(err.stack)
	}
})

app.get('/peers', async (req, res) => {
	try {
		const result = await influx.query(
			`select * from "13w".downsampled_peers`,
			{
				precision: 'ms',
			}
		);
		const data = _.map(result, (value) => {
			return [ Date.parse(value['time']), value['mean_amount'] ]
		})
		res.json(data);
	} catch (e) {
		res.status(500).send(err.stack)
	}
})

app.get('/balance', async (req, res) => {
	try {
		const first = await influx.query(
			`select first(height) from blocks`
		);
		const last = await influx.query(
			`select last(height) from blocks`
		);
		const from = first[0]['time'].getNanoTime();
		const to = last[0]['time'].getNanoTime();
		const result = await influx.query(
			`select round(sum(mean)) from (select mean(generatingBalance) from blocks where time >= ${from} and time <= ${to} group by time(1d), generator fill(none)) where time >= ${from} and time <= ${to} group by time(1d) fill(0)`,
			{
				precision: 'ms',
			}
		);
		const data = _.map(result, (value) => {
			return [ Date.parse(value['time']), value['round'] / 1e8 ]
		})
		res.json(data);
	} catch (e) {
		res.status(500).send(e.stack)
	}
})

app.get('/status', async (req, res) => {
	try {
		const peers = _.head(await influx.query(
			`select last(amount) as value from "2h".peers`
		)).value;
		const balance = _.head(await influx.query(
			`select round(sum(mean)) as value from (select mean(generatingBalance) from blocks where time > now() - 1d group by generator)`
		)).value;
		const txs = _.head(await influx.query(
			`select sum(transactionCount) as value from blocks where time > now() - 1d`
		)).value;
		const delay = _.head(await influx.query(
			`select round(mean(elapsed)) as value from (select elapsed(height)/1000000000 from blocks where time > now() - 7d)`
		)).value;
		const profit = _.head(await influx.query(
			`select sum(a)/sum(b)*52 as value from (select sum(a) as a, mean(b) as b from (select reward+totalFee as a, generatingBalance as b from blocks where time > now() - 7d group by generator) group by generator)`
		)).value;
		const height = await getHeight();
		const data = { peers, balance, txs, delay, profit, height };
		res.json(data);
	} catch (e) {
		res.status(500).send(e.stack)
	}
})