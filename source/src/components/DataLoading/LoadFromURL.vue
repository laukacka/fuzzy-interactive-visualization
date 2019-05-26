<template>
  <div>
    <b-input-group prepend="http://" class="mt-3 loadURL">
      <b-form-input :state="Boolean(file)" v-model="file"/>
      <b-input-group-append>
      </b-input-group-append>
    </b-input-group>
    <h6>Insert web address (URL). Files with following types can be loaded: .arff, .csv, .json, .txt, and .xls.</h6>
    <b-button v-if="file !== ''" class="loadButtons" variant="danger" @click="file = ''">Clear</b-button>
    <b-button v-if="file !== ''" @click="loadFile(file)" class="loadButtons" variant="success">Next</b-button>
  </div>
</template>

<script>
  import axios from 'axios';
  import {loadFile} from "@/mixins/loadFile";

  let dataset = [];

  function rowsOfCSV(dataset) {
    //console.log(dataset);
    //this.$store.dispatch("loadRows", dataset);
    //this.loadHeaders();
    return dataset;
  }

  export default {
    name: "LoadFromURL",
    mixins: [loadFile],
    data() {
      return {
        file: '',
        rows: [],
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
      loadData(suffix) {
        switch (suffix) {
          case '.arff':
            break;
          case '.csv':
            d3.csv(this.file, function (error, data) {
              if (error) {
                console.log(error);
              } else {
                dataset = data;
                let goodData = rowsOfCSV(dataset);
                this.$store.dispatch("loadRows", goodData);
                this.loadHeaders();
              }
            });

            break;
          case '.json': //https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json
            axios.get(this.file).then(response => {
              let rows = response.data;
              this.$store.dispatch("loadRows", rows);
              this.loadHeaders();
            }).catch(error => console.log(error.response)); //if we have same errors, we can see them in console
            break;
          case '.txt':
            d3.text(this.file, function (error, data) {
                let rows = d3.csv.parse(data);
                this.$store.dispatch("loadRows", rows);
              }
            );
            break;
          case '.xls': //www.saedsayad.com/datasets/Iris.xls

            break;
          default:
        }
      },
      loadHeaders() {
        let rows = this.$store.getters.getRows;
        let columns = [];
        let oneRowOfAllData = Object.entries(rows[0]);

        for (let i = 0; i < oneRowOfAllData.length; i++) { //we create as many columns as we have items in oneRowOfAllData
          let column = {
            id: i,
            label: " " + oneRowOfAllData[i][0],
            field: oneRowOfAllData[i][0],
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          };
          columns.push(column);
        }
        this.$store.dispatch("loadColumns", columns);
      },
      emitToParent() {
        this.$emit('childToParent', this.file);
      }
    }
  }
</script>

<style scoped>
  h6 {
    cursor: context-menu;
    margin-top: 10px;
  }

  .loadURL {
    width: 100%;
  }

  .loadButtons {
    margin: 10px 0 10px 0;
  }
</style>
