<template>
  <b-row align-v="center" align-h="center">
    <b-col md="10">
      <vue-good-table
        :columns="this.$store.getters.getColumns"
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
      <b-button class="setParametersButton" variant="outline-info" @click="setParameters">Change column name</b-button>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "OriginalDataTable",
    data() {
      return {}
    },
    methods: {
      setParameters() {
        let indexOfColumn;
        let columns = this.$store.getters.getColumns;
        this.$swal({
          title: 'Choose index of a column:',
          type: 'question',
          confirmButtonText: 'Confirm',
          cancelButtonColor: '#d33',
          confirmButtonColor: '#1bd60b',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          showCloseButton: true,
          input: 'range',
          inputAttributes: {
            min: 1,
            max: columns.length,
            step: 1
          },
          inputValue: 2
        }).then((result) => {
          if (result.value) {
            indexOfColumn = result.value;
            this.$swal({
              input: 'text',
              inputValue: columns[indexOfColumn - 1].label,
              confirmButtonText: 'Confirm',
              confirmButtonColor: '#1bd60b',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
              showCancelButton: true,
              showCloseButton: true,
            }).then((result) => {
              if (result.value) {
                columns[indexOfColumn - 1].label = result.value;
              }
            })
          }
        })
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Original data - Table');
    }
  }
</script>

<style scoped>
  .setParametersButton {
    margin-top: 15px;
  }
</style>
