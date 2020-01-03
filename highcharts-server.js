const exporter = require('highcharts-export-server');
const http = require('http');
const app = require('express')();
const axios = require('axios');

const { PORT } = process.env;

http.createServer(app).listen(PORT, function() {
  console.log('Listening on port ' + PORT)
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('*', async (req, res) => {
  const response = await axios.get('http://localhost:3000/peers')
  const data = response.data;
  var exportSettings = {
    options: {
        title: {
            text: 'Total number of nodes'
        },
        subtitle: {
            text: 'Preview'
        },
        credits: {
          enabled: true,
          href: 'https://waves-metrics.badr.dev',
          text: 'waves-metrics.badr.dev'
        },
        legend: {
          enabled: false
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
          title: {
            text: 'Total nodes'
          },
          min: 0,
        },
        plotOptions: {
          areaspline: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, 'rgba(66, 165, 245, 1)'],
                [1, 'rgba(66, 165, 245, 0)'],
              ]
            },
            marker: {
              radius: 1
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [
            {
                type: 'areaspline',
                data,
                color: 'rgba(66, 165, 245, 1)',
            },
        ]
    }
  };

  exporter.initPool();

  exporter.export(exportSettings, function(err, result) {
    exporter.killPool();
    if (err) {
      console.log(err);
      res.status(500).end();
      return;
    }
    const buf = Buffer.from(result.data, 'base64');
    res.set('Content-Type', 'image/png')
    res.set('Cache-Control', 'public, immutable, no-transform, s-maxage=3600, max-age=3600');
    res.status(200).send(buf);
  });
})