<template>
  <div>
    <b-textarea rows="10" v-model="file"></b-textarea>
    <br>
    <file-reader @load="file = $event"></file-reader>
    <!--{{file}}-->

  </div>
</template>

<script>
  import FileReader from "./FileReader";

  export default {
    components: {
      FileReader
    },
    data() {
      return {
        file: " "
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
      loadRows(suffix) {
        let counter = 1;
        let rows = [];
        let pom;
        let end = false;
        let row;
        let newRow;

        switch (suffix) {
          case '.arff':
            console.log(this.file.split('@DATA')[1].split('\n')[counter].split(','));
            do {
              row = this.file.split('@DATA')[1].split('\n')[counter].split(',');
              for (let i = 0; i < row.length; i++) {
                if (isNaN(row[i]) === false) {
                  newRow = Number(row[i]);
                  row[i] = newRow;
                }
              }
              rows[counter - 1] = Object.assign({}, row);
              console.log(Object.assign({}, row));
              counter++;

              if (this.file.split('@DATA')[1].split('\n')[counter] === undefined) {
                end = true;
              } else {
                pom = this.file.split('@DATA')[1].split('\n')[counter].split(',')[0];
                if (pom === "%" || pom === "") {
                  end = true;
                }
              }
            } while (end === false);
            console.log(rows);
            this.$store.dispatch("loadRows", rows);
            this.loadHeaders(suffix);
            break;

          case '.csv':
            do {
              row = this.file.split('\n')[counter].split(',');
              for (let i = 0; i < row.length; i++) {
                if (isNaN(row[i]) === false) {
                  newRow = Number(row[i]);
                  row[i] = newRow;
                }
              }
              rows[counter - 1] = Object.assign({}, row);
              counter++;
              if (this.file.split('\n')[counter] === undefined) {
                end = true;
              } else {
                pom = this.file.split('\n')[counter].split(',')[0];
                if (pom === "%" || pom === "") {
                  end = true;
                }
              }
            } while (end === false);
            console.log(rows);
            this.loadHeaders(suffix);
            break;

          case '.json':
            counter = 0;
            do {
              let pomRow = [];
              row = Object.entries(JSON.parse(this.file)[counter]);
              for (let i = 0; i < row.length; i++) {
                if (isNaN(row[i][1]) === false) {
                  newRow = Number(row[i][1]);
                  row[i][1] = newRow;
                }
                pomRow[i] = row[i][1];
              }
              console.log(pomRow);
              rows[counter] = Object.assign({}, pomRow);
              counter++;
              console.log(Object.entries(JSON.parse(this.file)[counter]));
              if (Object.entries(JSON.parse(this.file)[counter]) === undefined) {
                end = true;
              } /*else {
                pom = this.file.split('\n')[counter].split(' ')[0];
                if (pom === "%" || pom === "") {
                  end = true;
                }
              }*/
            } while (end === false);
            console.log(rows);
            this.$store.dispatch("loadRows", rows);
            //this.loadHeaders(suffix);
            break;

          case '.txt':
            do {
              row = this.file.split('\n')[counter].split(' ');
              for (let i = 0; i < row.length; i++) {
                if (isNaN(row[i]) === false) {
                  newRow = Number(row[i]);
                  row[i] = newRow;
                }
              }
              rows[counter - 1] = Object.assign({}, row);
              counter++;

              if (this.file.split('\n')[counter] === undefined) {
                end = true;
              } else {
                pom = this.file.split('\n')[counter].split(' ')[0];
                if (pom === "%" || pom === "") {
                  end = true;
                }
              }
            } while (end === false);
            console.log(rows);
            this.$store.dispatch("loadRows", rows);
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
            let counter = 1;
            for (let i = 0; i < oneRowOfAllData.length; i++) {
              let column = {
                id: i,
                label: this.file.split('@ATTRIBUTE')[counter].split(' ')[1],
                field: this.file.split('@ATTRIBUTE')[counter].split(' ')[1],
                tdClass: 'text-center text-nowrap',
                thClass: 'text-center text-nowrap'
              };
              columns.push(column);
              counter++;
            }
            this.$store.dispatch("loadColumns", columns);
            //console.log(columns);
            break;

          case '.csv':
            for (let i = 0; i < oneRowOfAllData.length; i++) {
              let column = {
                id: i,
                label: this.file.split('\n')[0].split(',')[i],
                field: this.file.split('\n')[0].split(',')[i],
                tdClass: 'text-center text-nowrap',
                thClass: 'text-center text-nowrap'
              };
              columns.push(column);
            }
            this.$store.dispatch("loadColumns", columns);
            //console.log(columns);
            break;

          case '.json':
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
          case '.txt':
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
