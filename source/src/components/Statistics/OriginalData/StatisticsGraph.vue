<template>
  <div>
    <b-row>
      <b-col>
        <b-button class="setParametersButtons" variant="outline-primary" @click="changeNamesOfAxis">Zmeň názvy osí
        </b-button>
      </b-col>
      <b-col>
        <b-button class="setParametersButtons" variant="outline-success" @click="changeColorOfClusters">Zmeň farbu
          zhlukov
        </b-button>
      </b-col>
      <b-col>
        <b-button class="setParametersButtons" variant="outline-dark" @click="changeParameters">Zmeň parametre
        </b-button>
      </b-col>
    </b-row>
    <b-button @click="updateNameAxes"> skuska</b-button>
    <p> {{ newXAxes }}</p>
    <b-input type="text" v-model="newXAxes"></b-input>
    <b-input type="text" v-model="newYAxes"></b-input>
    <!--<chrome v-model="colors" @change-color="onChange"></chrome>-->
    <scatter :key="change" :chart-data="data.datasets" :options="options"></scatter>
  </div>
</template>

<script>
  import Scatter from "@/components/vue-chartjs/Scatter";
  import {Chrome} from 'vue-color';

  export default {
    name: "StatisticsGraph",
    components: {
      Scatter,
      Chrome
    },
    props: {
      columns: Array
    },
    data() {
      return {
        data: {
          datasets: [],
        },
        options: {
          scales: {
            xAxes: [],
            yAxes: []
          }
        },
        typesOfClusters: null,
        dataEntries: null,
        clusters: null,
        colorPallet: ['#ff9418', '#06aa19', '#cc2417', '#feff0e', '#32aa41', '#cba'],
        xLabel: 0,
        yLabel: 1,
        indexCluster: 4,
        newXAxes: "nieco",
        newYAxes: "nieco2",
        change: true,
        colors: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
        }
      }
    },
    watch: {
      /*newXAxes: function (val) {
        this.options.scales.xAxes[0].scaleLabel.labelString = val;
      }*/
    },
    methods: {
      onChange (val) {
        this.colors = val;
      },
      updateNameAxes() {
        this.change = !this.change;
        try{
          this.options.scales.xAxes[0].scaleLabel.labelString = this.newXAxes;
          this.options.scales.yAxes[0].scaleLabel.labelString = this.newYAxes;
        }catch (pokemon) {
         this.assignXAxes();
         this.assignYAxes();
          console.log(pokemon);
        }
      },
      start() {
        this.dataEntries = this.assignAllDataEntries();
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
        let rows = this.$store.getters.getRows;
        if (rows.length > 0) {
          allData = Object.entries(rows); //-> array of allData - on every index is another array,
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
        if (this.options.scales.xAxes.length > 0) {
          this.options.scales.xAxes = [];
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
      changeNamesOfAxis() {
        this.$swal({
          title: "Zmenit nazvy osi",
          html:
          'Os x: <input type="text" name="inputNewXAxes"><br><br>' +
          'Os y: <input type="text" name="inputNewYAxes">',
            /*'Os x: <input id="xAxis" v-model="newXAxes"><br><br>' +
            'Os y: <input id="yAxis">',*/
          focusConfirm: true,
          /*document.getElementById("myText").value*/
        }).then((result) => {
            if(result){
             // this.newXAxes = document.getElementById("inputNewXAxes").value;
             // this.newYAxes = document.getElementById("inputNewYAxes").value;
              this.newXAxes = document.getElementsByName('inputNewXAxes')[0].value;
              this.newYAxes = document.getElementsByName('inputNewYAxes')[0].value              ;
              this.updateNameAxes();
            }else{
              this.$swal({text: "chyba"});
            }

        });

        /*
        * .then((result) => {
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
        *
        * */




      },
      changeColorOfClusters() {
        this.$swal({
          html: '<chrome id="picker" v-model="colors" @change-color="onChange"></chrome>',
          focusConfirm: true,
          /*preConfirm: () => {
            return [
              document.getElementById('picker').value,
            ]
          }*/
        })
      },
      changeParameters() {

      },
    },
    mounted() {
      this.start();
    }
  }
</script>

<style scoped>
  .setParametersButtons {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
