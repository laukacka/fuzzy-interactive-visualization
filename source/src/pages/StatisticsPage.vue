<template>
  <div>
    <div class="arrow-left" v-if="(showTable || showGraph)" @click="showButtons">
      <router-link to="/statistics"><i class="fas fa-angle-double-left fa-3x backArrow"
                                       title="Choose a way to view original data"></i></router-link>
    </div>

    <div class="arrow-left" v-if="!showTable && !showGraph">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Methods"></i>
      </router-link>
    </div>

    <b-container v-if="!showTable && !showGraph">
      <b-row align-v="center" align-h="center">
        <b-col>
          <h3> Choose a method for data visualization: </h3>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center">
        <b-col md="3" cols="6">
          <b-button class="tableGraphButtons" variant="info" @click="showTable = true">Table
          </b-button>
        </b-col>
        <b-col offset-md="2" md="3" cols="6">
          <b-button class="tableGraphButtons" variant="info" @click="showGraph = true">Graph</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showTable">
      <b-row align-v="center" align-h="center">
        <b-col md="8">
          <statistic-table></statistic-table>
        </b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 30px" v-if="showGraph">
      <b-col md="8">
      <statistics-scatter></statistics-scatter> <!--v-on:childToParent="onChildAction"-->
      </b-col>
    </b-container>
  </div>
</template>

<script>
  import StatisticTable from "@/components/Statistics/OriginalData/StatisticsTable";
  import StatisticsScatter from "@/components/Statistics/OriginalData/StatisticsScatter";

  export default {
    name: "StatisticsPage",
    components: {
      StatisticsScatter,
      StatisticTable
    },
    data() {
      return {
        name: 'Statistics',
        showTable: false,
        showGraph: false
      }
    },
    methods: {
      showButtons() {
        this.showTable = false;
        this.showGraph = false;
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
