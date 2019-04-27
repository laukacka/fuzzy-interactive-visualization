<template>
  <b-row>
    <b-col md="4" class="radviz-checkbox">
      <b-form-group label="Choose the attributes:">
        <b-form-checkbox style="text-align: left"
                         v-for="column in this.$store.getters.getColumns"
                         v-model="selected"
                         :key="column.label"
                         :value="column.label"
                         stacked
        >
          {{ column.label }}
        </b-form-checkbox>
      </b-form-group>
      {{selected}}
    </b-col>
    <b-col offset-md="1" md="7" id="radviz" class="radviz-graph">

    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "FuzzyClusteringRadviz",
    data() {
      return {
        columns: [],
        selected: [],
      }
    },
    watch: {
      selected: function () {
        this.updateTable();
      }
    },
    methods: {
      updateTable() {
        let localColumns = [];
        for (let i = 0; i < this.$store.getters.getColumns.length; i++) {
          for (let j = 0; j < this.selected.length; j++) {
            if (this.$store.getters.getColumns[i].label === this.selected[j]) {
              localColumns.push(this.$store.getters.getColumns[i]);
            }
          }
        }
        this.columns = localColumns;
        this.updateTableKey = !this.updateTableKey;
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Radviz');
      this.columns = this.$store.getters.getColumns;
      for (let i = 0; i < this.columns.length; i++) {
        this.selected.push(this.columns[i].label);
      }
    }
  }
</script>

<style scoped>
  .radviz-checkbox, .radviz-graph {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }
</style>
