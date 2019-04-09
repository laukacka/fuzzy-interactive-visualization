<template>
  <div>
    <vue-good-table class="statisticsTable"
      :columns="columns"
      :rows="this.$store.getters.getRows"
      styleClass="vgt-responsive"
      :lineNumbers="true"
      :search-options="{ enabled: true, placeholder: 'Vyhľadaj v tabulke' }"
      :pagination-options="{ enabled: true,  position: 'bottom' }"
      :selectOptions="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: '',
            clearSelectionText: 'vyčisti označené',
			  }">
    </vue-good-table>
    <b-button class="setParametersButton" variant="outline-info" @click="setParameters">Zmeň názvy stĺpcov</b-button>
  </div>
</template>

<script>
  export default {
    name: "StatisticTable",
    props: {
      columns: Array
    },
    data() {
      return {
      }
    },
    methods: {
      setParameters() {
        let indexOfColumn;
        let columns = this.$store.getters.getColumns;
        this.$swal({
          title: 'Ktorý stĺpec si prajete zmeniť?',
          type: 'question',
          confirmButtonText: 'Vybrať',
          cancelButtonColor: '#d33',
          confirmButtonColor: '#1bd60b',
          cancelButtonText: 'Zrušiť',
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
              confirmButtonText: 'Zmeniť',
              confirmButtonColor: '#1bd60b',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Zrušiť',
              showCancelButton: true,
              showCloseButton: true,
            }).then((result) => {
              if (result.value) {
                console.log(result.value);
                columns[indexOfColumn - 1].label = result.value;
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .setParametersButton {
    margin-top: 15px;
  }

  .statisticsTable {
    margin-top: 100px;
  }
</style>
