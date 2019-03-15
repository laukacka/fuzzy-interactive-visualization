import { PolarArea } from 'vue-chartjs'

export default {
  name: "PolarAreaChart",
  extends: PolarArea,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
