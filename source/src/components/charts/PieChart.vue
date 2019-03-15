<template>
  <div>
    <DemoCharts></DemoCharts>
    <router-link to="/demoCharts">
      <b-button>Back</b-button>
    </router-link>
    <pie-chart :data="pieChart.data" :options="pieChart.options" class="height-sm"></pie-chart>
    <!-- <jankin-kolac :data="pieChart.data1" :options="pieChart.options" class="height-sm"></jankin-kolac>
    <jankin-kolac :data="pieChart.data2" :options="pieChart.options" class="height-sm"></jankin-kolac> -->
  </div>
</template>

<script>
  //import JankinKolac from './vue-chartjs/JankinKolac'
  //import Demo from './DemoTable'
  //import JaJaLaLeJu from "./JaJaLaLeJu"
  import PieChart from '../vue-chartjs/PieChart'
  import DemoCharts from "@/components/DemoCharts";

  export default {
    components: {
      DemoCharts,
      PieChart
    },
    data() {
      return {
        pieChart: {
          data: {
            labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
            datasets: [{
              data: [300, 50, 100, 40, 120],
              backgroundColor: ['rgba(0, 91, 87, 0.7)', 'rgba(245, 156, 26, 0.7)', 'rgba(240, 243, 244, 0.7)', 'rgba(182, 194, 201, 0.7)', 'rgba(45, 53, 60, 0.7)'],
              borderColor: ['#ff5b57', '#f59c1a', '#b4b6b7', '#b6c2c9', '#2d353c'],
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
