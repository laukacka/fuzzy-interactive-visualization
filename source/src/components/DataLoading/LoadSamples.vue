<template>
  <div>
   <b-button variant="dark" @click="loadFile(file)" >
     IRIS
   </b-button>
  </div>
</template>

<script>
  import axios from 'axios';
  import {loadFile} from "@/mixins/loadFile";

    export default {
      name: "LoadSamples",
      mixins: [loadFile],
      data () {
        return {
          file: 'https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json'
        }
      },
      methods: {
        loadData (suffix) {
          axios.get(this.file).then(response => {
            let rows = response.data;
            this.$store.dispatch("loadRows", rows);
            console.log(this.$store.getters.getRows);
          }).catch(error => console.log(error.response));
        }
      }
    }
</script>

<style scoped>

</style>
