<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <radar-chart :data="radarChart.data" :options="radarChart.options"></radar-chart>
    </div>
  </div>
</template>

<script>
  import RadarChart from "../vue-chartjs/RadarChart";

  export default {
    components: {
      RadarChart
    },
    data() {
      return {
        radarChart: {
          data: {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [{
              label: 'Dataset 1',
              borderWidth: 2,
              borderColor: '#f3ff0e',
              pointBackgroundColor: '#0c0d10',
              pointRadius: 2,
              backgroundColor: 'rgba(255, 255, 0, 0.3)',
              data: [65, 59, 90, 81, 100, 55, 40]
            }, {
              label: 'Dataset 2',
              borderWidth: 2,
              borderColor: '#2d353c',
              pointBackgroundColor: '#e2ff13',
              pointRadius: 2,
              backgroundColor: 'rgba(45, 53, 60, 0.3)',
              data: [28, 48, 40, 29, 96, 27, 100]
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
