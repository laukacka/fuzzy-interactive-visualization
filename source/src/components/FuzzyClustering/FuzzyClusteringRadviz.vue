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
    <b-col offset-md="1" md="7" cols="11" id="radviz" class="radviz-graph">
      <button type="button" v-on:click="klik()" class="btn btn-info">Red</button>
      <div class="container"></div>
      <div id="tooltip"></div>
    </b-col>
  </b-row>
</template>

<script>
  var dimensions = ["sepalLength", "sepalWidth", "petalLength", "petalWidth"];

  export default {
    name: "FuzzyClusteringRadviz",
    data() {
      return {
        columns: [],
        selected: [],
      }
    },
    watch: {
      selected: function () {
        //this.updateTable();
      }
    },
    methods: {
      updateTable() {
        let localColumns = [];
        for (let i = 0; i < this.$store.getters.getColumns.length; i++) {
          for (let j = 0; j < this.selected.length; j++) {
            if (this.$store.getters.getColumns[i].label === this.selected[j]) {
              localColumns.push(this.$store.getters.getColumns[i]);
            }
          }
        }
        this.columns = localColumns;
        this.updateTableKey = !this.updateTableKey;
      },
      klik () {
        let radvizScript = document.createElement("script");
        radvizScript.setAttribute(
          "src",
          "https://rawgit.com/biovisualize/radviz/master/radviz-min.js"
        );
        document.head.appendChild(radvizScript);
        var radviz = radvizComponent().config({
          el: document.querySelector("#radviz"),
          colorAccessor: function(d) {
            return d["species"];
          },
          dimensions: this.selected,
          size: 500,
          margin: 100,
          useRepulsion: true,
          drawLinks: true,
          tooltipFormatter: function(d) {
            return (
              "<h1>" +
              d.species +
              "</h1>" +
              dimensions
                .map(function(dB) {
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

      let radvizScript = document.createElement("script");
      radvizScript.setAttribute(
        "src",
        "https://rawgit.com/biovisualize/radviz/master/radviz-min.js"
      );
      document.head.appendChild(radvizScript);
      //this.klik();
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

  /*.visualizatioon > .panel {
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
  }*/

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
