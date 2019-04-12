<template>
  <line-chart :data="data" :options="options"></line-chart>
</template>

<script>
  import LineChart from "@/components/vue-chartjs/LineChart";

  export default {
    name: "FuzzificationLineChart",
    props: {
      data: Object,
      options: Object
    },
    components: {
      LineChart
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
