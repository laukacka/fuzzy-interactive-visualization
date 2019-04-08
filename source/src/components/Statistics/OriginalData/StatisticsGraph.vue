<template>
  <div>
    <b-row align-v="center">
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-primary" @click="changeNamesOfAxis">Zmeň názvy osí
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-success" @click="changeColorOfClusters">Zmeň farbu
          zhlukov
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-dark" @click="changeParameters">Zmeň parametre
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="isChangingColorCluster" align-v="center" class="changeColor">
      <b-col md="3" offset-md="2">
        <label>
          <b-form-select v-model="NameClusterColorChange">
            <template slot="first">
              <option disabled>-- Vyber zhluk --</option>
            </template>
            <option v-for="cluster in typesOfClusters">
              {{ cluster }}
            </option>
          </b-form-select>
        </label>
      </b-col>
      <b-col md="3" offset-md="2">
        <chrome v-model="colorClusterChanged" @change-color="updateColorClusters"></chrome>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <scatter :key="change" :chart-data="data.datasets" :options="options"></scatter>
      </b-col>
    </b-row>
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
        colorPallet: ['#fbff3e', '#06aa19', '#cc2417', '#1552ff', '#f85ffc', '#18cccc'],
        isChangingColorCluster: false,
        NameClusterColorChange: '-- Vyber zhluk --',
        colorClusterChanged: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
        },
        xLabel: 0,
        yLabel: 1,
        indexCluster: 4,
        newXAxes: "nieco",
        newYAxes: "nieco2",
        change: true,
      }
    },
    watch: {
      colorClusterChanged: function () {
        this.updateColorClusters();
      }
    },
    methods: {
      updateNameAxes(val) {
        this.change = !this.change;
        switch (val) {
          case 'x':
            this.options.scales.xAxes[0].scaleLabel.labelString = this.newXAxes;
            break;
          case 'y':
            this.options.scales.yAxes[0].scaleLabel.labelString = this.newYAxes;
            break;
          case 'xy':
            this.options.scales.xAxes[0].scaleLabel.labelString = this.newXAxes;
            this.options.scales.yAxes[0].scaleLabel.labelString = this.newYAxes;
            break;
          default:
        }
      },
      start() {
        this.dataEntries = this.assignAllDataEntries();
        this.foundNewClusters();
        this.createClusters();
        this.assignClusters();
        //this.updateColorClusters();

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
      updateColorClusters: function () {
        try {
          if (this.colorClusterChanged != null) {
            if (this.colorClusterChanged.hex != null) {
              for (let i = 0; i < this.clusters.length; i++) {
                if (this.clusters[i].label === this.NameClusterColorChange) {
                  this.clusters[i].backgroundColor = this.colorClusterChanged.hex;
                }
              }
              this.assignClusters();
            }
          }
          this.change = !this.change;
        } catch (e) {
          console.log(e);
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
          html:
            'Os x: <input type="text" name="inputNewXAxes"><br><br>' +
            'Os y: <input type="text" name="inputNewYAxes">',
          focusConfirm: true,
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: '#1bd60b',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Zmeniť',
          cancelButtonText: 'Zrušiť'
        }).then(() => {
          try {
            let X = document.getElementsByName('inputNewXAxes')[0].value;
            let Y = document.getElementsByName('inputNewYAxes')[0].value;
            if (X !== '' && Y === '') {
              this.newXAxes = X;
              this.updateNameAxes('x');
            }
            if (Y !== '' && X === '') {
              this.newYAxes = Y;
              this.updateNameAxes('y');
            }
            if (X !== '' && Y !== '') {
              this.newXAxes = X;
              this.newYAxes = Y;
              this.updateNameAxes('xy');
            }
          } catch (e) {
            console.log(e);
          }
        });

      },
      changeColorOfClusters() {
        this.isChangingColorCluster = !this.isChangingColorCluster;
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

    margin-bottom: 15px;
  }

  .changeColor {
    margin-top: 15px;
    margin-bottom: 15px;
    border-style: outset;
    padding: 10px;
  }
</style>
