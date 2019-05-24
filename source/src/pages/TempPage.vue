<template>
  <div>
    <b-textarea rows="10" v-model="file"></b-textarea>
    <br>
    <file-reader @load="file = $event"></file-reader>
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
              console.log(row);
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
            let allRows = this.file.split('\n');
            console.log(allRows);
            var firstRow = allRows[0];
            console.log('firstRow = '+firstRow);
            var columnNames = firstRow.split(',');
            console.log('columnNames = '+columnNames);


            let firstRow = Object.entries(this.file.split('\n')[0].split(','));
            console.log(firstRow);

            let nieco = Object.entries(this.file.split('\n')[0].split(','));
            nieco[0][0] = nieco[0][1];
            console.log(new Map(nieco));
            console.log(nieco);

            console.log(Object.assign({}, nieco));

            do {
              row = this.file.split('\n')[counter].split(',');
              newRow = Object.entries(this.file.split('\n')[counter].split(','));
              for (let i = 0; i < row.length; i++) {
                if (isNaN(row[i]) === false) {
                  //newRow = Number(row[i]);
                  row[i] = Number(row[i]);
                }
                newRow[i][0] = firstRow[i][1];
                newRow[i][1] = row[i];
              }
              console.log(newRow);
              console.log(row);
              console.log(Object.assign({}, newRow));
              rows[counter - 1] = Object.assign({}, newRow[0]);
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
            this.$store.dispatch("loadRows", rows);
            this.loadHeaders(suffix);
            break;

          case '.json':
            counter = 0;
            let endCounter = (Object.entries(JSON.parse(this.file))).length;
            do {
              row = JSON.parse(this.file)[counter];
              //console.log(row);
              rows[counter] = row;
              counter++;
              if (counter === endCounter) {
                end = true;
              }
            } while (end === false);
            //console.log(rows);
            this.$store.dispatch("loadRows", rows);
            this.loadHeaders(suffix);
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
                label: oneRowOfAllData[i][0],
                field: oneRowOfAllData[i][0],
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
