<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="this.$store.getters.getRows"
      styleClass="vgt-responsive"
      :lineNumbers="true"
      :search-options="{ enabled: true, placeholder: 'Search this table' }"
      :pagination-options="{ enabled: true,  position: 'bottom' }"
      :selectOptions="{
            enabled: false,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
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
        inputOptions: {},
        value: '2'
      }
    },
    methods: {
      setParameters() {
        /* this.$swal({
           html:
             '<b-form-input id="range" v-model="value" type="range" min="0" max="5"></b-form-input>' +
             '<div id="ss" class="mt-2">Value: {{ value }}</div>',
           focusConfirm: true,
           preConfirm: () => {
             return [
               document.getElementById('range').value,
               document.getElementById('ss').value
             ]
           }
         });*/
        let indexOfColumn;
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
            max: this.columns.length,
            step: 1
          },
          inputValue: 1
        }).then((result) => {
          if (result.value) {
            indexOfColumn = result.value;
            this.$swal({
              input: 'text',
              inputValue: this.columns[indexOfColumn - 1].label,
              confirmButtonText: 'Zmeniť',
              confirmButtonColor: '#1bd60b',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Zrušiť',
              showCancelButton: true,
              showCloseButton: true,
            }).then((result) => {
              if (result.value) {
                console.log(result.value);
                this.columns[indexOfColumn - 1].label = result.value;
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
</style>
