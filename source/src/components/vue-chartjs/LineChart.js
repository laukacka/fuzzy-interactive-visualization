import { Line } from 'vue-chartjs'

export default {
  name: "LineChart",
  extends: Line,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options);
    console.log("LineChart was loaded");
  }
}
