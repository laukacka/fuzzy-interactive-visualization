<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <bar-chart :data="barChart.data" :options="barChart.options"></bar-chart>
    </div>
  </div>
</template>

<script>
  import BarChart from '../vue-chartjs/BarChart'

  export default {
    name: "BarChart",
    components: {
      BarChart
    },
    data() {
      let randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
      };
      return {
        barChart: {
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Bar 1',
              borderWidth: 2,
              borderColor: '#27b624',
              backgroundColor: '#50b624',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
              label: 'Bar 2',
              borderWidth: 2,
              borderColor: '#ab0509',
              backgroundColor: '#ee1733',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
