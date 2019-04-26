<template>
  <div>
    <b-container>
      <b-row v-if="!showHistogram" class="histogram-text">
        <b-col>
          <h5>Choose an attribute for histogram:</h5>
        </b-col>
      </b-row>
      <b-row v-if="!showHistogram">
        <b-col>
          <b-dropdown variant="outline-info" text="Attributes" dropdown>
            <b-dropdown-item-button v-for="column in this.$store.getters.getColumns"
                                    @click="setHistogram(column.id)">
              {{column.label}}
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>
      </b-row>

      <b-row v-if="showHistogram">
        <b-col>
          <bar-chart :key="reupdateHistogram" :data="data" :options="options"></bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import BarChart from "@/components/vue-chartjs/BarChart";

  export default {
    name: "OriginalDataHistogram",
    components: {
      BarChart
    },
    data() {
      return {
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        },
        reupdateHistogram: false,
        attributeIndex: 0,
        showHistogram: false,
        attributeRows: null,
        dataEntries: null,
      }
    },
    methods: {
      assignAllDataEntries() {
        let allData = null;
        let rows = this.$store.getters.getRows;
        if (rows.length > 0) {
          allData = Object.entries(rows); //-> array of allData - on every index is another array,
        }
        return allData;
      },
      createDataset() {
        let dataset = {
          label: this.$store.getters.getColumns[this.attributeIndex].label,
          borderWidth: 2,
          borderColor: '#1eaeb6',
          backgroundColor: '#1eaeb6',
          data: []
        };
        this.data.datasets.push(dataset);
      },
      assignData() {
        for (let i = 0; i < this.dataEntries.length; i++) {
          let attributes = Object.entries(this.dataEntries[i][1]); //from attributes we make array for better access
          let data = attributes[this.attributeIndex][1]; //get type (name) of cluster from last attribute (index 4)
          this.data.datasets[0].data.push(data);
        }
      },
      setHistogram(columnID) {
        this.attributeIndex = columnID;
        this.dataEntries = this.assignAllDataEntries();
        this.createDataset();
        this.assignData();
        this.reupdateHistogram = !this.reupdateHistogram;
        this.showHistogram = true;
      },
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Original data - Histogram');
      this.reupdateHistogram = !this.reupdateHistogram;
    }
  }
</script>

<style scoped>
.histogram-text {
  margin-bottom: 20px;
}
</style>
