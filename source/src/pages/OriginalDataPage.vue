<template>
  <div>
    <div class="arrow-left" v-if="(showTable || showGraph || showHistogram)" @click="showButtons">
      <router-link to="/originalData"><i class="fas fa-angle-double-left fa-3x backArrow"
                                         title="Choose a method for data visualization"></i></router-link>
    </div>

    <div class="arrow-left" v-if="!showTable && !showGraph && !showHistogram">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow"
                                    title="Methods for data visualization"></i>
      </router-link>
    </div>

    <b-container class="originalDataContainer" v-if="!showTable && !showGraph && !showHistogram">
      <b-row>
        <b-col>
          <b-row align-v="center" align-h="center">
            <b-col>
              <h3> Choose a method for data visualization: </h3>
            </b-col>
          </b-row>
          <b-row align-v="center" align-h="center">
            <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
              <b-button class="tableGraphButtons" variant="info" @click="showTable = true">Table
              </b-button>
            </b-col>

            <b-col md="3" cols="4" style="padding: 0 5px 0 10px">
              <b-button class="tableGraphButtons" variant="info" @click="showHistogram = true">Histogram
              </b-button>
            </b-col>

            <b-col md="3" cols="4" style="padding: 0 10px 0 10px">
              <b-button class="tableGraphButtons" variant="info" @click="showGraph = true">Scatter plot</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showTable" class="originalDataContainer2">
      <original-data-table></original-data-table>
    </b-container>

    <original-data-histogram v-if="showHistogram" class="originalDataContainer2"></original-data-histogram>

    <original-data-scatter v-if="showGraph" class="originalDataContainer3"></original-data-scatter>
  </div>
</template>

<script>
  import OriginalDataTable from "../components/OriginalData/OriginalDataTable";
  import OriginalDataScatter from "../components/OriginalData/OriginalDataScatter";
  import OriginalDataHistogram from "../components/OriginalData/OriginalDataHistogram";

  export default {
    name: "OriginalDataPage",
    components: {
      OriginalDataHistogram,
      OriginalDataScatter,
      OriginalDataTable
    },
    data() {
      return {
        name: 'OriginalData',
        showTable: false,
        showGraph: false,
        showHistogram: false
      }
    },
    methods: {
      showButtons() {
        this.showTable = false;
        this.showGraph = false;
        this.showHistogram = false;
        this.$store.dispatch('loadHeader', 'Original data');
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Original data');
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
    },
  }
</script>

<style scoped>
  .originalDataContainer, .originalDataContainer2, .originalDataContainer3 {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 32%;
    margin: auto;
  }

  @media screen and (max-width: 768px) {
    .originalDataContainer2, .originalDataContainer3 {
      position: unset;
      top: unset;
      bottom: unset;
      left: unset;
      right: unset;
      margin-top: 30px;
    }
  }

  @media screen and (min-width: 1200px) {
    .originalDataContainer2 {
      height: 42%;
    }
  }

  @media screen and (min-width: 768px) {
    .originalDataContainer3, .originalDataContainer2 {
      position: unset;
      top: unset;
      bottom: unset;
      left: unset;
      right: unset;
      margin-top: 30px;
    }
  }

  .tableGraphButtons {
    width: 100%;
    height: 120px;
  }

  .tableGraphButtons:hover {
    border: 3px solid red;
  }

  h3 {
    cursor: context-menu;
    margin-bottom: 50px;
  }

  h3:hover {
    color: #06aa19;
  }
</style>
