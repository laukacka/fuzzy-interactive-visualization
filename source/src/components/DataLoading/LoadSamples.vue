<template>
  <div>
    <b-button class="buttons" v-for="button in buttons" v-bind:variant='button.variant'
              @click="file = button.file" :key="button.name">
      {{ button.name }}
    </b-button>
    <b-row>
      <b-col>
        <b-button v-if="file !== ''" class="loadButtons" variant="danger" @click="file = ''">Clear</b-button>
        <b-button v-if="file !== ''" @click="loadFile(file)" class="loadButtons" variant="success">Next</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import {loadFile} from "@/mixins/loadFile";

  export default {
    name: "LoadSamples",
    mixins: [loadFile],
    data() {
      return {
        file: '',
        rows: [],
        buttons: [
          {
            name: 'CARS',
            variant: 'dark',
            file: 'http://fuzzy.visualization.sk/datasets/cars.json'
          },
          {
            name: 'GLASS',
            variant: 'dark',
            file: 'http://fuzzy.visualization.sk/datasets/glass.json'
          },
          {
            name: 'IRIS', //https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json
            variant: 'dark',
            file: 'http://fuzzy.visualization.sk/datasets/iris.json'
          },
          {
            name: 'WINE',
            variant: 'dark',
            file: 'http://fuzzy.visualization.sk/datasets/wine.json'
          },
        ]
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
          case '.json':
            this.emitToParent();
            axios.get(this.file).then(response => {
              this.rows = response.data;
              this.$store.dispatch("loadRows", this.rows);
              this.loadHeaders();
            }).catch(error => console.log(error.response));
            break;
          default:
        }
      },
      loadHeaders() {
        let columns = [];
        let oneRowOfAllData = Object.entries(this.rows[0]);
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
      emitToParent() {
        this.$emit('childToParent', this.file);
      }
    }
  }
</script>

<style scoped>
  .buttons {
    width: 100px;
    height: 80px;
    margin: 2px 5px 2px 5px;
  }

  .buttons:hover {
    border: 3px solid red;
  }

  .loadButtons {
    margin: 10px 0 10px 0;
  }
</style>
