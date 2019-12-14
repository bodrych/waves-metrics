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

influx.getDatabaseNames().then(console.log)