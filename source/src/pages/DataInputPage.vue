<template>
  <div>
    <div class="arrow-left">
      <router-link to="/"><i class="fas fa-angle-double-left fa-3x backArrow" title="Home"></i></router-link>
    </div>

    <div class="arrow-right" v-if="showForwardArrow">
      <router-link to="/methods"><i class="fas fa-angle-double-right fa-3x forwardArrow" title="Methods"></i>
      </router-link>
    </div>

    <b-container  fluid class="input-container">
      <b-row v-if="fromChild === ''" align-v="center" align-h="center">
        <b-col md="8" >
          <i class="fas fa-arrow-down fa-3x arrow " aria-hidden="true"></i>
        </b-col>
      </b-row>
      <b-row v-else align-v="center" align-h="center">
        <b-col>
          <i class="fas fa-check fa-3x"></i>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="8" >
          <h3>Loading data</h3>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="8" >
          <b-button class="buttons" v-for="button in buttons" variant='outline-dark'
                    v-on:click='currentLoadComponent = button.component'>
            {{button.name}}
          </b-button>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="6">
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
        showForwardArrow: false,
        fromChild: '',
        counter: 0,
        currentLoadComponent: 'LoadFromFile',
        buttons: [
          {
            name: 'File',
            variant: 'primary',
            component: 'LoadFromFile'
          },
          {
            name: 'URL',
            variant: 'secondary',
            component: 'LoadFromURL'
          },
          {
            name: 'Samples',
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
      this.$store.dispatch('loadHeader', 'Interactive Visualization');
      this.showForwardArrow = this.$store.getters.getRows.length > 0;
      this.$store.dispatch("loadIsShownArrow", true);
    }
  }
</script>

<style scoped>
  .fa-check {
    color: green;
  }

  .input-container{
    width: 100%;
    margin-top: 90px;
  }

  .arrow-right {
    text-align: left !important;
    position: fixed;
    top: 0;
    margin-left: 60%;
    margin-top: 24px;
    width: 100%;
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

  .arrow {
    animation: arrowSlide 1s ease-in-out infinite;
  }

  @keyframes arrowSlide {
    50% {
      transform: translate(0, 10px);
    }
  }

  .forwardArrow {
    color: black;
  }

  .forwardArrow:hover {
    color: red;
  }
</style>
