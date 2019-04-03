<template>
  <div>
    <b-container align-v="center" align-h="center">
      <b-row>
        <b-col md="1">
          <router-link to="/"><i id="sss" class="fas fa-angle-double-left fa-3x back"></i></router-link>
        </b-col>
        <b-col md="2" offset-md="4">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw loading"></i>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" offset-md="4">
          <p>Načítaj Dáta</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" offset-md="3">
          <b-button class="buttons" v-for="button in buttons" v-bind:variant='button.variant'
                    v-on:click='currentLoadComponent = button.component'>
            {{button.name}}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8" offset-md="2">
          <component v-bind:is='currentLoadComponent' id="component"></component>
        </b-col>
      </b-row>
    </b-container>
    <b-container>

      <b-container fluid class="loadWrapper">
        <b-row align-v="center" align-h="center">
          <b-col>


          </b-col>
        </b-row>
        <b-row align-v="center" align-h="center">

        </b-row>
      </b-container>
    </b-container>
  </div>
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
        buttons: [
          {
            name: 'Súbor',
            variant: 'outline-primary',
            component: 'LoadFromFile'
          },
          {
            name: 'URL',
            variant: 'outline-success',
            component: 'LoadFromURL'
          },
          {
            name: 'Demo dáta',
            variant: 'outline-warning',
            component: 'LoadSamples'
          }
        ]
      }
    }
  }
</script>

<style scoped>

  .back {
    position: absolute;
    left: 0;
    margin-left: 10px;
    color: black;
  }

  .loading {
    margin-top: 10px;
  }

  .loadWrapper {
    margin-top: 5%;
  }

  .back:hover {
    color: red;
  }

  p {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: bold;
  }

  #component {
    margin-top: 35px;
  }

  .buttons {
    margin: 5px;
  }
</style>
