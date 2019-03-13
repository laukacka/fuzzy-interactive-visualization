import {Pie} from 'vue-chartjs'

export default {
  name: "JankinKolac",
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
    console.log("nacital sa mi ....");
  }
}
