<template>
  <div>
    <b-row align-h="center" align-v="center">
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeNamesOfAxis">Change axis names
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeColorOfClusters">Change clusters color
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeParameters">Change parameters
        </b-button>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center" class="changeColor" v-if="clickOnChangeColor">
      <b-col md="5" offset-md="1">
        <b-row align-v="center" align-h="center">
          <label>
            <b-form-select v-model="nameClusterColorChange" class="formSelect">
              <template slot="first">
                <option disabled>-- Choose cluster --</option>
              </template>
              <option v-for="cluster in typesOfClusters">
                {{ cluster }}
              </option>
            </b-form-select>
          </label>
        </b-row>
        <b-row align-v="center" align-h="center" v-if="nameClusterColorChange !== '-- Choose cluster --'">
          <b-button variant="outline-info" @click="updateColorClusters">Change color</b-button>
        </b-row>
      </b-col>
      <b-col md="5" v-if="nameClusterColorChange !== '-- Choose cluster --'">
        <h6>Choose color:</h6>
        <chrome style="margin: auto" v-model="color"></chrome>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center" style="margin-top: 20px; ">
      <b-col>
        <scatter :key="reupdateGraph" :chart-data="data" :options="options" class="scatter"></scatter>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Scatter from "@/components/vue-chartjs/Scatter";
  import {Chrome} from 'vue-color';

  export default {
    name: "StatisticsScatter",
    components: {
      Scatter,
      Chrome
    },
    data() {
      return {
        data: {
          datasets: [],

        },
        options: {
          scales: {
            xAxes: [],
            yAxes: [],
          },
          animation: {
            duration: 0
          }
        },
        columns: this.$store.getters.getColumns,
        typesOfClusters: null,
        dataEntries: null,
        clusters: this.$store.getters.getClusters,
        colorPallet: [],
        isChangingColorCluster: '',
        nameClusterColorChange: '-- Choose cluster --',
        color: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
        },
        xLabel: 0,
        yLabel: 0,
        indexCluster: 0,
        newXAxes: '',
        newYAxes: '',
        reupdateGraph: true,
        firstTimeAccess: true,
        clickOnChangeColor: false
      }
    },
    methods: {
      start() {
        this.dataEntries = this.assignAllDataEntries();
        this.foundNewClusters();
        this.createClusters();
        this.assignClusters();
        this.data.datasets = this.clusters;
        if (this.$store.getters.getClusters.length > 0) {
          this.$store.getters.getClusters.length = [];
        }
        this.$store.dispatch("loadClusters", this.clusters);
        this.assignXAxes();
        this.assignYAxes();
      },
      randomColorGenerator: function () { //return ('#' + Math.random().toString(16).slice(2, 8));
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      updateGraph() {
        this.reupdateGraph = !this.reupdateGraph;
      },
      updateNameAxes() {
        if (this.newXAxes !== '' && this.newYAxes !== '') {
          this.options.scales.xAxes[0].scaleLabel.labelString = this.newXAxes;
          this.options.scales.yAxes[0].scaleLabel.labelString = this.newYAxes;
          this.columns[this.xLabel].label = this.newXAxes;
          this.columns[this.yLabel].label = this.newYAxes;
        } else if (this.newXAxes !== '' && this.newYAxes === '') {
          this.options.scales.xAxes[0].scaleLabel.labelString = this.newXAxes;
          this.columns[this.xLabel].label = this.newXAxes;
        } else if (this.newYAxes !== '' && this.newXAxes === '') {
          this.options.scales.yAxes[0].scaleLabel.labelString = this.newYAxes;
          this.columns[this.yLabel].label = this.newYAxes;
        }
        this.newXAxes = '';
        this.newYAxes = '';
        this.$store.dispatch('loadColumns', this.columns);
        this.updateGraph();
      },
      assignAllDataEntries() {
        let allData = null;
        let rows = this.$store.getters.getRows;
        if (rows.length > 0) {
          allData = Object.entries(rows); //-> array of allData - on every index is another array,
        }
        return allData;
      },
      foundNewClusters() {
        this.typesOfClusters = [];
        for (let i = 0; i < this.dataEntries.length; i++) { //we have to find out have many clusters we have:
          let attributes = Object.entries(this.dataEntries[i][1]);//from attributes we make array for better access
          let typeOfCluster = attributes[this.indexCluster][1]; //get type (name) of cluster from last attribute (index 4),
          if (typeof typeOfCluster === 'number') {
            typeOfCluster = '' + typeOfCluster;
          }
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
      createClusters: function () { //we create a new clusters and add them to array of clusters
        this.clusters = [];
        this.colorPallet = [];
        let cluster = {};
        for (let i = 0; i < this.typesOfClusters.length; i++) { //we create as many clusters as we have types (names) of clusters
          let randomColor = '';
          do {
            randomColor = this.randomColorGenerator();
          } while (this.colorPallet.includes(randomColor) === true);
          this.colorPallet.push(randomColor);
          if (i === 0) {
            cluster = {
              xClustersY: [],
              typesOfClusters: this.typesOfClusters,
              label: this.typesOfClusters[i], //label is set according to type of cluster
              data: [],
              borderColor: '#0c0d10',
              backgroundColor: randomColor
            };
            cluster.xClustersY.push(this.xLabel);
            cluster.xClustersY.push(this.yLabel);
            cluster.xClustersY.push(this.indexCluster);
          } else {
            cluster = {
              label: this.typesOfClusters[i], //label is set according to type of cluster
              data: [],
              borderColor: '#0c0d10',
              backgroundColor: randomColor
            };
          }
          this.clusters.push(cluster); //add new cluster to array of clusters
        }
      },
      assignClusters: function () {  //we have to sort our data to clusters where they belong
        for (let i = 0; i < this.dataEntries.length; i++) {
          let attributes = Object.entries(this.dataEntries[i][1]); //from attributes we make array for better access
          let typeOfCluster = attributes[this.indexCluster][1]; //get type (name) of cluster from last attribute (index 4)
          if (typeof typeOfCluster === 'number') {
            typeOfCluster = '' + typeOfCluster;
          }
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
      updateColorClusters: function () {
        try {
          if (this.color != null) {
            if (this.color.hex != null) {
              for (let i = 0; i < this.clusters.length; i++) {
                if (this.clusters[i].label === this.nameClusterColorChange) {
                  this.clusters[i].backgroundColor = this.color.hex;
                }
              }
              this.assignClusters();
            }
          }
          this.$store.dispatch('loadClusters', this.clusters);
          this.updateGraph();
        } catch (e) {
          console.log(e);
        }
      },
      assignXAxes: function () {
        let columns = this.$store.getters.getColumns;
        if (this.options.scales.xAxes.length > 0) {
          this.options.scales.xAxes = [];
        }
        this.options.scales.xAxes.push({
          display: true,
          scaleLabel: {
            display: true,
            labelString: columns[this.xLabel].label,
            fontSize: 14,
            fontColor: '#000000'
          }
        });
      },
      assignYAxes: function () {
        let columns = this.$store.getters.getColumns;
        if (this.options.scales.yAxes.length > 0) {
          this.options.scales.yAxes = [];
        }
        this.options.scales.yAxes.push({
          display: true,
          scaleLabel: {
            display: true,
            labelString: columns[this.yLabel].label,
            fontSize: 14,
            fontColor: '#000000'
          }
        });
      },
      changeNamesOfAxis() {
        this.isChangingColorCluster = false;
        this.$swal({
          html:
            'Os x: <input type="text" name="inputNewXAxes"><br><br>' +
            'Os y: <input type="text" name="inputNewYAxes">',
          focusConfirm: true,
          showCancelButton: true,
          showCloseButton: true,
          confirmButtonColor: '#1bd60b',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          console.log(result);

          if (result.value === true) {
            try {
              console.log('och');
              let X = document.getElementsByName('inputNewXAxes')[0].value;
              let Y = document.getElementsByName('inputNewYAxes')[0].value;
              this.newXAxes = X;
              this.newYAxes = Y;
              this.updateNameAxes();
            } catch (e) {
              console.log(e);
            }
          }
        });
      },
      changeColorOfClusters() {
        this.nameClusterColorChange = '-- Choose cluster --';
        this.clickOnChangeColor = !this.clickOnChangeColor;
      },
      changeParameters() {
        this.isChangingColorCluster = false;
        let columns = this.$store.getters.getColumns;
        this.$swal.mixin({
          input: 'range',
          inputAttributes: {
            min: 1,
            max: columns.length,
            step: 1
          },
          confirmButtonText: 'Next',
          allowOutsideClick: false,
          confirmButtonColor: '#1bd60b',
          progressSteps: ['1', '2', '3'],
          backdrop: `rgba(0, 0, 0, 0.8)`
        }).queue([
          {
            title: 'Index of X-axis:',
            inputValue: this.xLabel + 1,
          },
          {
            title: 'Index of Y-axis:',
            inputValue: this.yLabel + 1,

          },
          {
            title: 'Index of clusters:',
            inputValue: this.indexCluster + 1,
          }
        ]).then((result) => {
          if (result.value) {
            this.xLabel = result.value[0] - 1;
            this.yLabel = result.value[1] - 1;
            this.indexCluster = result.value[2] - 1;
            this.$swal({
              title: 'Done!',
              type: 'success',
              confirmButtonColor: '#1bd60b',
              backdrop: `rgba(0, 0, 0, 0.8)`
            });
            this.start();
            this.updateGraph();
          }
        })
      },
      emitToParent() {
        this.$emit('childToParent', this.firstTimeAccess);
      }
    },
    mounted() {
      let clusters = this.$store.getters.getClusters;
      if (clusters.length === 0) {
        this.changeParameters();
      } else {
        this.data.datasets = this.clusters;
        this.dataEntries = this.assignAllDataEntries();
        this.xLabel = clusters[0].xClustersY[0];
        this.yLabel = clusters[0].xClustersY[1];
        this.indexCluster = clusters[0].xClustersY[2];
        this.typesOfClusters = clusters[0].typesOfClusters;
        this.assignXAxes();
        this.assignYAxes();
        this.emitToParent();
        this.updateGraph();
      }
    }
  }
</script>

<style scoped>
  .setParametersButtons {
    margin-bottom: 15px;
  }

  .changeColor {
    margin: 15px 5px 15px 5px;
    padding: 10px;
  }

  .formSelect {
    max-width: 200px;
    margin-bottom: 5px;
  }

  .scatter {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
