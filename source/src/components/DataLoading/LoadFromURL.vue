<template>
  <div>
    <b-input-group prepend="http://" class="mt-3 loadURL">
      <b-form-input :state="Boolean(file)" v-model="file"/>
      <b-input-group-append >
      </b-input-group-append>
    </b-input-group>
    <h6>Vlož web adresu (URL). Načítané môžu byť len dáta typu arff, csv, json, txt a xls.</h6>
    <!--TODO rovnake tlacitko na vymazanie suboru -> do Base -> BaseButton-->
    <b-button class="loadButtons" variant="danger" @click="file = ''">Vymazať súbor</b-button>
    <b-button v-if="file !== ''" @click="loadFile(file)" class="loadButtons" variant="success">Ďalej</b-button>
  </div>
</template>

<script>
  import axios from 'axios';
  import {loadFile} from "@/mixins/loadFile";

  export default {
    name: "LoadFromURL",
    mixins: [loadFile],
    data() {
      return {
        file: '',
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
        //TODO switch podla suffix na nacitanie roznych typov suborov - dokoncit
        switch (suffix) {
          case '.arff':
            break;
          case '.csv':

            break;
          case '.json': //https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json
            axios.get(this.file).then(response => {
              let rows = response.data;
              this.$store.dispatch("loadRows", rows);
              //localStorage.rows = rows;
              //console.log(this.$store.getters.getRows);
              this.loadHeaders();
            }).catch(error => console.log(error.response)); //if we have same errors, we can see them in console
            break;
          case '.txt':

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
            label: oneRowOfAllData[i][0],
            field: oneRowOfAllData[i][0],
            tdClass: 'text-center text-nowrap',
            thClass: 'text-center text-nowrap'
          };
          columns.push(column);
        }
        this.$store.dispatch("loadColumns", columns);
        //localStorage.columns = columns;
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
