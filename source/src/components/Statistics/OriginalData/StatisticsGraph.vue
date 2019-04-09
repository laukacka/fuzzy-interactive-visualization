<template>
  <div>
    <b-row align-v="center">
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeNamesOfAxis">Zmeniť názvy osí
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeColorOfClusters">Zmeniť farbu
          zhlukov
        </b-button>
      </b-col>
      <b-col md="4">
        <b-button class="setParametersButtons" variant="outline-info" @click="changeParameters">Zmeniť parametre
        </b-button>
      </b-col>
    </b-row>
    <b-row v-if="isChangingColorCluster" align-v="center" class="changeColor">
      <b-col md="5" offset-md="1">
        <label>
          <b-form-select v-model="nameClusterColorChange" class="formSelect">
            <template slot="first">
              <option disabled>-- Vyber zhluk --</option>
            </template>
            <option v-for="cluster in typesOfClusters">
              {{ cluster }}
            </option>
          </b-form-select>
        </label>
      </b-col>
      <b-col md="5">
        <chrome style="margin: auto" v-model="colorClusterChanged" @change-color="updateColorClusters"></chrome>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <scatter :key="reUploadGraph" :chart-data="data.datasets" :options="options" class="scatter"></scatter>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Scatter from "@/components/vue-chartjs/Scatter";
  import {Chrome} from 'vue-color';

  export default {
    name: "StatisticsGraph",
    props: {
      firstTimeGraph: Boolean
    },
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
            yAxes: []
          }
        },
        typesOfClusters: null,
        dataEntries: null,
        clusters: null,
        colorPallet: [],
        isChangingColorCluster: false,
        nameClusterColorChange: '-- Vyber zhluk --',
        randomColor: '',
        colorClusterChanged: {
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
        reUploadGraph: true,
      }
    },
    watch: {
      colorClusterChanged: function () {
        this.updateColorClusters();
      }
    },
    methods: {
      randomColorGenerator: function () {
        return this.randomColor = '#' + Math.random().toString(16).slice(2, 8);;
      },
      uploadGraph() {
        this.reUploadGraph = !this.reUploadGraph;
      },
      updateNameAxes(val) {
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
        this.uploadGraph();
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
      createClusters: function () {
        //we create a new clusters and add them to array of clusters
        this.clusters = [];
        this.colorPallet = [];
        for (let i = 0; i < this.typesOfClusters.length; i++) { //we create as many clusters as we have types (names) of clusters
          let randomColor = '';
          do {
            randomColor = this.randomColorGenerator();
          } while (this.colorPallet.includes(randomColor) === true);
          this.colorPallet.push(randomColor);
          let cluster = {
            label: this.typesOfClusters[i], //label is set according to type of cluster
            data: [],
            borderColor: '#0c0d10',
            backgroundColor: randomColor
          };
          this.clusters.push(cluster); //add new cluster to array of clusters
        }
      },
      updateColorClusters: function () {
        try {
          if (this.colorClusterChanged != null) {
            if (this.colorClusterChanged.hex != null) {
              console.log(typeof this.clusters[0].label);
              console.log(typeof this.nameClusterColorChange);
              for (let i = 0; i < this.clusters.length; i++) {
                if (this.clusters[i].label === this.nameClusterColorChange) {
                  this.clusters[i].backgroundColor = this.colorClusterChanged.hex;
                }
              }
              this.assignClusters();
            }
          }
          this.uploadGraph();
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
        this.nameClusterColorChange = '-- Vyber zhluk --';
        this.isChangingColorCluster = !this.isChangingColorCluster;
      },
      changeParameters() {
        this.isChangingColorCluster = false;
        let columns = this.$store.getters.getColumns;
        this.$swal.mixin({
          input: 'range',
          showCloseButton: true,
          inputAttributes: {
            min: 1,
            max: columns.length,
            step: 1
          },
          confirmButtonText: 'Ďalej',
          confirmButtonColor: '#1bd60b',
          progressSteps: ['1', '2', '3'],
          backdrop: `rgba(0, 0, 0, 0.8)`
        }).queue([
          {
            title: 'Index stĺpca pre X-OVÚ OS:',
            inputValue: this.xLabel + 1,
          },
          {
            title: 'Index stĺpca pre Y-OVÚ OS:',
            inputValue: this.yLabel + 1,
          },
          {
            title: 'Index stĺpca pre ZHLUKY:',
            inputValue: this.indexCluster + 1,
          }
        ]).then((result) => {
          if (result.value) {
            this.xLabel = result.value[0] - 1;
            this.yLabel = result.value[1] - 1;
            this.indexCluster = result.value[2] - 1;
            this.$swal({
              title: 'Hotovo!',
              type: 'success',
              confirmButtonColor: '#1bd60b',
              backdrop: `rgba(0, 0, 0, 0.8)`
            });
            this.start();
            this.uploadGraph();
          }
        })
      },
      emitToParent() {
        this.$emit('childToParent', false);
      }
    },
    created() {
      this.changeParameters();
      this.emitToParent();
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
