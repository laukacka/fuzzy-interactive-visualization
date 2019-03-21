<template>
  <div>
    <b-button v-for='graph in graphs' v-on:click='currentGraph = graph' :key="graph.id">
      {{ graph }}
    </b-button>
    <component v-bind:is='currentGraph'></component>
  </div>
</template>

<script>
  import Bar from '@/components/charts/Bar';
  import Doughnut from '@/components/charts/Doughnut';
  import PolarArea from '@/components/charts/PolarArea';
  import Bubble from '@/components/charts/Bubble';
  import Scatter from "@/components/charts/Scatter";
  import Pie from "@/components/charts/Pie";
  import Linee from "@/components/charts/Linee";
  import Radar from "@/components/charts/Radar";

  export default {
    components: {Radar, Linee, Pie, Scatter, Bubble, Doughnut, Bar, PolarArea},
    data() {
      return {
        currentGraph: 'Bar',
        graphs: ['Bar', 'Bubble', 'Scatter', 'Pie', 'Linee', 'PolarArea', 'Doughnut', 'Radar'],
        //buttons: ['outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'light']
      }
    }
  }
</script>

<style scoped>

</style>
