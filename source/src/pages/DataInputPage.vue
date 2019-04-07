<template>
  <div>
    <div class="backArrowWrapper">
      <router-link to="/"><i class="fas fa-angle-double-left fa-3x backArrow"></i></router-link>
    </div>
    <!--fluid class="containerFluid"-->
    <!--TODO -> centrovanie na stred dokoncit!!!-->
    <b-container fluid class="inputContainer">
      <b-row v-if="fromChild === null">
        <b-col md="2" offset-md="5">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col md="2" offset-md="5">
          <i class="fas fa-check fa-3x"></i>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" offset-md="4">
          <h3>Načítaj Dáta</h3>
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
        <b-col md="6" offset-md="3">
          <component v-bind:is='currentLoadComponent' v-on:childToParent="onChildClick" id="component"></component>
        </b-col>
      </b-row>
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
        fromChild: null,
        counter: 0,
        currentLoadComponent: 'LoadFromFile',
        buttons: [
          {
            name: 'Súbor',
            variant: 'primary',
            component: 'LoadFromFile'
          },
          {
            name: 'URL',
            variant: 'secondary',
            component: 'LoadFromURL'
          },
          {
            name: 'Demo dáta',
            variant: 'warning',
            component: 'LoadSamples'
          }
        ]
      }
    },
    updated() {
      if (this.counter === 1) {
        this.fromChild = null;
      }
      this.counter = 1;
    },
    methods: {
      onChildClick(value) {
        this.fromChild = value;
        this.counter++;
      }
    }
  }
</script>

<style scoped>
  .fa-check {
    color: green;
  }

  h3 {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
  }

  #component {
    margin-top: 30px;
  }

  .buttons {
    margin: 0 5px 0 5px;
  }

  .inputContainer {
    margin-top: 100px;
  }
</style>
