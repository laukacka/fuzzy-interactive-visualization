<template>
  <div>
    <b-input-group prepend="http://" class="mt-3 loadURL">
      <b-form-input v-model="file"/>
      <b-input-group-append>
        <b-button @click="loadFile(file)" variant="success">Načítaj dáta</b-button>
      </b-input-group-append>
    </b-input-group>
    <h6>Vlož web adresu (URL). Načítané môžu byť len dáta typu arff, csv, json, txt a xls.</h6>
    <!--TODO rovnake tlacitko na vymazanie suboru -> do Base -> BaseButton-->
    <b-button class="loadButton" variant="danger" @click="file = null">Vymaž súbor</b-button>
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
              this.$store.dispatch("loadData", response.data);
              console.log(this.$store.getters.getData);
            }).catch(error => console.log(error.response)); //if we have same errors, we can see them in console
            break;
          case '.txt':

            break;
          case '.xls': //www.saedsayad.com/datasets/Iris.xls

            break;
          default:

        }

      }
    }
  }
</script>

<style scoped>
  h6 {
    margin-top: 10px;
  }

  .loadURL {
    width: 100%;
  }

  .loadButton {
    margin: 10px 0 0 0;
  }
</style>
