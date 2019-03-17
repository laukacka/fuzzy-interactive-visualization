<template>


  <b-container>
    <b-row   v-for="col in columns" id="vvvvvvv">
      <b-col  offset-md="1" md="3">
        columnu {{col.id}}
      </b-col>
      <b-col md="6">
        <b-form-input  v-model="col.label" type="text" placeholder="m,dasnmnsda.," />
      </b-col>
    </b-row>
    <b-row id="tablee">
      <b-col md="10" offset-md="1">

         <b-button @click="fdadd()">urob nieco zaujimave</b-button>

{{collllll}}
        <vue-good-table
          :columns="columns"
          :rows="rows"
          theme="black-rhino"
          styleClass="vgt-responsive"
          :lineNumbers="true"
          :search-options="{ enabled: true, placeholder: 'Search this table' }"
          :pagination-options="{ enabled: true,  position: 'bottom' }"
          :selectOptions="{
            enabled: true,
            selectOnCheckboxOnly: false,
            selectionInfoClass: 'alert alert-info m-b-0 no-rounded-corner',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
			  }"
        >
        </vue-good-table>
        <router-link to="/">
          <b-button variant="danger" style="margin-top:10px">Back</b-button>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {

      return {
        collllll: [],
        columns: [],
        rows: [],
        fdadd() {
        //alert("updates");
         this.collllll.push("stazuj sa "+ this.collllll.length);
        }
      }
    },
    created() {
    //  alert("created");
      axios.get('https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json')
        .then(response => {
          this.rows = response.data;
          var jankinapomocnaarray = Object.entries(this.rows[0]);
          for(let i = 0; i < jankinapomocnaarray.length; i++){
            var pomocnyObjekt = {
              id: i,
              label: jankinapomocnaarray[i][0],
              field: jankinapomocnaarray[i][0],
              tdClass: 'text-center text-nowrap',
              thClass: 'text-center text-nowrap'
            };
            this.columns.push(pomocnyObjekt);
          }
        })
        .catch(error => console.log(error))


    },
    mounted() {
      //  alert("mounted");

    },
    beforeMount() {
     // alert("before mounted");
    }  ,
  beforeCreate() {
   // alert("before created");
  },
    updated() {

    }
  }
</script>

<style scoped>

</style>
