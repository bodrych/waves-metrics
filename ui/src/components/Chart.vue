<template>
  <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      colorInputIsSupported: null,
      updateArgs: [true, true, {duration: 1000}],
      chartOptions: {
        chart: {
          type: 'areaspline',
          zoomType: 'x',
        },
        title: {
          text: 'Waves UTX-pool size chart'
        },
        legend: {
          enabled: false
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Pool size'
          }
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
                [0, 'rgba(0, 85, 255, 1)'],
                [1, 'rgba(0, 85, 255, 0)'],
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
        series: [{
          data: [],
          color: '#0055ff'
        }]
      }
    }
  },
  created () {
    this.points.push(10)
  },
  watch: {
    title (newValue) {
      this.chartOptions.title.text = newValue
    },
    points (newValue) {
      this.chartOptions.series[0].data = newValue
    },
  }
}
</script>
