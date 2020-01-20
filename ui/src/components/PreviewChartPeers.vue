<template>
  <highcharts
    :constructor-type="'chart'"
    class="chart"
    :options="chartOptions"
    :updateArgs="updateArgs"
    ref="hc"
  ></highcharts>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      updateArgs: [true, true, false],
      chartOptions: {
        chart: {
          animation: false,
          // height: 200,
          // width: 200,
          events: {
            load() {
              this.showLoading();
            }
          }
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false
        },
        xAxis: {
          type: "datetime",
          labels: {
            enabled: true,
            style: {
              fontSize: '7px',
            },
          },
        },
        yAxis: {
          title: {
            enabled: false,
          },
          labels: {
            enabled: true,
            style: {
              fontSize: '7px',
            },
          },
        },
        exporting: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
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
              radius: 0,
            },
            lineWidth: 0.5,
            states: {
              hover: {
                enabled: false,
              }
            },
            threshold: null,
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
            name: "Total nodes",
            data: [],
            color: "rgba(66, 165, 245, 1)",
            type: "areaspline",
          }
        ]
      }
    };
  },
  async mounted() {
    if (this.getPeersData.length === 0) await this.fetchPeersData();
    this.$refs.hc.chart.hideLoading();
  },
  computed: {
    ...mapGetters(['getPeersData'])
  },
  watch: {
    getPeersData: {
      handler(newValue) {
        this.chartOptions.series[0].data = newValue;
      },
      immediate: true,
    }
  },
  methods: {
    ...mapActions(['fetchPeersData'])
  }
};
</script>

<style scoped>
  .chart {
    height: 200px;
  }
</style>