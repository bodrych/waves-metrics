<template>
  <highcharts
    :constructor-type="'stockChart'"
    class="chart"
    :options="chartOptions"
    :updateArgs="updateArgs"
    ref="hc"
  ></highcharts>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      title: "",
      points: [],
      colorInputIsSupported: null,
      updateArgs: [true, true, { duration: 1000 }],
      chartOptions: {
        chart: {
          animation: false,
          zoomType: "x",
          panning: true,
          panKey: "shift",
          style: {
            fontFamily: "'Roboto', sans-serif"
          },
          // height: 500,
          events: {
            load() {
              this.showLoading();
            }
          }
        },
        title: {
          text: "Unconfirmed Transactions Pool Size"
        },
        subtitle: {
          text: ""
        },
        scrollbar: {
          enabled: false
        },
        credits: {
          enabled: true,
          href: "https://waves-metrics.badr.dev",
          text: "waves-metrics.badr.dev"
        },
        legend: {
          enabled: false
        },
        xAxis: {
          type: "datetime"
        },
        yAxis: {
          min: 0,
        },
        rangeSelector: {
          buttons: [
            {
              type: "hour",
              count: 1,
              text: "1h",
            },
            {
              type: "day",
              count: 1,
              text: "1d",
            },
            {
              type: "all",
              text: "all",
            }
          ],
          inputEnabled: false,
          // selected: 1,
        },
        exporting: {
          menuItemDefinitions: {
            update: {
              text: "Update",
              onclick: () => {
                this.fetchPoolData();
              }
            }
          },
          buttons: {
            contextButton: {
              // symbol: null,
              // text: 'test',
              symbolSize: 16,
              symbolX: 16,
              symbolY: 16,
              width: 32,
              height: 32,
              x: 0,
              y: -10,
              menuItems: [
                "update",
                "viewFullscreen",
                "printChart",
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
                "downloadSVG"
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
                [0, "rgba(66, 165, 245, 1)"],
                [1, "rgba(66, 165, 245, 0)"]
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
            threshold: null,
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b><br/>',
              // changeDecimals: 8,
              valueDecimals: 0
            },
          },
          series: {
            animation: false,
            dataGrouping: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: "Pool size",
            data: [],
            color: "rgba(66, 165, 245, 1)",
            type: "areaspline",
          }
        ]
      }
    };
  },
  async mounted() {
    if (this.getPoolData.length === 0) await this.fetchPoolData();
    this.$refs.hc.chart.hideLoading();
  },
  computed: {
    ...mapGetters(['getPoolData'])
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    getPoolData: {
      handler(newValue) {
        this.chartOptions.series[0].data = newValue;
      },
      immediate: true,
    }
  },
  methods: {
    ...mapActions(['fetchPoolData'])
  }
};
</script>

<style scoped>
  .chart {
    height: 500px;
  }
</style>