<template>
  <v-card>
    <v-card-text>
      <highcharts
        :constructor-type="'stockChart'"
        class="chart"
        :options="chartOptions"
        :updateArgs="updateArgs"
      ></highcharts>
    </v-card-text>
  </v-card>
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
          type: "areaspline",
          animation: false,
          zoomType: "x",
          panning: true,
          panKey: "shift",
          style: {
            fontFamily: "'Roboto', sans-serif"
          }
          // height: 600,
        },
        title: {
          text: "Unconfirmed Transactions Pool Size"
        },
        subtitle: {
          text: ""
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
              type: "hour",
              count: 1,
              text: "1h",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "day",
              count: 1,
              text: "1d",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "all",
              text: "all",
              dataGrouping: {
                enabled: false,
              },
            }
          ],
          inputEnabled: false,
          // selected: 1,
        },
        scrollbar: {
          enabled: true,
        },
        exporting: {
          menuItemDefinitions: {
            update: {
              text: "Update",
              onclick: () => {
                this.fetchPeersData();
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
                // valueDecimals: 0
            },
          }
        },
        series: [
          {
            name: "Pool size",
            data: [],
            color: "rgba(66, 165, 245, 1)"
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchPoolData();
  },
  computed: {
    ...mapGetters(["getPoolData"])
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    getPoolData(newValue) {
      this.chartOptions.series[0].data = newValue;
      // this.chartOptions.subtitle.text = `${(new Date(newValue[0][0])).toUTCString()} - ${(new Date(newValue[newValue.length-1][0])).toUTCString()}`;
    }
  },
  methods: {
    ...mapActions(["fetchPoolData"])
  }
};
</script>
