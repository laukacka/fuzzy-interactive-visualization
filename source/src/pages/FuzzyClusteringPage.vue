<template>
  <div>
    TODO {{name}}
  </div>
</template>

<script>
    export default {
        name: "FuzzyClusteringPage",
      data () {
        return {
          name: 'Fuzzy Clustering'
        }
      },
      mounted() {
        this.$store.dispatch('loadHeader', 'Fuzzy zhlukovanie');
      }
    }
</script>

<style scoped>

</style>
