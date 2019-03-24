import { Scatter, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default {
  name: "Scatter",
  extends: Scatter,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options);
    console.log("Scatter was loaded");
  }
}
