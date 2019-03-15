<template>
  <div>
    <router-link to="/pieChart">
      <b-button variant="outline-primary">Pie chart</b-button>
    </router-link>
    <router-link to="/barChart">
      <b-button variant="outline-secondary">Bar chart</b-button>
    </router-link>
    <router-link to="/bubbleChart">
      <b-button variant="outline-success">Bubble chart</b-button>
    </router-link>
    <router-link to="/doughnutChart">
      <b-button variant="outline-danger">Doughnut chart</b-button>
    </router-link>
    <router-link to="/lineChart">
      <b-button variant="outline-warning">Line chart</b-button>
    </router-link>
    <router-link to="/scatter">
      <b-button variant="outline-info">Polar area chart</b-button>
    </router-link>
    <router-link to="/polarAreaChart">
      <b-button variant="outline-dark">Radar chart</b-button>
    </router-link>
    <router-link to="/radarChart">
      <b-button variant="outline-primary">Scatter</b-button>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "DemoCharts"
  }
</script>

<style scoped>

</style>
