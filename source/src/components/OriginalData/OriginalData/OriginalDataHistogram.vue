<template>
  <b-container>
    <b-row v-if="!showHistogram" align-v="center" align-h="center" class="dropdown-histogram-wrapper">
      <b-col md="6" class="dropdown-histogram" cols="9" lg="5">
        <h5>Choose an attribute for histogram:</h5>
        <b-dropdown class="dropdown-histogram-button" variant="info" text="Attributes" dropdown>
          <b-dropdown-item-button v-for="column in this.$store.getters.getColumns"
                                  @click="setHistogram(column.id)">
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
        <b-button class="numberColumnsButton" variant="info" @click="showSlider = !showSlider">Change number of columns</b-button>
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
  import BarChart from "@/components/vue-chartjs/BarChart";

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
          mergeFormatter: '¥{value1} ~ ¥{value2}'
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

        this.metoda();
      },
      metoda() {
        let osX = []; // range (od - do)
        let osY = []; // range hodnot s danymi poctami co sa napocitaju
        this.data.labels = [];
        let value = (this.max - this.min) / this.range;

        let value2 = this.min;

        value = Math.round((value) * 100) / 100;
        for (let i = 0; i < this.range; i++) {
          value2 += value;
          value2 = Math.round((value2) * 100) / 100;
          osX.push(value2);
          osY.push(0);

          this.data.labels.push(value2);
        }

        //data - vsetky co mas
        // y os - je pocet kotry mas
        // potrebujes zistit, kkolko ich tam vlastne mas

        for (let i = 0; i < this.originalData.length; i++) {
          var bod = this.originalData[i];
          //prechadzam kazdy ob a snazim sa zistit do ktoreho chievika sa zapocita

          if (osX[0] > bod) {
            osY[0] = osY[0] + 1;
          } else if (osX[this.range] < bod) {
            osY[this.range] = osY[this.range] + 1;
          } else {
            for (let j = 1; j < this.range; j++) {
              if (bod >= osX[j - 1] && bod < osX[j]) {
                osY[j] = osY[j] + 1;
              }
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
        this.max = Math.max.apply(null, this.originalData);

        this.metoda();

        this.slider.max = this.dataEntries.length;
        this.reupdateHistogram = !this.reupdateHistogram;
        this.showHistogram = true;
      },
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Original data - Histogram');
      this.reupdateHistogram = !this.reupdateHistogram;
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
