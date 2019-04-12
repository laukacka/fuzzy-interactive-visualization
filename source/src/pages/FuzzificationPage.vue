<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow" title="Metódy"></i>
          </router-link>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="fuzzificationContainer">
      <b-row align-v="center" align-h="center" class="coefficientRow">
        <b-col v-if="isNewMembershipFunction === true">
          <b-row>
            <b-col>
              <h5>Z ktorého stĺpca chceš vypočítať funkciu príslušnosti?</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <i class="fas fa-arrow-down fa-3x arrow " aria-hidden="true"></i>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-dropdown text="Stĺpce" dropdown>
                <b-dropdown-item-button v-for="column in this.$store.getters.getColumns" @click="setLineChart(column.id)">
                  {{column.label}}
                </b-dropdown-item-button>
              </b-dropdown>
            </b-col>
          </b-row>

        </b-col>
        <b-col md="5" class="coefficientContainer" v-if="isNewMembershipFunction === false">
          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="10">
              <h6>Parametre funkcie príslušnosti pre: {{ attributes[attributeIndex][0] }}</h6>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient a:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" v-model="coefficientA"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient b:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" v-model="coefficientB"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient c:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" v-model="coefficientC"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="3">
              <label>Koeficient d:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" v-model="coefficientD"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="8">
              <b-input-group prepend="0" :append="' ' + temporaryMaxXValue" class="mt-3">
                <b-form-input type="range" min="0" v-model="temporaryMaxXValue" step="0.1"
                              :max="rangeMaxValue"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button @click="showColorPicker = !showColorPicker">Zmeň farbu</b-button>
              <chrome v-if="showColorPicker === true" style="margin: auto" v-model="color"
                      @change-color="updateColorMembershipFunction"></chrome>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button @click="start" :disabled="maxXValue === null || coefficientA === null ||
               coefficientB === null || coefficientC === null">Vykresli
              </b-button>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6" offset-md="1">
          <b-row>
            <b-col>
              <fuzzification-line-chart :key="reupdateChart" :data="data" :options="options"></fuzzification-line-chart>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="fuzzificationButtons">
      <b-row>
        <b-col>
          <b-button>Zobraz histogram</b-button>
        </b-col>

        <b-col>
          <b-button @click="addNewMembershipFunction">Pridaj funkciu</b-button>
        </b-col>

        <b-col>
          <b-button @click="mapPointsOnFunction">Namapuj body na funkciu</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import FuzzificationLineChart from "@/components/Fuzzification/FuzzificationLineChart";
  import {Chrome} from 'vue-color';

  export default {
    name: "FuzzificationPage",
    components: {
      FuzzificationLineChart,
      Chrome
    },
    data() {
      return {
        maxXValue: null,
        temporaryMaxXValue: 0,
        rangeMaxValue: 0,
        data: {
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            mode: 'nearest',
            intersect: true
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 5,
              hoverRadius: 10
            }
          },
          scales: {
            yAxes: [{
              beginAtZero: true,
              max: 1
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                max: 0,
                /*stepSize: 0.1*/
              },
              type: 'linear'
            }]
          }
        },
        dataEntries: null,
        attributeIndex: null,
        membershipFunctions: [],
        coefficientA: null,
        coefficientB: null,
        coefficientC: null,
        coefficientD: null,
        reupdateChart: false,
        color: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
        },
        showColorPicker: false,
        showScatterPlot: false,
        isNewMembershipFunction: true,
        attributes: []
      }
    },
    methods: {
      randomColorGenerator: function () {
        return ('#' + Math.random().toString(16).slice(2, 8));
      },
      start() {
        this.showColorPicker = false;
        this.createMembershipFunction();
        this.assignMembershipFunction();
        this.data.datasets = this.membershipFunctions;
        this.addNewMembershipFunction();
      },
      addNewMembershipFunction() {
        this.isNewMembershipFunction = true;
        this.coefficientA = null;
        this.coefficientB = null;
        this.coefficientC = null;
        this.coefficientD = null;
        this.temporaryMaxXValue = 0;
        this.rangeMaxValue = 0;
      },
      mapPointsOnFunction() {
        this.showScatterPlot = !this.showScatterPlot;
      },
      updateColorMembershipFunction() {

      },
      setLineChart(columnID) {
        this.isNewMembershipFunction = false;
        this.dataEntries = this.assignAllDataEntries();
        this.attributeIndex = columnID;
        let localMaxXValue = 0;
        for (let i = 0; i < this.dataEntries.length; i++) {
          this.attributes = Object.entries(this.dataEntries[i][1]);
          let xValue = this.attributes[this.attributeIndex][1];
          if (xValue > localMaxXValue) {
            localMaxXValue = xValue;
          }
          if (xValue > this.maxXValue) {
            this.maxXValue = xValue;
          }
        }
        this.temporaryMaxXValue = localMaxXValue;
        this.rangeMaxValue = localMaxXValue;
      },
      updateChart() {
        this.reupdateChart = !this.reupdateChart;
      },
      assignAllDataEntries() {
        let allData = null;
        let rows = this.$store.getters.getRows;
        if (rows.length > 0) {
          allData = Object.entries(rows);
        }
        return allData;
      },
      createMembershipFunction() {
        let membershipFunction = {
          label: this.attributes[this.attributeIndex][0],
          borderColor: this.color.hex,
          borderWidth: 2,
          data: [],
          fill: false,
          tension: 0
        };
        this.membershipFunctions.push(membershipFunction);
      },
      assignMembershipFunction() {
        let xValues = [];
        for (let i = 0; i < this.dataEntries.length; i++) {
          this.attributes = Object.entries(this.dataEntries[i][1]);
          let xValueA = this.attributes[this.attributeIndex][1];
          if (xValues.includes(xValueA) === false) {
            xValues.push(xValueA);
          }
        }
        xValues.sort();
        for (let i = 0; i < xValues.length; i++) {
          let xValue = xValues[i];
          let mu = 0;
          if (this.coefficientD === null || this.coefficientD === '') {
            mu = this.triangularCalculation(xValue);
          } else {
            mu = this.trapezoidCalculation(xValue);
          }
          for (let j = 0; j < this.membershipFunctions.length; j++) {
            if (this.membershipFunctions[j].label === this.attributes[this.attributeIndex][0]) {
              this.membershipFunctions[j].data.push({
                x: xValue,
                y: mu
              });
            }
          }
        }
        this.options.scales.xAxes[0].ticks.max = this.maxXValue;
        this.updateChart();
      },
      triangularCalculation(xValue) {
        let mu = 0;
        if (this.coefficientA <= xValue && xValue <= this.coefficientB) {
          mu = (xValue - this.coefficientA) / (this.coefficientB - this.coefficientA);
        }
        if (xValue === this.coefficientB) {
          mu = 1;
        }
        if (this.coefficientB <= xValue || xValue >= this.coefficientC) {
          mu = (this.coefficientC - xValue) / (this.coefficientC - this.coefficientB);
        }
        if (xValue <= this.coefficientA || this.coefficientC <= xValue) {
          mu = 0;
        }
        return mu;
      },
      trapezoidCalculation(xValue) {
        let mu = 0;
        if (xValue <= this.coefficientA ) {
          mu = 0;
        }
        if (this.coefficientA <= xValue && xValue <= this.coefficientB) {
          mu = (xValue - this.coefficientA) / (this.coefficientB - this.coefficientA);
        }
        if (this.coefficientB <= xValue && xValue <= this.coefficientC) {
          mu = 1;
        }
        if (this.coefficientC <= xValue && xValue <= this.coefficientD) {
          mu = (this.coefficientD - xValue) / (this.coefficientD - this.coefficientC);
        }
        if ( this.coefficientD <= xValue) {
          mu = 0;
        }
        return mu;
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzifikácia');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          title: 'Znovu načítaj dáta.'
        }).then((result) => {
          if (result.value) {
            this.$router.push("dataInput");
          }
        })
      }
    }
  }
</script>

<style scoped>
  .fuzzificationContainer {
    margin-top: 100px;
    margin-bottom: 10px;
  }

  .coefficientContainer {
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
  }

  .coefficientRow {
    margin-bottom: 5px;
  }

  .arrow {
    animation: arrowSlide 1s ease-in-out infinite;
    margin-bottom: 15px;
  }

  @keyframes arrowSlide {
    50% {
      transform: translate(0, 10px);
    }
  }

  .fuzzificationButtons {
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
