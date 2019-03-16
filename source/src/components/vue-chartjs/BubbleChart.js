import { Bubble } from 'vue-chartjs'

export default {
  name: "BubbleChart",
  extends: Bubble,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options);
    console.log("BubbleChart was loaded");
  }
}
