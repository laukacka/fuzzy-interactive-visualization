<template>
  <div>
    <h2>Noooo Neviem</h2>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :lineNumbers="true"
      :search-options="{ enabled: false, placeholder: 'Search this table' }"
      :pagination-options="{ enabled: false,  position: 'bottom' }"
      :selectOptions="{
				enabled: true,
				selectOnCheckboxOnly: false,
				selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
				selectionText: 'text ked nioeco vyselektujem',
				clearSelectionText: 'clear',
			}"
    >
    </vue-good-table>
  </div>
</template>

<script>
    export default {
        name: "Demo",
      data(){
        return {
          columns: [{
            label: 'id',
            field: 'id',
            width: '30px',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }, {
            label: 'Atribut 1',
            field: 'atribut1',
            width: '15%',
            thClass: 'text-nowrap',
            tdClass: 'text-nowrap'
          }, {
            label: 'atribut  2',
            field: 'atribut2',
            thClass: 'text-nowrap',
            tdClass: 'text-nowrap'
          }, {
            label: 'atribut 3',
            field: 'atribut3',
            width: '10%',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }, {
            label: 'atribut 4',
            field: 'atribut4',
            width: '10%',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }, {
            label: 'Trieda',
            field: 'trieda',
            width: '10%',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }],
          rows: [
            { id:1, atribut1: '0.1', atribut2:'John', atribut3: 'Frontend Developer', atribut4: 20, trieda: 0.036 },
            { id:2, atribut1: '0.2', atribut2:'Jane', atribut3: 'Frontend Developer', atribut4: 24,  trieda: 0.038 },
            { id:3, atribut1: '0.3', atribut2:'Susan', atribut3: 'Android Developer', atribut4: 16,  trieda: 0.031 },
            { id:4, atribut1: '0.4', atribut2:'Chris', atribut3: 'iOS Developer', atribut4: 55,  trieda: 0.033 },
            { id:5, atribut1: '0.5', atribut2:'Dan', atribut3: 'Team Leader', atribut4: 40,  trieda: 0.037 },
            { id:6, atribut1: '0.6', atribut2:'Mollie', atribut3: 'Backend Developer', atribut4: 20,  trieda: 0.032 },
            { id:7, atribut1: '0.7', atribut2:'Bert', atribut3: 'Backend Developer', atribut4: 23,  trieda: 0.029 },
            { id:8, atribut1: '0.8', atribut2:'Jorja', atribut3: 'Android Developer', atribut4: 34,  trieda: 0.028 },
            { id:9, atribut1: '0.9', atribut2:'Shannon', atribut3: 'Android Developer', atribut4: 42,  trieda: 0.028 },
            { id:10, atribut1: '0.10', atribut2:'Emilia', atribut3: 'iOS Developer', atribut4: 33,  trieda: 0.033 },
            { id:11, atribut1: '0.11', atribut2:'Kierran', atribut3: 'Java Developer', atribut4: 22,  trieda: 0.034 },
            { id:12, atribut1: '0.12', atribut2:'Anum', atribut3: 'Java Developer', atribut4: 20,  trieda: 0.029 },
            { id:13, atribut1: '0.13', atribut2:'Georgia', atribut3: 'Java Developer', atribut4: 20,  trieda: 0.029 },
            { id:14, atribut1: '0.14', atribut2:'Nazifa', atribut3: 'Java Developer', atribut4: 34,  trieda: 0.029 },
            { id:15, atribut1: '0.1', atribut2:'Huzaifa', atribut3: 'Java Developer', atribut4: 43,  trieda: 0.029 },          ],
        };
      }
    }
</script>

<style scoped>

</style>
