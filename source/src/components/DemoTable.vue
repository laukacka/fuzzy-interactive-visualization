<template>
  <div>
    <b-container>
      <b-row v-for="col in columns" :key="col.id">
        <b-col offset-md="1" md="3">
          column {{col.id}}.
        </b-col>
        <b-col md="6">
          <b-form-input v-model="col.label" :key="col.id" type="text"/>
        </b-col>
      </b-row>
      <b-row id="tablee">
        <b-col md="10" offset-md="1">
          <b-button @click="doSomething()">Do something interesting</b-button>
          <span v-if="something.length > 0">{{something}}</span>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            theme="black-rhino"
            styleClass="vgt-responsive"
            :lineNumbers="true"
            :search-options="{ enabled: true, placeholder: 'Search this table' }"
            :pagination-options="{ enabled: true,  position: 'bottom' }"
            :selectOptions="{
            enabled: true,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
			  }"></vue-good-table>
          <router-link to="/">
            <b-button variant="danger" style="margin-top:10px">Back</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <scatter :data="data.datasets"></scatter>
        </b-col>
      </b-row>
    </b-container>
  </div>
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
        something: [],
        columns: [],
        rows: [],
        attribute1: 0,
        attribute2: 1,
        colorPallet: ['#ff9418', '#52a', '#cc2417', '#feff0e', '#32aa41', '#cba'],
        doSomething() {
          this.something.push("Complain " + this.something.length);
        }
      }
    },
    created() {
      //  alert("created");
    },
    mounted() {
      axios.get('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
        .then(response => {
          this.rows = response.data;
          let oneRowOfAllData = Object.entries(this.rows[0]);
          for (let i = 0; i < oneRowOfAllData.length; i++) {
            let column = {
              id: i + 1,
              label: oneRowOfAllData[i][0],
              field: oneRowOfAllData[i][0],
              tdClass: 'text-center text-nowrap',
              thClass: 'text-center text-nowrap'
            };
            this.columns.push(column);
          }

          let allData = Object.entries(this.rows);
          let typesOfClusters = [];
          let clusters = [];

          for (let i = 0; i < allData.length; i++) { // bude to naplnene objektami clustrov
            let attributes = Object.entries(allData[i][1]);
            let typeOfCluster = attributes[4][1];
            let found = false;
            for (let j = 0; j < typesOfClusters.length; j++) {
              if (typesOfClusters[j] === (typeOfCluster)) {
                found = true;
                break;
              }
            }
            if (!found) {
              typesOfClusters.push(typeOfCluster);
            }
          }
          //potrebujeme vytvorit objekty podla toho kolko mame klustrov:
          for (let i = 0; i < typesOfClusters.length; i++) {
            let cluster = {
              label: typesOfClusters[i],
              data: [],
              borderColor: '#0c0d10',
              backgroundColor: this.colorPallet[i]
            };
            clusters.push(cluster);
          }

          for (let i = 0; i < allData.length; i++) {
            let attributes = Object.entries(allData[i][1]);
            let typeOfCluster = attributes[4][1];
            for (let j = 0; j < typesOfClusters.length; j++) {
              if (typeOfCluster === typesOfClusters[j]) {
                clusters[j].data.push({
                  x: attributes[this.attribute1][1],
                  y: attributes[this.attribute2][1],
                });
                break;
              }
            }
          }

          this.data.datasets = {
            datasets: clusters
          };
          console.log(Object.entries(allData[0][1]))
        })
        .catch(error => console.log(error))
    },
    beforeMount() {
      // alert("before mount");
    },
    beforeCreate() {
      // alert("before create");
    },
    updated() {
      // alert("updated");
    }
  }
</script>

<style scoped>

</style>
