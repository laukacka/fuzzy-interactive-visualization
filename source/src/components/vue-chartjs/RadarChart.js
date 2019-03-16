import { Radar } from 'vue-chartjs'

export default {
  name: "RadarChart",
  extends: Radar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options);
    console.log("RadarChart was loaded");
  }
}
