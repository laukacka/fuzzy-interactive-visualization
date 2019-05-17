<template>
  <b-container>
    <b-row v-if="!showHistogram" align-v="center" align-h="center" class="dropdown-histogram-wrapper">
      <b-col md="6" class="dropdown-histogram" cols="9" lg="5">
        <h5>Choose an attribute for histogram:</h5>
        <b-dropdown class="dropdown-histogram-button" variant="info" text="Attributes" dropdown>
          <b-dropdown-item-button v-for="column in columns"
                                  @click="setHistogram(column.id)" :key="column.label">
            {{column.label}}
          </b-dropdown-item-button>
        </b-dropdown>
      </b-col>
    </b-row>

    <b-row v-if="showHistogram" align-v="center" align-h="center" class="histogram-wrapper">
      <b-col md="9">
        <bar-chart :key="reupdateHistogram" :data="data" :options="options"></bar-chart>
      </b-col>
    </b-row>

    <b-row v-if="showHistogram" align-v="center" align-h="center" class="changeButton">
      <b-col md="8">
        <b-button variant="info" @click="showSlider = !showSlider">Change number of
          intervals
        </b-button>
      </b-col>
    </b-row>

    <b-row v-if="showSlider" align-v="center" align-h="center" class="slider">
      <b-col md="8">
        <vue-slider :tooltip-placement="'bottom'" v-bind="slider" v-model="slider.value"
                    @change="updateNumberOfColumns(slider.value)"></vue-slider>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import BarChart from "../vue-chartjs/BarChart";

  export default {
    name: "OriginalDataHistogram",
    components: {
      BarChart
    },
    data() {
      return {
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        reupdateHistogram: false,
        attributeIndex: 0,
        showHistogram: false,
        attributeRows: null,
        dataEntries: null,
        originalData: [],
        range: 10,
        min: '',
        max: '',
        showSlider: false,
        columns: [],
        slider: {
          value: 10,
          min: 1,
          max: 0,
          interval: 1,
          disabled: false,
          show: true,
          useKeyboard: true,
          tooltip: 'always',
          formatter: '¥{value}',
          mergeFormatter: '¥{value1} ~ ¥{value}'
        },
      }
    },
    methods: {
      assignAllDataEntries() {
        let allData = null;
        let rows = this.$store.getters.getRows;
        if (rows.length > 0) {
          allData = Object.entries(rows); //-> array of allData - on every index is another array,
        }
        return allData;
      },
      createDataset() {
        this.data.datasets = [];
        let dataset = {
          label: this.$store.getters.getColumns[this.attributeIndex].label,
          borderWidth: 2,
          borderColor: '#4809b6',
          backgroundColor: '#5717b6',
          data: []
        };
        this.data.datasets.push(dataset);
      },
      assignData() {
        for (let i = 0; i < this.dataEntries.length; i++) {
          let attributes = Object.entries(this.dataEntries[i][1]); //from attributes we make array for better access
          let data = attributes[this.attributeIndex][1]; //get type (name) of cluster from last attribute (index 4)
          this.data.datasets[0].data.push(data);
          this.originalData.push(data);
        }
      },
      updateNumberOfColumns(value) {
        this.range = value;

        this.method();
      },
      method() {
        let osX = []; // range (od - do)
        let osY = []; // range hodnot s danymi poctami co sa napocitaju
        this.data.labels = [];
        let lengthOfInterval = (this.max - this.min) / this.range;
        lengthOfInterval = Math.round((lengthOfInterval) * 100) / 100;
        let value = this.min;

        for (let i = 0; i < this.range; i++) {
          let valueBottom = value;
          value += lengthOfInterval;
          value = Math.round((value) * 100) / 100;

          if (i === 0) {
            osX[0] = value;
            this.data.labels.push(' - ' + value);
          } else if (i === this.range - 1) {
            osX[i] = valueBottom;
            this.data.labels.push(valueBottom + ' - ');
          } else {
            osX[i] = value;
            this.data.labels.push(valueBottom + ' - ' + value);
          }
          osY[i] = 0;
        }

        //data - vsetky co mas
        // y os - je pocet kotry mas
        // potrebujes zistit, kkolko ich tam vlastne mas
        for (let i = 0; i < this.originalData.length; i++) {
          let point = this.originalData[i];
          //prechadzam kazdy bod a snazim sa zistit do ktoreho chievika sa zapocita
          if (point < osX[0]) {
            osY[0] = osY[0] + 1;
          } else if (osX[this.range - 1] <= point) {
            osY[this.range - 1] = osY[this.range - 1] + 1;
          }
          for (let j = 1; j < this.range; j++) {
            if (osX[j - 1] <= point && point <= osX[j]) {
              osY[j] = osY[j] + 1;
            }
          }
        }
        this.data.datasets[0].data = osY;
        this.reupdateHistogram = !this.reupdateHistogram;
      },
      setHistogram(columnID) {
        this.attributeIndex = columnID;
        this.dataEntries = this.assignAllDataEntries();
        this.createDataset();
        this.assignData();
        this.data.labels = [];

        this.min = Math.min.apply(null, this.originalData);
        this.max = Math.max.apply(1000000000000000, this.originalData);

        this.method();

        this.slider.max = this.dataEntries.length;
        this.reupdateHistogram = !this.reupdateHistogram;
        this.showHistogram = true;
      },
    },
    beforeCreate() {

    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Original data - Histogram');
      let columns = this.$store.getters.getColumns;
      let file = this.$store.getters.getRows;
      let row = file[0];
      let objectRow = Object.entries(row);
      this.columns = [];
      for (let i = 0; i < objectRow.length; i++) {
        if (isNaN(objectRow[i][1]) === false) {
          this.columns.push(columns[i]);
        }
      }
    }
  }
</script>

<style scoped>
  .dropdown-histogram {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
  }

  .dropdown-histogram-button {
    margin: 10px;
  }

  .histogram-wrapper {
    margin-top: 10px;
  }

  @media screen and (max-width: 768px) {
    .histogram-wrapper {
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .slider {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .dropdown-histogram-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 32%;
    margin: auto;
  }

  .changeButton {
    margin: 10px;
  }

  .slider {
    margin-bottom: 30px;
  }
</style>
