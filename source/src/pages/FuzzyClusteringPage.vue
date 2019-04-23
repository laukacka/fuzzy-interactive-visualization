<template>
  <div>
    <b-container v-if="(showRadviz || showCoordinates)">
      <b-row>
        <b-col @click="showButtons">
          <router-link to="/fuzzyClustering"><i class="fas fa-angle-double-left fa-3x backArrow"
                                           title="Spôsob zobrazenia dát"></i></router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!showRadviz && !showCoordinates">
      <b-row>
        <b-col>
          <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Metódy"></i>
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!showRadviz && !showCoordinates" class="methodsContainer">
      <b-row>
        <b-col>
          <h3> Akým spôsobom si prajete zobraziť načítané dáta? </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="2" md="3">
          <b-button class="radvizCoordinatesButtons" variant="danger" @click="showRadviz = true">Radviz</b-button>
        </b-col>
        <b-col offset-md="2" md="3">
          <b-button class="radvizCoordinatesButtons" variant="danger" @click="showCoordinates = true">Paralelné koordinátory
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showRadviz">
      <b-row>
        <b-col offset-md="2" md="8">
          <fuzzy-clustering-radviz></fuzzy-clustering-radviz>
        </b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 3%" v-if="showCoordinates">
      <b-row>
        <b-col offset-md="2" md="8">
          <fuzzy-clustering-parallel-coordinates></fuzzy-clustering-parallel-coordinates>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import FuzzyClusteringRadviz from "@/components/FuzzyClustering/Radviz/FuzzyClusteringRadviz";
  import FuzzyClusteringParallelCoordinates
    from "@/components/FuzzyClustering/ParallelCoordinators/FuzzyClusteringParallelCoordinates";

  export default {
    name: "FuzzyClusteringPage",
    components: {FuzzyClusteringParallelCoordinates, FuzzyClusteringRadviz},
    data() {
      return {
        name: 'Fuzzy Clustering',
        showRadviz: false,
        showCoordinates: false
      }
    },
    methods: {
      showButtons() {
        this.showRadviz = false;
        this.showCoordinates = false;
      },
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzy zhlukovanie');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
          title: 'Znovu načítaj dáta.'
        }).then((result) => {
          if (result.value) {
            this.$router.push("dataInput");
          }
        })
      }
    }
  }
</script>

<style scoped>
  .radvizCoordinatesButtons {
    width: 120px;
    height: 120px;
    margin: 5px;
  }

  h3 {
    cursor: context-menu;
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }

  .methodsContainer {
    margin-top: 100px;
  }
</style>
