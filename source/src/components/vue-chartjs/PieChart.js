import {Pie} from 'vue-chartjs'

export default {
  name: "PieChart",
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
    console.log("PieChart was loaded");
  }
}
