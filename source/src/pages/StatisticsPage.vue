<template>
  <div>
    <b-container v-if="(showTable || showGraph)">
      <b-row>
        <b-col @click="showButtons">
          <router-link to="/statistics"><i class="fas fa-angle-double-left fa-3x backArrow"
                                           title="Spôsob zobrazenia pôvodných dát"></i></router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!showTable && !showGraph">
      <b-row>
        <b-col>
          <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Metódy"></i>
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="!showTable && !showGraph" class="methodsContainer">
      <b-row>
        <b-col>
          <h3> Akým spôsobom si prajete zobraziť načítané dáta? </h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="2" md="3">
          <b-button class="tableGraphButtons" variant="info" @click="showTable = true">Tabuľka
          </b-button>
        </b-col>
        <b-col offset-md="2" md="3">
          <b-button class="tableGraphButtons" variant="info" @click="showGraph = true">Graf</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showTable">
      <b-row>
        <b-col offset-md="2" md="8">
          <statistic-table :columns="this.$store.getters.getColumns"></statistic-table>
        </b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 3%" v-if="showGraph">
      <b-row>
        <b-col offset-md="2" md="8">
          <statistics-scatter v-on:childToParent="onChildAction"></statistics-scatter>
        </b-col>
      </b-row>
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
        showGraph: false,
        firstTimeGraph: true,
      }
    },
    methods: {
      showButtons() {
        this.showTable = false;
        this.showGraph = false;
      },
      onChildAction(value) {
        this.firstTimeGraph = value;
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Štatistika');
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
    },
  }
</script>

<style scoped>
  .tableGraphButtons {
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
