<template>
  <div>
    <b-form-file class="dragAndDrop"
                 accept=".arff, .csv, .txt, .json"
                 v-model="file"
                 size="lg"
                 :state="Boolean(file)"
                 browse-text='Prehľadávať'
                 v-bind:placeholder="nameOfPlaceHolder"
                 v-bind:drop-placeholder="nameOfDropPlaceHolder"
    ></b-form-file>
    <h6>Načítané môžu byť len súbory typu .arff, .csv, .json, .txt a .xls.</h6>
    <b-button class="loadButton" variant="danger" @click="file = null">Vymaž súbor</b-button>
    <b-button variant="success" @click="loadFile(file)" class="loadButton">Načítaj dáta</b-button>
  </div>
</template>

<script>
  import {loadFile} from "@/mixins/loadFile";

  export default {
    name: "LoadFromFile",
    mixins: [loadFile],
    data() {
      return {
        successfullyLoad: false,
        file: null,
        dragAndDropCapable: false,
        nameOfPlaceHolder: 'Potiahni súbor sem...',
        nameOfDropPlaceHolder: 'Pusti súbor...'
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
        ////TODO switch podla suffix na nacitanie roznych typov suborov - dokoncit
        switch(suffix) {
          case '.arff':
            break;
          case '.csv':

            break;
          case '.json':

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
      }
    }
  }
</script>

<style scoped>
  h6 {
    margin: 10px 0 0 0;
  }

  .dragAndDrop {
    margin: 0;
    width: 100%;
    text-align: left;
  }

  .loadButton {
    margin: 10px 0 0 0;
  }
</style>
