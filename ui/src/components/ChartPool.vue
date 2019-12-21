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
            panning: true,
            panKey: 'shift',
            fontFamily: '\'Roboto\', sans-serif',
          },
          title: {
            text: 'Unconfirmed Transactions Pool Size'
          },
          subtitle: {
            text: ''
          },
          credits: {
              enabled: true,
              href: 'https://metrics.badr.dev',
              text: 'metrics.badr.dev'
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
              // update: {
              //   text: 'Update',
              //   onclick: () => {
              //     this.fetchPoolData();
              //   },
              // },
              contextButton: {
                // symbol: null,
                // text: 'test',
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
          series: [{
            name: 'Pool size',
            data: [],
            color: 'rgba(66, 165, 245, 1)'
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
        // this.chartOptions.subtitle.text = `${(new Date(newValue[0][0])).toUTCString()} - ${(new Date(newValue[newValue.length-1][0])).toUTCString()}`;
      },
    },
    methods: {
      ...mapActions([ 'fetchPoolData' ]),
    }
  }
</script>
