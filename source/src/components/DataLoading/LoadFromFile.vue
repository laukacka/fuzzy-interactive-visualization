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
    <h6>Files with following types can be loaded: .arff, .csv, .json, .txt, and .xls.</h6>
      <b-button v-if="file !== ''" class="loadButtons" variant="danger" @click="file = ''">Clear</b-button>
      <b-button v-if="file !== ''" variant="success" @click="loadFile(file)" class="loadButtons">Next</b-button>
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
