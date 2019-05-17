<template>
  <div>
    <b-form-file class="dragAndDrop"
                 accept=".arff, .csv, .txt, .json"
                 v-model="file"
                 size="lg"
                 :state="Boolean(file)"
                 browse-text='Browse'
                 v-bind:placeholder="nameOfPlaceHolder"
                 v-bind:drop-placeholder="nameOfDropPlaceHolder"
                 title=""
    ></b-form-file>
    {{file.name}}
    <h6>Files with following types can be loaded: .arff, .csv, .json, .txt, and .xls.</h6>
    <b-button v-if="file !== ''" class="loadButtons" variant="danger" @click="file = ''">Clear</b-button>
    <b-button v-if="file !== ''" variant="success" @click="loadFile(file)" class="loadButtons">Next</b-button>
  </div>
</template>

<script>
  import {loadFile} from "@/mixins/loadFile";
  import axios from 'axios';
  var glTemp = [];
 // var customData = require(this.file.name);


  export default {
    name: "LoadFromFile",
    mixins: [loadFile],
    data() {
      return {
        successfullyLoad: false,
        file: '',
        dragAndDropCapable: false,
        nameOfPlaceHolder: 'Drag file here..',
        nameOfDropPlaceHolder: 'Drop file..'
      }
    },
    mounted() {
      this.emitToParent();
    },
    watch: {
      file: function () {
        this.emitToParent();
      }
    },
    methods: {
      readCSV() {
        return d3.csv(this.file, function (data) {
          // console.log(data);
          glTemp = data;
          //return  data;//Object.assign({}, glTemp);;
        })
      },
      loadData(suffix) {
        ////TODO switch podla suffix na nacitanie roznych typov suborov - dokoncit
        switch(suffix) {
          case '.arff':
            break;
          case '.csv':
            this.readCSV();
            alert("gltem " + glTemp.length);
            if(glTemp.length > 0){
              alert('gltemp ' + glTemp.length );
              console.log(glTemp);
              this.$store.dispatch("loadRows", glTemp);
              this.loadHeaders();
            }
            break;
          case '.json':
            this.emitToParent();
            let store = this.$store;
            let me = this;
            console.log(this.file);
            d3.json(this.file, function (rows) {
              console.log(rows);
              store.dispatch("loadRows", rows);
              me.loadHeaders();
            });

            /*console.log(this.file);
            axios.get(this.file).then(response => {
              let rows = response.data;
              console.log(response.data);

              this.$store.dispatch("loadRows", rows);
              this.loadHeaders();
            }).catch(error => console.log(error.response));*/
            break;
          case '.txt':

            break;
          case '.xls':

            break;
          default:

        }
      },
      emitToParent() {
        this.$emit('childToParent', this.file);
      },
      loadHeaders() {
        let rows = this.$store.getters.getRows;
        let columns = [];
        let oneRowOfAllData = Object.entries(rows[0]);
        for (let i = 0; i < oneRowOfAllData.length; i++) { //we create as many columns as we have items in oneRowOfAllData
          let column = {
            id: i,
            label: oneRowOfAllData[i][0],
            field: oneRowOfAllData[i][0],
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          };
          columns.push(column);
        }
        this.$store.dispatch("loadColumns", columns);
      },
    }
  }
</script>

<style scoped>
  h6 {
    cursor: context-menu;
    margin: 10px 0 0 0;
  }

  .dragAndDrop {
    margin: 0;
    width: 100%;
    text-align: left;
  }

  .loadButtons {
    margin: 15px 0 15px 0;
  }
</style>
