<template>
  <div>
    <file-reader @load="file = $event" v-on:childToParent="onChildAction"></file-reader>
    <h6>Files with following types can be loaded: .arff, .csv, .json and .txt.</h6>
    <b-button v-if="file !== ''" class="loadButtons" variant="danger" @click="file = ''">Clear</b-button>
    <b-button v-if="file !== ''" variant="success" @click="loadFile(fileName)" class="loadButtons">Next</b-button>
  </div>
</template>

<script>
  import {loadFile} from '@/mixins/loadFile';
  import FileReader from "./FileReader";

  export default {
    name: "LoadFromFile",
    components: {
      FileReader
    },
    mixins: [loadFile],
    data() {
      return {
        file: '',
        fileName: '',
        allData: [],
        columnsNames: [],
        rows: []
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
      onChildAction(value) {
        this.fileName = value;
      },
      rowToObject(row) {
        let rowAsObject = {};
        for (let i = 0; i < row.length; i++) {
          if (isNaN(row[i]) === false) {
            row[i] = Number(row[i]);
          }
          rowAsObject[this.columnsNames[i]] = row[i];
        }
        return rowAsObject;
      },
      loadData(suffix) {
        this.allData = this.file.split('\n');
        let firstRow = this.allData[0];
        switch (suffix) {
          case '.arff':
            let dataRows = false;
            for (let i = 0; i < this.allData.length; i++) {
              let row = this.allData[i].split(' ');
              if (row[0].toUpperCase() === '@ATTRIBUTE') {
                this.columnsNames.push(row[1]);
              }
            }
            for (let i = 0; i < this.allData.length; i++) {
              let row = this.allData[i].split(' ');
              if (row[0].toUpperCase() === '@DATA') {
                dataRows = true;
                continue;
              }
              if (dataRows) {
                if (row[0] !== "" && row[0] !== '%') {
                  let rowForObject = this.allData[i].split(',');
                  let rowAsObject = this.rowToObject(rowForObject);
                  this.rows.push(rowAsObject);
                } else {
                  break;
                }
              }
            }
            this.$store.dispatch("loadRows", this.rows);
            this.loadHeaders(suffix);
            break;

          case '.csv':
            this.columnsNames = firstRow.split(',');
            for (let i = 1; i < this.allData.length; i++) {
              let row = this.allData[i].split(',');
              if (row[0] === "") {
                break;
              }
              let rowAsObject = this.rowToObject(row);
              this.rows.push(rowAsObject);
            }
            this.$store.dispatch("loadRows", this.rows);
            this.loadHeaders(suffix);
            break;

          case '.json':
            let counter = 0;
            let end = false;
            let endCounter = (Object.entries(JSON.parse(this.file))).length;
            do {
              this.rows.push(JSON.parse(this.file)[counter]);
              counter++;
              if (counter === endCounter) {
                end = true;
              }
            } while (end === false);
            this.$store.dispatch("loadRows", this.rows);
            this.loadHeaders(suffix);
            break;

          case '.txt':
            this.columnsNames = firstRow.split(' ');
            for (let i = 1; i < this.allData.length; i++) {
              let row = this.allData[i].split(' ');
              if (row[0] === "") {
                break;
              }
              let rowAsObject = this.rowToObject(row);
              this.rows.push(rowAsObject);
            }
            this.$store.dispatch("loadRows", this.rows);
            this.loadHeaders(suffix);
            break;

          case '.xls':
            /*IT WILL BE DONE LATER..*/
            break;
          default:
        }
      },
      emitToParent() {
        this.$emit('childToParent', this.file);
      },
      loadHeaders() {
        let columns = [];
        let oneRowOfAllData = Object.entries(this.rows[0]);
        for (let i = 0; i < oneRowOfAllData.length; i++) {
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
      }
    }
  }
</script>

<style scoped>
  h6 {
    cursor: context-menu;
    margin: 10px 0 0 0;
  }

  .loadButtons {
    margin: 15px 0 15px 0;
  }
</style>
