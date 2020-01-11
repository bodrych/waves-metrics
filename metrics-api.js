const Influx = require('influx');
const http = require('http');
const _ = require('lodash');
const app = require('express')();

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
		const limits = await influx.query(
			`select first(height) from blocks; select last(height) from blocks`
		);
		const result = await influx.query(
			`select round(sum(mean)) from (select mean(generatingBalance) from blocks where time >= ${limits[0][0][0]['time']} and time <= ${limits[0][0][1]['time']} group by time(1d), generator fill(none)) where time >= ${limits[0][0][0]['time']} and time <= ${limits[0][0][1]['time']} group by time(1d) fill(0)`,
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
