<template>
  <div>
    <b-container>
      <b-row v-for="col in columns">
        <b-col offset-md="1" md="3">
          column {{col.id}}.
        </b-col>
        <b-col md="6">
          <b-form-input v-model="col.label" type="text"/>
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
    {{cvicnyGrafik.myDatasets}}
    <b-container>
      <b-row>
        <b-col>
          <scatter :data="cvicnyGrafik.myDatasets" ></scatter>
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
        cvicnyGrafik: {
          myDatasets: [],
        },
        myoptions: {
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
        jljklj: 0,
        kldjskls: 1,
        mnozinaFarieb: ['#ff9418', '#52a', '#cc2417', '#feff0e', '#32aa41', '#cba'],
        doSomething() {
          //alert("updates");
          this.something.push("Complain " + this.something.length);
        }
      }
    },
    created() {
      //  alert("created");
      axios.get('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
        .then(response => {

          this.rows = response.data;
          let something = Object.entries(this.rows[0]);
          for (let i = 0; i < something.length; i++) {
            let column = {
              id: i + 1,
              label: something[i][0],
              field: something[i][0],
              tdClass: 'text-center text-nowrap',
              thClass: 'text-center text-nowrap'
            };
            this.columns.push(column);
          }
          let allData = Object.entries(this.rows);
          console.log(allData[100][1]);
          let uyggyvg = Object.entries(allData[100][1]);
          console.log(uyggyvg);
          console.log(uyggyvg[4][1]);

          let typesOfCluster = [];
          let naseobjejky = [];
          // bude to naplnene objektami clustrov
          for (let i = 0; i < allData.length; i++) {
            let premenna = Object.entries(allData[i][1]);
            let typeOfCluster = premenna[4][1];
            var naslo = false;
            for (let j = 0; j < typesOfCluster.length; j++) {
              if (typesOfCluster[j] === (typeOfCluster)) {
                naslo = true;
                break;
              }
            }
            if (!naslo) {
              typesOfCluster.push(typeOfCluster);
            }
          }
          //console.log(typesOfCluster);

          //potrebujeme vytvorit objekty podla toho kolko mame klustrov

          for(let i = 0; i < typesOfCluster.length; i++) {
            let nennenen = {
              label: typesOfCluster[i],
              data: [],
              borderColor: '#0c0d10' ,
              backgroundColor: this.mnozinaFarieb[i]
            };
            naseobjejky.push(nennenen);
          }

          for (let i = 0; i < allData.length; i++) {
            let premenna = Object.entries(allData[i][1]);
            let typeOfCluster = premenna[4][1];
            for (let j = 0; j < typesOfCluster.length; j++) {
              if  (typeOfCluster ===  typesOfCluster[j]) {
                    naseobjejky[j].data.push({
                      x: premenna[this.jljklj][1],
                      y: premenna[this.kldjskls][1],
                    });
                    break;
              }
            }

          }
          let dklsfjal = [];
          console.log(naseobjejky);
          for(var j = 0; j < naseobjejky.length; j++){
            console.log(naseobjejky[j]);
            dklsfjal.push(naseobjejky[j]);
          }
          this.cvicnyGrafik.myDatasets = {
            datasets : dklsfjal
          };
        //  this.myDatasets = dklsfjal;
          console.log(this.cvicnyGrafik);
        })
        .catch(error => console.log(error))
    },
    mounted() {
      //  alert("mounted");
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
