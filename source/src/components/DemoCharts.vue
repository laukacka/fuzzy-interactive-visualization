<template>
  <div>
    <b-button v-for='graph in graphs' v-on:click='currentGraph = graph' :key="graph.id">
      {{ graph }}
    </b-button>
    <component v-bind:is='currentGraph'></component>
  </div>
</template>

<script>
  import BaseBarChart from '@/components/charts/BaseBarChart';
  import BaseDoughnutChart from '@/components/charts/BaseDoughnutChart';
  import BasePolarAreaChart from '@/components/charts/BasePolarAreaChart';
  import BaseBubbleChart from '@/components/charts/BaseBubbleChart';
  import BaseScatterChart from "@/components/charts/BaseScatterChart";
  import BasePieChart from "@/components/charts/BasePieChart";
  import BaseLineChart from "@/components/charts/BaseLineChart";
  import BaseRadarChart from "@/components/charts/BaseRadarChart";

  export default {
    components: {BaseRadarChart, BaseLineChart, BasePieChart, BaseScatterChart, BaseBubbleChart, BaseDoughnutChart, BaseBarChart, BasePolarAreaChart},
    data() {
      return {
        currentGraph: 'BaseBarChart',
        graphs: ['BaseBarChart', 'BaseBubbleChart', 'BaseScatterChart', 'BasePieChart', 'BaseLineChart', 'BasePolarAreaChart', 'BaseDoughnutChart', 'BaseRadarChart'],
        //buttons: ['outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'light']
      }
    }
  }
</script>

<style scoped>

</style>
