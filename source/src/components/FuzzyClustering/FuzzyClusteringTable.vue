<template>
  <b-row align-v="center" align-h="center">
    <b-col md="4" cols="10" class="table-checkbox">
      <b-form-group label="Choose the attributes:" >
          <b-form-checkbox style="text-align: left"
            v-for="column in this.$store.getters.getColumns"
            v-model="selected"
            :key="column.label"
            :value="column.label"
          >
            {{ column.label }}
          </b-form-checkbox>
      </b-form-group>
    </b-col>

    <b-col md="7" class="table-fuzzy">
      <vue-good-table :key="updateTableKey"
                      :columns="columns"
                      :rows="this.$store.getters.getRows"
                      styleClass="vgt-responsive"
                      :lineNumbers="true"
                      :search-options="{ enabled: true, placeholder: 'Find..' }"
                      :pagination-options="{ enabled: true,  position: 'bottom' }"
                      :selectOptions="{
            enabled: false,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: '',
            clearSelectionText: 'Clear selected..',
			  }">
      </vue-good-table>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "FuzzyClusteringTable",
    data() {
      return {
        columns: [],
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
      this.$store.dispatch('loadHeader', 'Fuzzy clustering - Table');
      this.columns = this.$store.getters.getColumns;
      for (let i = 0; i < this.columns.length; i++) {
        this.selected.push(this.columns[i].label);
      }
    }
  }
</script>

<style scoped>
  .table-checkbox {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
  }

  .table-checkbox {
    margin: 5px;
  }

  .table-fuzzy {
    padding-right: 10px;
    padding-left: 10px;
    margin: 5px 5px 5px 30px;
  }

  @media screen and (max-width: 768px) {
    .table-fuzzy {
      margin-left: 5px;
    }
  }

</style>
