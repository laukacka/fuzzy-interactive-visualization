<template>
  <div>
    <b-button class="buttons" v-for="button in buttons" v-bind:variant='button.variant'
              @click="file = button.file">
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
  //import cars_csv from '@/assets/datasets/cars.csv';
  //import glass_csv from '@/assets/datasets/glass.csv';
  //import iris_json from '@/assets/datasets/iris.json';

  export default {
    name: "LoadSamples",
    mixins: [loadFile],
    data() {
      return {
        file: '',
        buttons: [
          {
            name: 'CARS',
            variant: 'dark',
            file: 'https://vega.github.io/vega-datasets/data/cars.json'
          },
          {
            name: 'GLASS',
            variant: 'dark',
            file: 'https://pkgstore.datahub.io/machine-learning/glass/glass_json/data/fc1a0e26e9f16393680fcf32eefa8230/glass_json.json'
          },
          {
            name: 'IRIS',
            variant: 'dark',
            file: 'https://raw.githubusercontent.com/domoritz/maps/master/data/iris.json'
          },
          {
            name: 'WINE',
            variant: 'dark',
            file: 'https://pkgstore.datahub.io/machine-learning/glass/glass_json/data/fc1a0e26e9f16393680fcf32eefa8230/glass_json.json'
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
            let store = this.$store;
            let me = this;
            d3.json(this.file, function (rows) {
              store.dispatch("loadRows", rows);
              me.loadHeaders();
            });
            /*axios.get(this.file).then(response => {
              let rows = response.data;
              this.$store.dispatch("loadRows", rows);
              this.loadHeaders();
            }).catch(error => console.log(error.response));*/
            break;
          case '.arff':

            break;
          case '.csv':
            this.emitToParent();
            let store3 = this.$store;
            let me3 = this;
            d3.csv('@/assets/datasets/cars.csv', function (data) {
              let rows = data;
              store3.dispatch("loadRows", rows);
              me3.loadHeaders();
              console.log(data);
              console.log('data v d3.csv');

            });
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
        console.log(columns);

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
