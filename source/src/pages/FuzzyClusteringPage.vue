<template>
  <div>
    <div class="arrow-left" v-if="(showRadviz || showCoordinates || showTable)" @click="showButtons">
      <router-link to="/fuzzyClustering"><i class="fas fa-angle-double-left fa-3x backArrow"
                                            title="Choose a method for data visualization"></i></router-link>
    </div>

    <div class="arrow-left" v-if="!showRadviz && !showCoordinates && !showTable">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Methods for data visualization"></i>
      </router-link>
    </div>

    <b-container v-if="!showRadviz && !showCoordinates && !showTable">
      <b-row align-v="center" align-h="center">
        <b-col>
          <h3> Choose a method for data visualization: </h3>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
          <b-button class="radvizCoordinatesButtons" variant="danger" @click="showRadviz = true">Radviz</b-button>
        </b-col>
        <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
          <b-button class="radvizCoordinatesButtons" variant="danger" @click="showTable = true">Table</b-button>
        </b-col>
        <b-col md="3" cols="4" style="padding: 0 10px 0 10px">
          <b-button class="radvizCoordinatesButtons" variant="danger" @click="showCoordinates = true">Parallel
            Coordinates
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showRadviz">
      <fuzzy-clustering-radviz></fuzzy-clustering-radviz>
    </b-container>

    <b-container v-if="showTable">
      <fuzzy-clustering-table></fuzzy-clustering-table>
    </b-container>

    <b-container v-if="showCoordinates">
      <fuzzy-clustering-parallel-coordinates></fuzzy-clustering-parallel-coordinates>
    </b-container>
  </div>
</template>

<script>
  import FuzzyClusteringRadviz from "@/components/FuzzyClustering/Radviz/FuzzyClusteringRadviz";
  import FuzzyClusteringParallelCoordinates
    from "@/components/FuzzyClustering/ParallelCoordinators/FuzzyClusteringParallelCoordinates";
  import FuzzyClusteringTable from "@/components/FuzzyClustering/FuzzyClusteringTable";

  export default {
    name: "FuzzyClusteringPage",
    components: {FuzzyClusteringTable, FuzzyClusteringParallelCoordinates, FuzzyClusteringRadviz},
    data() {
      return {
        name: 'Fuzzy Clustering',
        showRadviz: false,
        showCoordinates: false,
        showTable: false
      }
    },
    methods: {
      showButtons() {
        this.showRadviz = false;
        this.showCoordinates = false;
        this.showTable = false;
        this.$store.dispatch('loadHeader', 'Fuzzy clustering');
      },
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzy clustering');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
          title: 'Please, try again.'
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
    width: 100%;
    height: 120px;
  }

  h3 {
    cursor: context-menu;
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }
</style>
