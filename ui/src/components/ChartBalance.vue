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
          text: "Average Generating Balance"
        },
        subtitle: {
          text: ""
        },
        scrollbar: {
          enabled: false,
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
          min: 0
        },
        rangeSelector: {
          buttons: [
            {
              type: "week",
              count: 1,
              text: "1w",
            },
            {
              type: "month",
              count: 1,
              text: "1m",
            },
            {
              type: "month",
              count: 3,
              text: "3m",
            },
            {
              type: "month",
              count: 6,
              text: "6m",
            },
            {
              type: "ytd",
              text: "ytd",
            },
            {
              type: "year",
              count: 1,
              text: "1y",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "all",
              text: "all",
            }
          ],
          inputEnabled: false
        },
        exporting: {
          menuItemDefinitions: {
            update: {
              text: "Update",
              onclick: () => {
                this.fetchGeneratingBalanceData();
              }
            },
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
              valueDecimals: 8
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
            name: "Generating balance",
            data: [],
            color: "rgba(66, 165, 245, 1)",
            type: "areaspline",
            // compare: 'percent',
            // compareStart: true,
          }
        ]
      }
    };
  },
  mounted() {
    if (this.getGeneratingBalanceData.length === 0) this.fetchGeneratingBalanceData();
    this.$refs.hc.chart.hideLoading();
  },
  computed: {
    ...mapGetters(['getGeneratingBalanceData'])
  },
  watch: {
    getGeneratingBalanceData: {
      handler(newValue) {
        this.chartOptions.series[0].data = newValue;
      },
      immediate: true,
    }
  },
  methods: {
    ...mapActions(['fetchGeneratingBalanceData'])
  }
};
</script>

<style scoped>
  .chart {
    height: 500px;
  }
</style>