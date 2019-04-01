<template>
  <b-container>
    <router-link to="/"><i class="fas fa-angle-double-left fa-3x back"></i></router-link>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw loading"></i>
    <b-container fluid class="loadWrapper">
      <b-row align-v="center" align-h="center">
        <b-col>
          <p>Nahraj svoje dáta:</p>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col offset-lg="1" offset-md="1" md="2" lg="2" sm="2">
          <b-row class="rows">
            <b-button variant="outline-primary" v-on:click='currentLoadComponent = "LoadFromFile"'>
              Zo súboru
            </b-button>
          </b-row>
          <b-row class="rows">
            <b-button variant="outline-success" v-on:click='currentLoadComponent = "LoadFromURL"'>
              Z URL
            </b-button>
          </b-row>
          <b-row class="rows">
            <b-button variant="outline-warning" v-on:click='currentLoadComponent = "LoadSamples"'>
              Prednastavené dáta
            </b-button>
          </b-row>
        </b-col>
        <b-col offset-lg="1" offset-md="1" md="7" lg="7">
          <component v-bind:is='currentLoadComponent'></component>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
  import LoadFromFile from "@/components/DataLoading/LoadFromFile";
  import LoadFromURL from "@/components/DataLoading/LoadFromURL";
  import LoadSamples from "@/components/DataLoading/LoadSamples";

  export default {
    name: "DataInputPage",
    components: {LoadSamples, LoadFromURL, LoadFromFile},
    data() {
      return {
        activeButton: 'true',
        currentLoadComponent: 'LoadFromFile',
      }
    }
  }
</script>

<style scoped>
  .back {
    position: absolute;
    left: 0;
    margin-left: 10px;
    color: red;
  }

  .rows {
    margin-bottom: 5px;
  }

  .loading {
    margin-top: 50px;
  }

  .loadWrapper {
    margin-top: 5%;
  }

  p {
    margin-bottom: 50px;
    font-size: 25px;
    font-weight: bold;
  }
</style>
