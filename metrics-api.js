const Influx = require('influx');
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
		}
	]
});

http.createServer(app).listen(3000, function() {
	console.log('Listening on port 3000')
})

app.get('/', async (req, res) => {
	try {
		const result = await influx.query(
			`select * from "1w".downsampled_pool`,
			{
				precision: 'ms',
			}
		);
		res.json(result);
	} catch (e) {
		res.status(500).send(err.stack)
	}
})