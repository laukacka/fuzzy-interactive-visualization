<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <scatter :data="scatter.data" :options="scatter.options"></scatter>
    </div>
  </div>
</template>

<script>
  import Scatter from "../vue-chartjs/Scatter";

  export default {
    components: {
      Scatter
    },
    data() {
      return {
        scatter: {
          data: {
            datasets: [{
              label: 'Cluster 1',
              data: [{
                x: -1.5,
                y: 2.9
              }, {
                x: 2,
                y: 10.8
              }, {
                x: 10,
                y: 3.5
              }],
              borderColor: '#2196f3', // Add custom color border
              backgroundColor: '#2196f3'
            }, {
              label: 'Cluster 2',
              data: [{
                x: -5,
                y: 3
              }, {
                x: 1.4,
                y: 8
              }, {
                x: 12,
                y: 3.2
              }],
              borderColor: '#f3c60a', // Add custom color border
              backgroundColor: '#f3e80c'
            }, {
              label: 'Cluster 3',
              data: [{
                x: 8,
                y: 3
              }, {
                x: 3,
                y: -5
              }, {
                x: 7.9,
                y: -3.2
              }],
              borderColor: '#b50cf3', // Add custom color border
              backgroundColor: '#f31af3'
            }]
          },
          options: {
            scales: {
              xAxes: [{
                type: 'linear',
                position: 'bottom'
              }]
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
