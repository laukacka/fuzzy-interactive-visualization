<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-11">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          :responsive="true"
          theme="black-rhino"
          :lineNumbers="true"
          :search-options="{ enabled: false, placeholder: 'Search this table' }"
          :pagination-options="{ enabled: false,  position: 'bottom' }"
          :selectOptions="{
				enabled: true,
				selectOnCheckboxOnly: false,
				selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
				selectionText: 'rows selected',
				clearSelectionText: 'clear',
			}"

        >
        </vue-good-table>

        {{rows[30].sepalWidth}}
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    data() {
      return {
          columns: [{
            label: 'sepalLength',
            field: 'sepalLength',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }, {
            label: 'sepalWidth',
            field: 'sepalWidth',
            thClass: 'text-nowrap',
            tdClass: 'text-nowrap'
          }, {
            label: 'petalLength',
            field: 'petalLength',
            thClass: 'text-nowrap',
            tdClass: 'text-nowrap'
          }, {
            label: 'petalWidth',
            field: 'petalWidth',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }, {
            label: 'species',
            field: 'species',
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          }],
          rows: [],
        }
      } ,
        created()
      {
        axios
          .get('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
          .then(response => (
            this.rows = response.data
          ))
      }
    }
</script>

<style scoped>

</style>
