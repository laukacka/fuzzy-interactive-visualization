<template>
  <div>
    <b-row align-v="center" align-h="center">
      <b-col md="4">
        <b-form-group label="Choose the attributes:">
          <b-form-checkbox
            v-for="column in this.$store.getters.getColumns"
            v-model="selected"
            :key="column.label"
            :value="column.label"
            name="flavour-3a"

          >
            {{ column.label }}
          </b-form-checkbox>
        </b-form-group>
        {{selected}}
      </b-col>

      <b-col offset-md="1" md="7">
        <vue-good-table :key="updateTableKey"
          :columns="columns"
          :rows="this.$store.getters.getRows"
          styleClass="vgt-responsive"
          :lineNumbers="true"
          :search-options="{ enabled: true, placeholder: 'Find..' }"
          :pagination-options="{ enabled: true,  position: 'bottom' }"
          :selectOptions="{
            enabled: true,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: '',
            clearSelectionText: 'Clear selected..',
			  }">
        </vue-good-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "FuzzyClusteringTable",
    data() {
      return {
        columns: this.$store.getters.getColumns,
        selected: [],
        updateTableKey: false,

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
            if (this.$store.getters.getColumns[i].field === this.selected[j]) {
              localColumns.push(this.$store.getters.getColumns[i]);
            }
          }
        }
        this.columns = localColumns;
        this.updateTableKey = !this.updateTableKey;
      }
    },
    mounted() {
      this.columns = this.$store.getters.getColumns;
    }
  }
</script>

<style scoped>

</style>
