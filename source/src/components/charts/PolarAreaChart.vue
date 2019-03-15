<template>
  <div>
    <router-link to="/demoCharts">
      <b-button>Back</b-button>
    </router-link>
    <pie-chart :data="pieChart.data" :options="pieChart.options" class="height-sm"></pie-chart>
    <!-- <jankin-kolac :data="pieChart.data1" :options="pieChart.options" class="height-sm"></jankin-kolac>
    <jankin-kolac :data="pieChart.data2" :options="pieChart.options" class="height-sm"></jankin-kolac> -->
  </div>
</template>

<script>
    export default {
        name: "PolarAreaChart"
    }
</script>

<style scoped>

</style>
