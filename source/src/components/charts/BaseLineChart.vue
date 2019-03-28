<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <line-chart :data="lineChart.data" :options="lineChart.options"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from "../vue-chartjs/LineChart"

  export default {
    components: {
      LineChart
    },
    data() {
      let randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
      };
      return {
        lineChart: {
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Dataset 1',
              borderColor: '#e23ea6',
              pointBackgroundColor: '#ab0ee2',
              pointRadius: 2,
              borderWidth: 2,
              backgroundColor: 'rgba(255, 100, 255, 0.3)',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
              label: 'Dataset 2',
              borderColor: '#0f193c',
              pointBackgroundColor: '#5387cd',
              pointRadius: 2,
              borderWidth: 2,
              backgroundColor: 'rgba(0, 255, 255, 0.3)',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            hover: {
              mode: 'nearest',
              intersect: true
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  max: 100
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
