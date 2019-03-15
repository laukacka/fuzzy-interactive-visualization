<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">

      <!-- begin panel -->
      <panel
         title="Bubble Chart">
        <bubble-chart :data="bubbleChart.data" :options="bubbleChart.options" class="height-sm"></bubble-chart>
      </panel>
      <!-- end panel -->
    </div>
  </div>
</template>

<script>
  import BubbleChart from '../vue-chartjs/BubbleChart'
  import Panel from "@/components/tokokjkfkl/Panel";

  export default {
    components: {
      Panel,
      BubbleChart
    },
    data() {
      return {
        bubbleChart: {
          data: {
            labels: "Africa",
            datasets: [{
              label: ["China"],
              backgroundColor: "rgba(255,221,50,0.2)",
              borderColor: "rgba(255,221,50,1)",
              data: [{
                x: 21269017,
                y: 2.545,
                r: 15
              }]
            }, {
              label: ["Denmark"],
              backgroundColor: "rgba(60,186,159,0.2)",
              borderColor: "rgba(60,186,159,1)",
              data: [{
                x: 2508702,
                y: 3.526,
                r: 10
              }]
            }, {
              label: ["Germany"],
              backgroundColor: "rgba(0,0,0,0.2)",
              borderColor: "#000",
              data: [{
                x: 3979083,
                y: 4.794,
                r: 15
              }]
            }, {
              label: ["Japan"],
              backgroundColor: "rgba(193,46,12,0.2)",
              borderColor: "rgba(193,46,12,1)",
              data: [{
                x: 10931877,
                y: 5.021,
                r: 15
              }]
            }]
          },
          options: {
            title: {
              display: true,
              text:
                'Predicted world population (millions) in 2050'
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Happiness"
                }
              }],
              xAxes:
                [{
                  scaleLabel: {
                    display: true,
                    labelString: "GDP (PPP)"
                  }
                }]
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
