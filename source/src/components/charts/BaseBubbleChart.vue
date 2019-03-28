<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <bubble-chart :data="bubbleChart.data" :options="bubbleChart.options"></bubble-chart>
    </div>
  </div>
</template>

<script>
  import BubbleChart from '../vue-chartjs/BubbleChart'

  export default {
    components: {
      BubbleChart
    },
    data() {
      return {
        bubbleChart: {
          data: {
            labels: "Africa",
            datasets: [{
              label: ["China"],
              backgroundColor: "#2e8aff",
              borderColor: "#0e0d3c",
              data: [{
                x: 20269017,
                y: 2.845,
                r: 15
              }]
            }, {
              label: ["Denmark"],
              backgroundColor: "#2af70a",
              borderColor: "#005c0a",
              data: [{
                x: 2508702,
                y: 3.526,
                r: 15
              }]
            }, {
              label: ["Germany"],
              backgroundColor: "#ff0307",
              borderColor: "#792527",
              data: [{
                x: 3979083,
                y: 4.794,
                r: 15
              }]
            }, {
              label: ["Japan"],
              backgroundColor: "#bfcb0b",
              borderColor: "#7a7741",
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
