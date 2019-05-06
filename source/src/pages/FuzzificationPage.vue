<template>
  <div>
    <div class="arrow-left">
      <router-link to="/methods"><i class="fas fa-angle-double-left fa-3x backArrow"
                                    title="Methods for data visualization"></i>
      </router-link>
    </div>

    <b-container class="fuzzificationContainer">
      <b-row align-v="center" align-h="center" class="coefficientRow">
        <b-col md="6" cols="10" v-if="firstTimeAccess" class="fuzzificationQuestion">
          <b-row>
            <b-col>
              <h5>Choose an attribute for visualization of fuzzy membership function:</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <i class="fas fa-arrow-down fa-3x arrow " aria-hidden="true"></i>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-dropdown variant="primary" text="Attributes" dropdown>
                <b-dropdown-item-button v-for="column in columns"
                                        @click="setLineChart(column.label)" :key="column.label">
                  {{column.label}}
                </b-dropdown-item-button>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="5" cols="10" class="coefficientContainer" v-if="showCoefficients">
          <b-row align-v="center" align-h="center" class="coefficientRow" style="margin-bottom: 10px">
            <b-col sm="10">
              <h6>Enter the parameters of fuzzy membership function for: <b style="color: red">{{ attribute }}</b></h6>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="4">
              <label>Coefficient a:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" step="any" v-model="coefficientA"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="4">
              <label>Coefficient b:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" step="any" v-model="coefficientB"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="4">
              <label>Coefficient c:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" step="any" v-model="coefficientC"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="4">
              <label>Coefficient d:</label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="number" step="any" v-model="coefficientD"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col sm="4">
              <label>Name of function: </label>
            </b-col>
            <b-col sm="8">
              <b-form-input type="text" v-model="labelFunction"></b-form-input>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button variant="primary" v-if="showColorButton" id="colorButton"
                        @click="showColorPicker = !showColorPicker">Change color
              </b-button>
              <chrome v-if="showColorPicker" style="margin: 5px auto" v-model="color"></chrome>
            </b-col>
          </b-row>

          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <b-button variant="primary" @click="start" id="drawButton" :disabled="maxXValue === '' || coefficientA === '' ||
               coefficientB === '' || coefficientC === '' || labelFunction === ''">Confirm
              </b-button>
            </b-col>
          </b-row>
          <b-row align-v="center" align-h="center" class="coefficientRow">
            <b-col>
              <h6>Coefficients a, b, c and function name have to be filled.</h6>
            </b-col>
          </b-row>
        </b-col>

        <b-col md="6" offset-md="1" class="fuzzification-chart" v-if="showGraph">
          <b-row>
            <b-col>
              <fuzzification-line-chart id="lineChart" :key="reupdateChart" :data="data"
                                        :options="options"></fuzzification-line-chart>
            </b-col>
          </b-row>

          <b-row v-if="showSlider" align-v="center" align-h="center">
            <b-col md="11" cols="10">
              <vue-slider :tooltip-placement="'bottom'" v-bind="slider" v-model="slider.value" :key="reupdateSlider"
                          @change="updateXAxis(slider.value)"></vue-slider>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-container class="fuzzificationButtons" v-if="!firstTimeAccess">
      <b-row align-v="center" align-h="center">
        <b-col md="3" v-if="showChangeCoefficients">
          <b-dropdown variant="primary" text="Change function" dropdown class="fuzzificationButton">
            <b-dropdown-item-button v-for="myFunction in membershipFunction[0].functions"
                                    @click="changeCoefficients(myFunction.label)" :key="myFunction.label">
              {{myFunction.label}}
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>

        <b-col md="3">
          <b-button variant="primary" class="fuzzificationButton" @click="changeAttribute">Change attribute
          </b-button>
        </b-col>

        <b-col md="3" v-if="showChangeCoefficients">
          <b-button variant="primary" class="fuzzificationButton" @click="showSlider = !showSlider">Change x axis
          </b-button>
        </b-col>

        <b-col md="3" v-if="showChangeCoefficients">
          <b-button variant="primary" class="fuzzificationButton" @click=addFunction()>Add function</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import FuzzificationLineChart from "../components/Fuzzification/FuzzificationLineChart";
  import {Chrome} from 'vue-color';

  export default {
    name: "FuzzificationPage",
    components: {FuzzificationLineChart, Chrome},
    data() {
      return {
        maxXValue: 0,
        minXValue: 1000000000,
        data: {
          datasets: []
        },
        options: {
          bezierCurve: false,
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            mode: 'nearest',
            intersect: true,
            animationDuration: 800
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            line: {
              //cubicInterpolationMode: 'default',
              tension: 0, // disables bezier curves
            },
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
                max: 1
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
        reupdateSlider: false,
        isAddingFunction: false,
        color: {
          hex: '#cc2417',
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
        showChangeCoefficients: false,
        showColorButton: false,
        showGraph: false,
        indexLabel: 0,
        colorPallet: [],
        columns: []
      }
    },
    methods: {
      randomColorGenerator: function () { /*return ('#' + Math.random().toString(16).slice(2, 8));*/
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      start() {
        if (this.checkSimilarFunctions()) {
          this.$swal({
            type: 'warning',
            allowOutsideClick: false,
            title: 'Function with name ' + '"' + this.labelFunction + '"' + ' already exist.'
          }).then((result) => {
            if (result.value) {
              this.labelFunction = '';
            }
          });
          return;
        }
        this.showGraph = true;
        this.showColorButton = false;
        this.showColorPicker = false;
        this.showCoefficients = false;
        if (!this.isAddingFunction) {
          let myFunction = this.membershipFunction[0].functions[this.indexLabel];
          myFunction.coefficientA = this.coefficientA;
          myFunction.coefficientB = this.coefficientB;
          myFunction.coefficientC = this.coefficientC;
          myFunction.coefficientD = this.coefficientD;
          myFunction.label = this.labelFunction;
          myFunction.borderColor = this.color.hex;
        } else {
          this.createFunction();
        }
        this.assignFunction();
        this.data.datasets = this.membershipFunction[0].functions;
        this.$store.dispatch("loadMembershipFunction", this.membershipFunction);
        this.updateChart();
        this.clearInputs();
        this.showChangeCoefficients = true;
        this.isAddingFunction = false;
      },
      updateXAxis(value) {
        this.options.scales.xAxes[0].ticks.min = value[0];
        this.options.scales.xAxes[0].ticks.max = value[1];
        this.updateChart();
      },
      clearInputs() {
        this.coefficientA = '';
        this.coefficientB = '';
        this.coefficientC = '';
        this.coefficientD = '';
        this.labelFunction = '';
      },
      checkSimilarFunctions() {
        if (!this.isAddingFunction) {
          return false;
        }
        for (let i = 0; i < this.membershipFunction[0].functions.length; i++) {
          if (this.membershipFunction[0].functions[i].label === this.labelFunction) {
            return true;
          }
        }
        return false;
      },
      changeAttribute() {
        this.clearInputs();
        this.showGraph = false;
        this.showSlider = false;
        this.showColorButton = false;
        this.$store.dispatch('loadMembershipFunction', []);
        this.membershipFunction = [];
        this.firstTimeAccess = true;
        this.isAddingFunction = true;
        this.showCoefficients = false;
        this.data.datasets = [];
        this.options.scales.xAxes[0].ticks.min = 0;
        this.options.scales.xAxes[0].ticks.max = 1;
        this.showChangeCoefficients = false;
        this.slider.min = 0;
        this.slider.value[0] = 0;
        this.slider.max = 1;
        this.slider.value[1] = 1;
        this.reupdateSlider = !this.reupdateSlider;
        this.updateChart();

      },
      addFunction() {
        this.clearInputs();
        this.showCoefficients = !this.showCoefficients;
        this.isAddingFunction = !this.isAddingFunction;
      },
      changeCoefficients(functionLabel) {
        this.showCoefficients = true;
        let myFunction = '';
        let myIndex = -1;
        for (let i = 0; i < this.membershipFunction[0].functions.length; i++) {
          myFunction = this.membershipFunction[0].functions[i];
          myIndex = i;
          if (myFunction.label === functionLabel) {
            break;
          }
        }
        this.coefficientA = myFunction.coefficientA;
        this.coefficientB = myFunction.coefficientB;
        this.coefficientC = myFunction.coefficientC;
        this.coefficientD = myFunction.coefficientD;
        this.labelFunction = myFunction.label;
        this.indexLabel = myIndex;
        this.showColorButton = true;
        this.data.datasets = this.membershipFunction[0].functions;
        this.$store.dispatch("loadMembershipFunction", this.membershipFunction);
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
          if (xValue < this.minXValue) {
            this.minXValue = xValue;
          }
        }
        this.showCoefficients = true;
        this.slider.min = this.minXValue;
        this.slider.value[0] = this.minXValue;
        this.slider.max = this.maxXValue;
        this.slider.value[1] = this.maxXValue;
        this.options.scales.xAxes[0].ticks.max = this.maxXValue;
        this.options.scales.xAxes[0].ticks.min = this.minXValue;
        this.reupdateSlider = !this.reupdateSlider;
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
        this.colorPallet = [];
        let newMembershipFunction = {
          title: this.attribute,
          minX: this.minXValue,
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
        let randomColor = '';
        do {
          randomColor = this.randomColorGenerator();
        } while (this.colorPallet.includes(randomColor) === true);
        this.colorPallet.push(randomColor);
        let newFunction = {
          label: this.labelFunction,
          borderColor: randomColor,
          borderWidth: 2,
          coefficientA: this.coefficientA,
          coefficientB: this.coefficientB,
          coefficientC: this.coefficientC,
          coefficientD: this.coefficientD,
          data: [],
          fill: false,
          lineTension: 0
        };
        this.membershipFunction[0].functions.push(newFunction);
      },
      assignFunction() {
        let myFunction = [];
        for (let j = 0; j < this.membershipFunction[0].functions.length; j++) {
          if (this.membershipFunction[0].functions[j].label === this.labelFunction) {
            myFunction = this.membershipFunction[0].functions[j];
            break;
          }
        }
        if (myFunction.data.length > 0) {
          myFunction.data = [];
        }
        for (let i = 0; i < this.membershipFunction[0].sortedXValues.length; i++) {
          let xValue = this.membershipFunction[0].sortedXValues[i];
          let mu = 0;
          if (this.coefficientD === '') {
            mu = this.triangularCalculation(xValue);
          } else {
            mu = this.trapezoidCalculation(xValue);
          }
          mu = Number(Math.round(mu + 'e2') + 'e-2'); //zaokruhlenie na 2 desatinne miesta
          myFunction.data.push({
            x: xValue,
            y: mu
          });
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
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Fuzzification');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
          title: 'Please, try again.'
        }).then((result) => {
          if (result.value) {
            this.$router.push("dataInput");
          }
        })
      }
      let membershipFunction = this.$store.getters.getMembershipFunction;
      this.firstTimeAccess = membershipFunction.length === 0;

      let columns = this.$store.getters.getColumns;
      let file = this.$store.getters.getRows;
      let row = file[0];
      let objectRow = Object.entries(row);
      this.columns = [];
      for (let i = 0; i < objectRow.length; i++) {
        if (typeof objectRow[i][1] === 'number') {
          this.columns.push(columns[i]);
        }
      }

      if (!this.firstTimeAccess) {
        this.data.datasets = membershipFunction[0].functions;
        this.setLineChart(membershipFunction[0].title);
        if (membershipFunction[0].functions.length > 0) {
          this.showChangeCoefficients = true;
          this.showCoefficients = false;
          this.showGraph = true;
        } else {
          this.showCoefficients = true;
          this.showGraph = false;
          this.isAddingFunction = true;
        }
      } else {
        this.isAddingFunction = true;
      }
    }
  }
</script>

<style scoped>
  .fuzzificationContainer {
    margin-top: 50px;
  }

  .coefficientContainer {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 15px;
    margin: 5px 10px 5px 10px;
  }

  .fuzzificationQuestion {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 14% 5px 5px 5px;
  }

  .fuzzification-chart {
    padding: 20px 20px 20px 20px;
    margin: 5px;
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
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .fuzzificationButton {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  label {
    margin: 0;
  }

  h6 {
    margin: 5px 0 0 0;
    line-height: 1.5;
  }

  @media screen and (max-width: 768px) {
    .fuzzificationContainer {
      margin-top: 15px;
    }

    .fuzzificationButtons {
      margin-top: 10px;
    }

    .fuzzificationQuestion {
      margin: 20% 5px 5px 5px;
    }

    .fuzzification-chart {
      padding-bottom: 15px;
    }
  }

  @media screen and (max-width: 480px) {

    .fuzzificationQuestion {
      margin: 30% 5px 5px 5px;

    }
  }
</style>
