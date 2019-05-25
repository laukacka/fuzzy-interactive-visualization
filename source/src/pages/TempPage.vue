<template>
  <div>
    <b-textarea rows="10" v-model="file"></b-textarea>
    <br>
    <file-reader @load="file = $event"></file-reader>
  </div>
</template>

<script>
  import FileReader from "../components/DataLoading/FileReader";

  export default {
    components: {
      FileReader
    },
    data() {
      return {
        file: " ",
        allData: [],
        columns: [],
        rows: []
      }
    },
    watch: {
      file: function () {
        console.log('watch');
        //this.loadRows('.arff');
        //this.loadRows('.csv');
        //this.loadRows('.txt');
        this.loadRows('.json');
      }
    },
    methods: {
      rowToObject(row) {
        let rowAsObject = {};
        for (let i = 0; i < row.length; i++) {
          if (isNaN(row[i]) === false) {
            row[i] = Number(row[i]);
          }
          rowAsObject[this.columns[i]] = row[i];
        }
        return rowAsObject;
      },
      loadRows(suffix) {
        this.allData = this.file.split('\n');
        let firstRow = this.allData[0];
        switch (suffix) {
          case '.arff':
            let dataRows = false;
            for (let i = 0; i < this.allData.length; i++) {
              let row = this.allData[i].split(' ');
              if (row[0].toUpperCase() === '@ATTRIBUTE') {
                this.columns.push(row[1]);
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
            break;

          case '.csv':
            this.columns = firstRow.split(',');
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
            this.columns = firstRow.split(' ');
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

            break;
          default:
        }
      },
      loadHeaders(suffix) {
        let rows = this.$store.getters.getRows;
        let columns = [];
        let oneRowOfAllData = Object.entries(rows[0]);
        switch (suffix) {
          case '.arff':
            for (let i = 0; i < oneRowOfAllData.length; i++) {
              let column = {
                id: i,
                label: oneRowOfAllData[i][0],
                field: oneRowOfAllData[i][0],
                tdClass: 'text-center text-nowrap',
                thClass: 'text-center text-nowrap'
              };
              columns.push(column);
              counter++;
            }
            this.$store.dispatch("loadColumns", columns);
            break;

          case '.csv':
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
            console.log(columns);
            break;

          case '.json':
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
            break;

          case '.txt':
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
            break;

          case '.xls':
            for (let i = 0; i < oneRowOfAllData.length; i++) {
              let column = {
                id: i,
                label: this.file.split('\n')[0].split(' ')[i],
                field: this.file.split('\n')[0].split(' ')[i],
                tdClass: 'text-center text-nowrap',
                thClass: 'text-center text-nowrap'
              };
              columns.push(column);
            }
            this.$store.dispatch("loadColumns", columns);
            //console.log(columns);
            break;

          default:
        }
      },
    }
  };
</script>
