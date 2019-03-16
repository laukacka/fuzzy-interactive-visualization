<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      blbost
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
      var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
      };
      return {
        lineChart: {
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Dataset 1',
              borderColor: '#348fe2',
              pointBackgroundColor: '#348fe2',
              pointRadius: 2,
              borderWidth: 2,
              backgroundColor: 'rgba(52, 143, 226, 0.3)',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
              label: 'Dataset 2',
              borderColor: '#2d353c',
              pointBackgroundColor: '#2d353c',
              pointRadius: 2,
              borderWidth: 2,
              backgroundColor: 'rgba(45, 53, 60, 0.3)',
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
