import { Scatter } from 'vue-chartjs'

export default {
  name: "Scatter",
  extends: Scatter,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options);
    console.log("Scatter was loaded");
  }
}
