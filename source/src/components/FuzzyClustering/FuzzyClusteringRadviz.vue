<template>
  <b-row align-h="center" align-v="center">
    <b-col md="4" cols="10" class="radviz-checkbox">
      <b-form-group label="Select the attributes for Radviz:">
        <b-form-checkbox style="text-align: left"
                         v-for="column in this.columns"
                         v-model="selected"
                         :key="column"
                         :value="column"
                         stacked
        >
          {{ column }}
        </b-form-checkbox>
      </b-form-group>
    </b-col>
    <b-col offset-md="1" md="7" cols="11" class="radviz-graph">
      <button type="button" v-on:click="drawRadviz()" class="btn btn-info">Redraw</button>
      <div id="radviz"></div>
      <div id="tooltip"></div>
    </b-col>
  </b-row>
</template>

<script>
  import radviz from './radviz.js';
  let dimensions = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];

  export default {
    name: "FuzzyClusteringRadviz",
    data() {
      return {
        columns: [],
        selected: [],
      }
    },
    methods: {
      drawRadviz() {
        let radviz = radvizComponent().config({
          el: document.querySelector("#radviz"),
          colorAccessor: function (d) {
            return d["species"];
          },
          dimensions: dimensions,
          size: 500,
          margin: 100,
          useRepulsion: true,
          drawLinks: true,
          tooltipFormatter: function (d) {
            return (
              "<h1>" +
              d.species +
              "</h1>" +
              dimensions
                .map(function (dB) {
                  return dB + ": " + d[dB];
                })
                .join("<br />")
            );
          }
        });
        radviz.render(this.$store.getters.getRows);
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Radviz');

      let file = this.$store.getters.getRows;
      let row = file[0];
      let objectRow = Object.entries(row);
      this.columns = [];
      for (let i = 0; i < objectRow.length; i++) {
        if (typeof objectRow[i][1] === 'number') {
          this.columns.push(objectRow[i][0]);
        }
      }
      this.selected = [];
      for (let i = 0; i < this.columns.length; i++) {
        this.selected.push(this.columns[i]);
      }
    }
  }
</script>

<style scoped>
  .radviz-checkbox, .radviz-graph {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }

  .panel {
    stroke: black;
    fill: white;
  }

  .bg {
    fill: white;
  }

  .link {
    stroke: silver;
    stroke-opacity: 0.05;
  }

  .dot {
    fill-opacity: 0.5;
  }

  .label-node {
    fill: silver;
  }

  .active {
    stroke: black;
  }

  .label {
    fill: gray;
    pointer-events: none;
  }

  #tooltip {
    font-size: 12px;
    margin-top: 22px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }

  #tooltip h1 {
    font-size: 14px;
    margin: 0;
  }
</style>
