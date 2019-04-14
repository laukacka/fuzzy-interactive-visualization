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
        <b-col v-if="firstTimeAccess">
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
                <b-dropdown-item-button v-for="column in this.$store.getters.getColumns"
                                        @click="setLineChart(column.label)">
                  {{column.label}}
                </b-dropdown-item-button>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="5" class="coefficientContainer" v-if="showCoefficients">
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
            <b-col sm="3">
              <label>Názov funkcie: </label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="text" v-model="labelFunction"></b-form-input>
            </b-col>
          </b-row>
          <!--<b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="8">
              <b-input-group prepend="0" :append="' ' + temporaryMaxXValue" class="mt-3">
                <b-form-input type="range" min="temporaryMinXValue" v-model="temporaryMaxXValue" step="0.1"
                              :max="rangeMaxValue"></b-form-input>
              </b-input-group>
            </b-col>
          </b-row>-->

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button @click="showColorPicker = !showColorPicker">Nastaviť farbu</b-button>
              <chrome v-if="showColorPicker === true" style="margin: auto" v-model="color"
                      @change-color="updateColorMembershipFunction"></chrome>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button @click="start" :disabled="maxXValue === '' || coefficientA === '' ||
               coefficientB === '' || coefficientC === '' || labelFunction === ''">Vykresliť
              </b-button>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6" offset-md="1">
          <b-row>
            <b-col>
              <b-row>
                <b-col>
                  <fuzzification-line-chart :key="reupdateChart"
                                            :data="data"
                                            :options="options"
                  ></fuzzification-line-chart>
                </b-col>
              </b-row>

              <b-row v-if="showSlider">
                <b-col>
                  <vue-slider :tooltip-placement="'bottom'" v-bind="slider" v-model="slider.value">
                  </vue-slider>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="fuzzificationButtons">
      <b-row>
        <!--<b-col>
          <b-button>Zobraz histogram</b-button>
        </b-col>-->

        <b-col>
          <b-button @click="changeAttribute">Zmeň atribút</b-button>
        </b-col>

        <b-col>
          <b-button @click="addNewMembershipFunction">Pridaj funkciu</b-button>
        </b-col>

        <!-- <b-col>
           <b-button @click="mapPointsOnFunction">Namapuj body na funkciu</b-button>
         </b-col>-->

        <b-col>
          <b-button @click="showSlider = !showSlider">Zmeň x-ovú os</b-button>
          <b-button @click="clickedLineChartNo = onClickAtLine(item, $event) ">skusobna</b-button>
          {{clickedLineChartNo}}

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
    components: {FuzzificationLineChart, Chrome},
    data() {
      return {
        clickedLineChartNo : 0,
        maxXValue: 0,
        data: {
          datasets: []
        },
        options: {
          events: ['click'],
          animations: true,
          onClick: function (evt, item) {
            console.log(item);
            alert('zvoleny: ' + item[0]._datasetIndex);
            //return item[0]._datasetIndex;
          },
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
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 1,
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 1,
                suggestedMin: 0,
                suggestedMax: 1
              },
              type: 'linear'
            }]
          }
        },
        dataEntries: null,
        attributeIndex: null,
        membershipFunction: this.$store.getters.getMembershipFunction,
        coefficientA: '',
        coefficientB: '',
        coefficientC: '',
        coefficientD: '',
        labelFunction: '',
        reupdateChart: false,
        color: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
        },
        slider: {
          value: [0, 0],
          min: 0,
          max: 0,
          interval: 0.1,
          disabled: false,
          show: true,
          useKeyboard: true,
          tooltip: 'always',
          formatter: '¥{value}',
          mergeFormatter: '¥{value1} ~ ¥{value2}'
        },
        showColorPicker: false,
        showScatterPlot: false,
        showSlider: false,
        showCoefficients: false,
        attributes: [],
        attribute: null,
        firstTimeAccess: false,


      }
    },
    methods: {
      randomColorGenerator: function () {
        return ('#' + Math.random().toString(16).slice(2, 8));
      },
      start() {
        this.showColorPicker = false;
        //this.createMembershipFunction();
        this.createFunction();
        this.assignFunction();
        this.data.datasets = this.membershipFunction[0].functions;
        //TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.$store.dispatch("loadMembershipFunction", this.membershipFunction);
        this.updateChart();
        this.addNewMembershipFunction();
      },
      changeAttribute() {
        alert('spravit po restrukturalizacii objektu funkcii prislusnosti');
      },
      addNewMembershipFunction() {
        this.coefficientA = '';
        this.coefficientB = '';
        this.coefficientC = '';
        this.coefficientD = '';
        this.labelFunction = '';
      },
      mapPointsOnFunction() {
        this.showScatterPlot = !this.showScatterPlot;
      },
      updateColorMembershipFunction() {

      },
      setLineChart(columnLabel) {
        this.attribute = columnLabel;
        let columns = this.$store.getters.getColumns;
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].label === this.attribute) {
            this.attributeIndex = columns[i].id;
            break;
          }
        }
        this.dataEntries = this.assignAllDataEntries();
        for (let i = 0; i < this.dataEntries.length; i++) {
          this.attributes = Object.entries(this.dataEntries[i][1]);
          let xValue = this.attributes[this.attributeIndex][1];
          if (xValue > this.maxXValue) {
            this.maxXValue = xValue;
          }
        }
        this.showCoefficients = true;
        //this.firstTimeAccess = false;
        this.slider.max = this.maxXValue;
        this.slider.value[1] = this.maxXValue;
        this.options.scales.xAxes[0].ticks.max = this.maxXValue;
        if (this.firstTimeAccess) {
          this.createMembershipFunction();
        }
        this.updateChart();
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
        let newMembershipFunction = {
          title: this.attribute,
          minX: 0,
          maxX: this.maxXValue,
          nameXAxis: 'x',
          nameYAxis: 'y',
          sortedXValues: [],
          functions: []
        };
        if (this.membershipFunction.length > 0) {
          this.membershipFunction = [];
        }
        this.membershipFunction.push(newMembershipFunction);

        let xValues = [];
        for (let i = 0; i < this.dataEntries.length; i++) {
          this.attributes = Object.entries(this.dataEntries[i][1]);
          let xValue = this.attributes[this.attributeIndex][1];
          xValues.push(xValue);
        }
        xValues.sort();
        if (this.membershipFunction[0].sortedXValues.length > 0) {
          this.membershipFunction[0].sortedXValues = [];
        }
        this.membershipFunction[0].sortedXValues = xValues;
        this.firstTimeAccess = false;
      },
      createFunction() {
        let newFunction = {
          label: this.labelFunction,
          borderColor: this.color.hex,
          borderWidth: 2,
          coefficientA: this.coefficientA,
          coefficientB: this.coefficientB,
          coefficientC: this.coefficientC,
          coefficientD: this.coefficientD,
          data: [],
          fill: false,
          tension: 0
        };
        this.membershipFunction[0].functions.push(newFunction);
      },
      assignFunction() {
        for (let i = 0; i < this.membershipFunction[0].sortedXValues.length; i++) {
          let xValue = this.membershipFunction[0].sortedXValues[i];
          let mu = 0;
          if (this.coefficientD === '') {
            mu = this.triangularCalculation(xValue);
          } else {
            mu = this.trapezoidCalculation(xValue);
          }
          for (let j = 0; j < this.membershipFunction[0].functions.length; j++) {
            if (this.membershipFunction[0].functions[j].label === this.labelFunction) {
              let myFunction = this.membershipFunction[0].functions[j];
              myFunction.data.push({
                x: xValue,
                y: mu
              });
            }
          }
        }
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
        if (xValue <= this.coefficientA) {
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
        if (this.coefficientD <= xValue) {
          mu = 0;
        }
        return mu;
      },
      onClickAtLine(item, event) {
        event.preventDefault();
        alert('klikli sme');
       // function (evt, item) {
        console.log(event);
          console.log(item);

          return Math.random();
         // alert(item[0]._model.backgroundColor);
      //  },*/
      },
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzifikácia');

      let membershipFunction = this.$store.getters.getMembershipFunction;
      this.firstTimeAccess = membershipFunction.length === 0;

      if (!this.firstTimeAccess) {
        this.data.datasets = membershipFunction[0].functions;
        this.setLineChart(membershipFunction[0].title);
      }

      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
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
    margin-top: 35px;
    margin-bottom: 10px;
  }
</style>
