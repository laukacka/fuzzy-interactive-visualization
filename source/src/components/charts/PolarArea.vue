<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <polar-area-chart :data="polarAreaChart.data" :options="polarAreaChart.options"></polar-area-chart>
    </div>
  </div>
</template>

<script>
  import PolarAreaChart from "../vue-chartjs/PolarAreaChart";

  export default {
    components: {
      PolarAreaChart
    },
    data() {
      return {
        polarAreaChart: {
          data: {
            labels: ['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5'],
            datasets: [{
              data: [258, 160, 98, 179, 75],
              backgroundColor: ['rgb(255, 128, 255, 0.4)', 'rgb(0, 255, 0, 0.4)',
                'rgb(153, 204, 255, 0.4)', 'rgb(255, 102, 0, 0.4)', 'rgb(255, 255, 0, 0.4)'],
              borderColor: ['#2d353c', '#2d353c', '#2d353c', '#2d353c', '#2d353c'],
              borderWidth: 2,
              label: 'My dataset'
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
