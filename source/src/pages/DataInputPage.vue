<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/"><i class="fas fa-angle-double-left fa-3x backArrow" title="Domov"></i></router-link>
        </b-col>
      </b-row>
    </b-container>
    <!--TODO -> centrovanie na stred dokoncit!!!-->
    <b-container fluid class="inputContainer">
      <b-row v-if="fromChild === ''">
        <b-col md="2" offset-md="5">
          <i class="fas fa-arrow-down fa-3x arrow " aria-hidden="true"></i>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col md="2" offset-md="5">
          <i class="fas fa-check fa-3x"></i>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4" offset-md="4">
          <h3>Načítanie dát</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" offset-md="3">
          <b-button class="buttons" v-for="button in buttons" variant='outline-dark'
                    v-on:click='currentLoadComponent = button.component'>
            {{button.name}}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" offset-md="3">
          <component v-bind:is='currentLoadComponent' v-on:childToParent="onChildAction" id="component"></component>
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
        fromChild: '',
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
        this.fromChild = '';
      }
      this.counter = 1;
    },
    methods: {
      onChildAction(value) {
        this.fromChild = value;
        this.counter++;
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Interaktívna vizualizácia');
    }
  }
</script>

<style scoped>
  .fa-check {
    color: green;
  }

  h3 {
    cursor: context-menu;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
  }

  #component {
    margin-top: 30px;
  }

  .buttons {
    margin: 2px 5px 2px 5px;
  }

  .inputContainer {
    margin-top: 100px;
  }

  .arrow {
    animation: arrowSlide 1s ease-in-out infinite;
  }

  @keyframes arrowSlide {
    50% {
      transform: translate(0, 10px);
    }
  }
</style>
