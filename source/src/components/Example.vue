<template>
  <b-container fluid style="margin-top: 3%">
    <b-row align-v="center">
      <b-col offset-lg="1" offset-md="1" md="4" lg="4">
        <b-row align-v="center" v-for="column in columns">
          <b-col md="4">
            column {{column.id}}.
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

</template>

<script>
  import axios from 'axios';
  import Scatter from "./vue-chartjs/Scatter";

  export default {
    components: {
      Scatter
    },
    data() {
      return {
        data: {
          datasets: [],
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        },
        columns: [],
        rows: [],
        colorPallet: ['#ff9418', '#52a', '#cc2417', '#feff0e', '#32aa41', '#cba'],
        attribute1: 0,
        attribute2: 1
      }
    },
    mounted() {
      axios.get('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json').then(response => {
        //filling the table with data:
        this.rows = response.data;
        let oneRowOfAllData = Object.entries(this.rows[0]);
        for (let i = 0; i < oneRowOfAllData.length; i++) { //we create as many columns as we have items in oneRowOfAllData
          let column = {
            id: i + 1,
            label: oneRowOfAllData[i][0],
            field: oneRowOfAllData[i][0],
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          };
          this.columns.push(column);
        }

        let allData = Object.entries(this.rows); //-> array of allData - on every index is another array,
        let typesOfClusters = []; // where on the first index are all attributes
        //we have to find out have many clusters we have:
        for (let i = 0; i < allData.length; i++) {
          let attributes = Object.entries(allData[i][1]);//from attributes we make array for better access
          let typeOfCluster = attributes[4][1]; //get type (name) of cluster from last attribute (index 4),
          let found = false; //on zero index is name of attribute and on first index is value (name) of attribute
          for (let j = 0; j < typesOfClusters.length; j++) {
            if (typeOfCluster === typesOfClusters[j]) { //if value of attribute for cluster is in our array of typesOfClusters
              found = true; //'found' variable is set to true and break is called
              break;
            }
          }
          if (!found) { //if found variable is false, we have to add new type (name) of cluster to our array of clusters
            typesOfClusters.push(typeOfCluster);
          }
        }
        //we create a new clusters and add them to array of clusters
        let clusters = [];
        for (let i = 0; i < typesOfClusters.length; i++) { //we create as many clusters as we have types (names) of clusters
          let cluster = {
            label: typesOfClusters[i], //label is set according to type of cluster
            data: [],
            borderColor: '#0c0d10',
            backgroundColor: this.colorPallet[i]
          };
          clusters.push(cluster); //add new cluster to array of clusters
        }
        //we have to sort our data to clusters where they belong
        for (let i = 0; i < allData.length; i++) {
          let attributes = Object.entries(allData[i][1]); //from attributes we make array for better access
          let typeOfCluster = attributes[4][1]; //get type (name) of cluster from last attribute (index 4)
          for (let j = 0; j < typesOfClusters.length; j++) {//we go through the whole array of clusters and
            if (typeOfCluster === typesOfClusters[j]) { //compare whether data belong to particular cluster
              clusters[j].data.push({//we add new object to data attribute in appropriate cluster
                x: attributes[this.attribute1][1],//x and y axis are set according to the user's selection
                y: attributes[this.attribute2][1],
              });
              break; //if we find particular cluster, break is called
            }
          }
        }

        this.data.datasets = {
          datasets: clusters
        };
      }).catch(error => console.log(error)) //if we have same errors, we can see them in console
    }
  }
</script>

<style scoped>

</style>
