<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <!-- begin panel -->
      <panel title="Bar Chart">
        <bar-chart :data="barChart.data" :options="barChart.options" class="height-sm"></bar-chart>
      </panel>
      <!-- end panel -->

    </div>
  </div>
</template>

<script>
  import BarChart from '../vue-chartjs/BarChart'
  import Panel from "@/components/tokokjkfkl/Panel";

  export default {
    components: {
      Panel,
      BarChart
    },
    data() {
      var randomScalingFactor = function () {
        return Math.round(Math.random() * 100)
      };
      return {
        barChart: {
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Dataset 1',
              borderWidth: 2,
              borderColor: '#727cb6',
              backgroundColor: 'rgba(114, 124, 182, 0.3)',
              data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }, {
              label: 'Dataset 2',
              borderWidth: 2,
              borderColor: '#2d353c',
              backgroundColor: 'rgba(45, 53, 60, 0.3)',
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
