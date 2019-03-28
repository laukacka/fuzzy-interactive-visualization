<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <pie-chart :data="pieChart.data" :options="pieChart.options"></pie-chart>
    </div>
  </div>
</template>

<script>
  import PieChart from '../vue-chartjs/PieChart'

  export default {
    components: {
      PieChart
    },
    data() {
      return {
        pieChart: {
          data: {
            labels: ['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5'],
            datasets: [{
              data: [200, 100, 230, 59, 111],
              backgroundColor: ['#ffaffb', '#61ff8a', '#63c8ff', '#f6ff7a', '#6b676c'],
              borderColor: ['#ff10c6', '#0f981a', '#204fb7', '#c9b600', '#0c0d10'],
              borderWidth: 2,
              label: 'My dataset'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        },
      }
    }
  }
</script>

<style scoped>

</style>
