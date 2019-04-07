<template>
  <div>
    <div class="backArrowWrapper" v-if="(showTable || showGraph)" @click="showButtons">
      <router-link to="/statistics"><i class="fas fa-angle-double-left fa-3x backArrow"></i></router-link>
    </div>
    <div v-if="!showTable && !showGraph" class="backArrowWrapper">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow"></i></router-link>
    </div>
    <b-container v-if="!showTable && !showGraph">
      <b-row>
        <b-col offset-md="3" md="2">
          <b-button class="tableGraphButtons" variant="outline-warning" @click="showTable = true">Tabuľka</b-button>
        </b-col>
        <b-col offset-md="2" md="2">
          <b-button class="tableGraphButtons" variant="outline-info" @click="showGraph = true">Graf</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-container v-if="showTable">
      <b-row>
        <b-col offset-md="2" md="8">
          <statistic-table :columns="columns"></statistic-table>
        </b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 3%" v-if="showGraph">
      <b-row>
        <b-col offset-md="2" md="8">
          <statistics-graph :columns="columns"></statistics-graph>
        </b-col>
      </b-row>
    </b-container>

    <!-- <b-container fluid style="margin-top: 3%">
       <b-row align-v="center">
         <b-col offset-lg="1" offset-md="1" md="4" lg="4">
           <b-row align-v="center" v-for="column in columns" :key="column.id">
             <b-col md="4">
               column {{column.id}}:
             </b-col>
             <b-col md="8" lg="7">
               <b-form-input v-model="column.label" type="text"/>
             </b-col>
           </b-row>
         </b-col>
         <b-col md="6" lg="6">
           <statistic-table :columns="columns"> </statistic-table>
         </b-col>
       </b-row>
     </b-container>-->

    <!--<b-container style="margin-top: 3%">
      <b-row>
        <b-col>
          <b-dropdown text="column for clusters" variant="primary" class="m-2">
            <b-dropdown-item v-for="index in oneRowOfAllData.length" @click="indexCluster = index - 1">{{ index }}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown text="column for x label" variant="primary">
            <b-dropdown-item v-for="index in oneRowOfAllData.length" @click="xLabel = index - 1">{{ index }}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown text="column for y label" variant="primary" class="m-2">
            <b-dropdown-item v-for="index in oneRowOfAllData.length" @click="yLabel = index - 1">{{ index }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-container>-->
  </div>
</template>

<script>
  import Scatter from "@/components/vue-chartjs/Scatter";
  import StatisticTable from "@/components/Statistics/OriginalData/StatisticsTable";
  import StatisticsGraph from "@/components/Statistics/OriginalData/StatisticsGraph";

  export default {
    name: "StatisticsPage",
    components: {
      StatisticsGraph,
      StatisticTable,
      Scatter
    },
    data() {
      return {
        name: 'Statistics',
        columns: [],
        oneRowOfAllData: [],
        showTable: false,
        showGraph: false,
        inputOptions: []
      }
    },
    watch: {
      xLabel: function (val) {
        if (this.xLabel === undefined) {
          this.xLabel = 0;
          alert('MORE! MORE! MORE!');
        }
        if (val > this.oneRowOfAllData.length) {
          this.xLabel = 0;
          alert('MORE!');
        } else {
          this.start();
        }
      },
      yLabel: function (val) {
        if (val > this.oneRowOfAllData.length) {
          alert('MORE!');
        } else {
          this.start();
        }
      },
      indexCluster: function (val) {
        if (val > this.oneRowOfAllData.length) {
          alert('MORE!');
        } else {
          this.start();
        }
      }
    },
    mounted() {
      this.start();
    },
    methods: {
      showButtons() {
        this.showTable = false;
        this.showGraph = false;
      },
      start() {
        if (this.columns.length === 0) {
          this.loadHeaders();
        }
      },
      loadHeaders() {
        let rows = this.$store.getters.getRows;
        this.oneRowOfAllData = Object.entries(rows[0]);
        for (let i = 0; i < this.oneRowOfAllData.length; i++) { //we create as many columns as we have items in oneRowOfAllData
          let column = {
            id: i + 1,
            label: this.oneRowOfAllData[i][0],
            field: this.oneRowOfAllData[i][0],
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          };
          this.columns.push(column);
        }
      }
    }
  }
</script>

<style scoped>
  .tableGraphButtons {
    width: 150px;
    height: 150px;
  }
</style>
