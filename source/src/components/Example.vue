<template>
  <div>
    <b-container>
      <b-input-group prepend="Path to JSON file:" class="mt-3">
        <b-form-input v-model="path"/>
        <b-input-group-append>
          <b-button @click="start" variant="outline-success">Load JSON file</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-container>

    <b-container fluid style="margin-top: 3%" v-if="loadedJSON">
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
          <vue-good-table
            :columns="columns"
            :rows="rows"
            styleClass="vgt-responsive"
            :lineNumbers="true"
            :search-options="{ enabled: true, placeholder: 'Search this table' }"
            :pagination-options="{ enabled: true,  position: 'bottom' }"
            :selectOptions="{
            enabled: false,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
			  }"></vue-good-table>
        </b-col>
      </b-row>
    </b-container>

    <b-container style="margin-top: 3%" v-if="loadedJSON">
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
            </b-dropdown-item>-
          </b-dropdown>
        </b-col>
      </b-row>
      <!--<b-row>
        <b-col sm="3">
          <label>index cluster (0 - {{ oneRowOfAllData.length }}):</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="indexCluster" type="text"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3">
          <label>x label (0 - {{ oneRowOfAllData.length }}):</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="xLabel" type="text"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3">
          <label>y label (0 - {{ oneRowOfAllData.length }}):</label>
        </b-col>
        <b-col sm="9">
          <b-form-input v-model="yLabel" type="text"/>
        </b-col>
      </b-row>-->
    </b-container>

    <b-container style="margin-top: 3%">
      <b-row>
        <b-col>
          <scatter :chart-data="data.datasets" :options="options"></scatter>
        </b-col>
      </b-row>
    </b-container>
    <base-line-chart></base-line-chart>
  </div>
</template>

<script>
  import axios from 'axios';
  import Scatter from "./vue-chartjs/Scatter";
  import BaseLineChart from "./charts/BaseLineChart";

  export default {
    components: {
      BaseLineChart,
      Scatter
    },
    data() {
      return {
        path: "https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json",
        data: {
          datasets: [],
        },
        options: {
          scales: {
            xAxes: [],
            yAxes: []
          }
        },
        columns: [],
        rows: [],
        oneRowOfAllData: [],
        typesOfClusters: null,
        dataEntries: null,
        clusters: null,
        colorPallet: ['#ff9418', '#06aa19', '#cc2417', '#feff0e', '#32aa41', '#cba'],
        xLabel: 0,
        yLabel: 1,
        indexCluster: 0,
        loadedJSON: false
      }
    }, mounted() {
      this.loadDataFromJSON();
    },
    watch: {
      columns: function () {
        //alert('mOrE');
        this.start();
      },
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
    methods: {
      start() {
        if (this.rows.length === 0) {
          this.loadDataFromJSON();
        }
        this.foundNewClusters();
        this.createClusters();
        this.assignClusters();

        this.data.datasets = {
          datasets: this.clusters
        };

        this.assignXAxes();
        this.assignYAxes();
      },
      foundNewClusters() {
        this.typesOfClusters = []; // where on the first index are all attributes
        //we have to find out have many clusters we have:
        for (let i = 0; i < this.dataEntries.length; i++) {
          let attributes = Object.entries(this.dataEntries[i][1]);//from attributes we make array for better access
          let typeOfCluster = attributes[this.indexCluster][1]; //get type (name) of cluster from last attribute (index 4),
          let found = false; //on zero index is name of attribute and on first index is value (name) of attribute
          for (let j = 0; j < this.typesOfClusters.length; j++) {
            if (typeOfCluster === this.typesOfClusters[j]) { //if value of attribute for cluster is in our array of typesOfClusters
              found = true; //'found' variable is set to true and break is called
              break;
            }
          }
          if (!found) { //if found variable is false, we have to add new type (name) of cluster to our array of clusters
            this.typesOfClusters.push(typeOfCluster);
          }
        }
      },
      assignAllDataEntries() {
        let allData = null;
        if (this.rows.length > 0) {
          allData = Object.entries(this.rows); //-> array of allData - on every index is another array,
        }
        return allData;
      },
      assignClusters: function () {
        //we have to sort our data to clusters where they belong
        for (let i = 0; i < this.dataEntries.length; i++) {
          let attributes = Object.entries(this.dataEntries[i][1]); //from attributes we make array for better access
          let typeOfCluster = attributes[this.indexCluster][1]; //get type (name) of cluster from last attribute (index 4)
          for (let j = 0; j < this.typesOfClusters.length; j++) {//we go through the whole array of clusters and
            if (typeOfCluster === this.typesOfClusters[j]) { //compare whether data belong to particular cluster
              this.clusters[j].data.push({//we add new object to data attribute in appropriate cluster
                x: attributes[this.xLabel][1],//x and y axis are set according to the user's selection
                y: attributes[this.yLabel][1],
              });
              break; //if we find particular cluster, break is called
            }
          }
        }
      },
      createClusters: function () {
        //we create a new clusters and add them to array of clusters
        this.clusters = [];
        for (let i = 0; i < this.typesOfClusters.length; i++) { //we create as many clusters as we have types (names) of clusters
          let cluster = {
            label: this.typesOfClusters[i], //label is set according to type of cluster
            data: [],
            borderColor: '#0c0d10',
            backgroundColor: this.colorPallet[i]
          };
          this.clusters.push(cluster); //add new cluster to array of clusters
        }
      },
      assignXAxes: function () {
        //alert(this.columns[this.xLabel].label);
        if (this.options.scales.xAxes.length > 0) {
          this.options.scales.xAxes.pop();
        }
        this.options.scales.xAxes.push({
          display: true,
          scaleLabel: {
            display: true,
            labelString: this.columns[this.xLabel].label,
            fontSize: 14,
            fontColor: '#000000'
          }
        });
      },
      assignYAxes: function () {
        if (this.options.scales.yAxes.length > 0) {
          this.options.scales.yAxes.pop();
        }
        this.options.scales.yAxes.push({
          display: true,
          scaleLabel: {
            display: true,
            labelString: this.columns[this.yLabel].label,
            fontSize: 14,
            fontColor: '#000000'
          }
        });
      },
      loadDataFromJSON() {
        axios.get(this.path).then(response => {
          //get data from JSON file:
          this.rows = response.data;
          this.loadHeaders(); //load table
          this.dataEntries = this.assignAllDataEntries();
        }).catch(error => console.log(error)) //if we have same errors, we can see them in console
      },
      loadHeaders() {
        this.oneRowOfAllData = Object.entries(this.rows[0]);
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
        this.loadedJSON = true;
      }
    }
  }
</script>

<style scoped>

</style>
