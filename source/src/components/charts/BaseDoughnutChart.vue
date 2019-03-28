<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <doughnut-chart :data="doughnutChart.data" :options="doughnutChart.options"></doughnut-chart>
    </div>
  </div>
</template>

<script>
  import DoughnutChart from '../vue-chartjs/DoughnutChart'

  export default {
    components: {
      DoughnutChart
    },
    data() {
      return {
        doughnutChart: {
          data: {
            labels: ['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5'],
            datasets: [{
              data: [200, 100, 90, 50, 143],
              borderColor: ['#048205', '#b61323', '#060986', '#b6ad08', '#88008a'],
              backgroundColor: ['#35ff1b', '#ee1733', '#0a20d6', '#f4f039', '#a038a0'],
              borderWidth: 2,
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
