<template>
  <div>
    <div class="arrow-left" v-if="(showTable || showGraph || showHistogram)" @click="showButtons">
      <router-link to="/originalData"><i class="fas fa-angle-double-left fa-3x backArrow"
                                       title="Choose a method for data visualization"></i></router-link>
    </div>

    <div class="arrow-left" v-if="!showTable && !showGraph && !showHistogram">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Methods for data visualization"></i>
      </router-link>
    </div>

    <b-container v-if="!showTable && !showGraph && !showHistogram">
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
          <b-button class="tableGraphButtons" variant="info" @click="showGraph = true">Graph</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showTable">
      <b-row align-v="center" align-h="center">
        <b-col md="8">
          <original-data-table></original-data-table>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showHistogram">
      <b-row align-v="center" align-h="center">
        <b-col md="8">
          <original-data-histogram></original-data-histogram>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showGraph">
      <b-row align-v="center" align-h="center">
        <b-col md="8">
          <original-data-scatter></original-data-scatter>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script>
  import OriginalDataTable from "@/components/OriginalData/OriginalData/OriginalDataTable";
  import OriginalDataScatter from "@/components/OriginalData/OriginalData/OriginalDataScatter";
  import OriginalDataHistogram from "@/components/OriginalData/OriginalData/OriginalDataHistogram";

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
  .tableGraphButtons {
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
