<template>
  <v-card>
    <v-card-text>
      <highcharts class="chart" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data () {
      return {
        title: '',
        points: [],
        colorInputIsSupported: null,
        updateArgs: [true, true, {duration: 1000}],
        chartOptions: {
          chart: {
            type: 'areaspline',
            zoomType: 'x',
          },
          title: {
            text: 'Waves Unconfirmed Transactions Pool Size - Time Series'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          credits: {
              enabled: false
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
            },
            min: 0,
          },
          exporting: {
            menuItemDefinitions: {
              update: {
                text: 'Update',
                onclick: () => {
                  this.fetchPoolData();
                },
              }
            },
            buttons: {
              contextButton: {
                menuItems: [
                  "update",
                  "viewFullscreen",
                  "printChart",
                  "downloadPNG",
                  "downloadJPEG",
                  "downloadPDF",
                  "downloadSVG",
                ]
              }
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
            name: 'Pool size',
            data: [],
            color: '#0055ff'
          }]
        }
      }
    },
    mounted () {
      this.fetchPoolData();
    },
    computed: {
      ...mapGetters([ 'getPoolData' ]),
    },
    watch: {
      title (newValue) {
        this.chartOptions.title.text = newValue
      },
      getPoolData (newValue) {
        this.chartOptions.series[0].data = newValue
      },
    },
    methods: {
      ...mapActions([ 'fetchPoolData' ]),
    }
  }
</script>
