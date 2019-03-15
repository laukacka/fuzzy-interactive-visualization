<template>
  <div>

    <b-button
      v-for='i in pole'
      variant='outline-success'
      v-on:click='currentGraph = i'
    >
        {{ i }}
    </b-button>

    <component
      v-bind:is='currentGraph'
    ></component>
  </div>
</template>

<script>
  import Histogram from '@/components/charts/Histogram';
  import DoughnutChart from '@/components/charts/DoughnutChart';
  import PolarAreaChart from '@/components/charts/PolarAreaChart';
  import Clusters from '@/components/charts/Clusters';
  import Scatter from "@/components/charts/Scatter";
  import Jdfjklsdjkfdskl from "@/components/charts/Jdfjklsdjkfdskl";
  export default {
    components: {Jdfjklsdjkfdskl, Scatter, Clusters, PolarAreaChart, DoughnutChart, Histogram},
    data() {
      return {
        currentGraph: 'Histogram',
        pole: ['Histogram', 'Clusters', 'Scatter', 'Jdfjklsdjkfdskl'],
        premennaina: 'Histogram',
        buttons: ['outline-primary',  'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'light'],

      }
    }
  }
</script>

<style scoped>

</style>
