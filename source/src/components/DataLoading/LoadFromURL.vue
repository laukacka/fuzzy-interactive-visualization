<template>
  <div>
    <b-input-group prepend="http://" class="mt-3">
      <b-form-input v-model="path"/>
      <b-input-group-append>
        <b-button @click="loadData" variant="success">Nahrať</b-button>
      </b-input-group-append>
    </b-input-group>
    <p>
      Vlož web adresu (URL). Nahraté môžu byť len dáta typu arff, csv, json a txt.
    </p>
    {{ this.$store.getters.getData }}
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "LoadFromURL",
    data() {
      return {
        path: '', //https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json
      }
    },
    methods: {
      loadData() {
        axios.get(this.path).then(response => {
          this.$store.dispatch("loadData", response.data);
          console.log(this.$store.getters.getData);
        }).catch(error => console.log(error.response)); //if we have same errors, we can see them in console
      }
    }
  }
</script>

<style scoped>
  p {
    margin-top: 10px;
  }
</style>
