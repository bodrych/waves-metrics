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
          },
          // height: 600,
        },
        title: {
          text: "Total number of nodes"
        },
        subtitle: {
          text: ""
        },
        scrollbar: {
          enabled: true,
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
          // min: 0
        },
        rangeSelector: {
          buttons: [
            {
              type: "week",
              count: 1,
              text: "1w",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "month",
              count: 1,
              text: "1m",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "month",
              count: 3,
              text: "3m",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "month",
              count: 6,
              text: "6m",
              dataGrouping: {
                enabled: false,
              },
            },
            {
              type: "ytd",
              text: "ytd",
              dataGrouping: {
                enabled: false,
              },
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
              dataGrouping: {
                enabled: false,
              },
            }
          ],
          inputEnabled: false
        },
        exporting: {
          menuItemDefinitions: {
            update: {
              text: "Update",
              onclick: () => {
                this.fetchPeersData();
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
                // valueDecimals: 0
            },
          },
        },
        series: [
          {
            name: "Total nodes",
            data: [],
            color: "rgba(66, 165, 245, 1)",
          }
        ]
      }
    };
  },
  mounted() {
    this.fetchPeersData();
  },
  computed: {
    ...mapGetters(["getPeersData"])
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    getPeersData(newValue) {
      this.chartOptions.series[0].data = newValue;
      // this.chartOptions.subtitle.text = `${(new Date(newValue[0][0])).toUTCString()} - ${(new Date(newValue[newValue.length-1][0])).toUTCString()}`;
    }
  },
  methods: {
    ...mapActions(["fetchPeersData"])
  }
};
</script>
