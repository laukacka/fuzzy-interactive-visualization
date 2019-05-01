<template>
  <b-row align-h="center" align-v="center">
    <b-col md="4" cols="10">
      <b-row align-h="center" align-v="center">
        <b-col class="coordinates-checkbox">
          <b-form-group label="Choose the attributes:">
            <b-form-checkbox style="text-align: left"
                             v-for="column in this.$store.getters.getColumns"
                             v-model="selected"
                             :key="column.label"
                             :value="column.label"
                             stacked
            >
              {{ column.label }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="center">
        <b-col>
          <b-button variant="danger">Change color</b-button>
        </b-col>
      </b-row>
    </b-col>
    <b-col offset-md="1" md="7" id="coordinates" class="coordinates-graph">

    </b-col>
  </b-row>
</template>
<script>
  export default {
    name: "FuzzyClusteringParallelCoordinates",
    data() {
      return {
        columns: [],
        selected: [],
        margin: '',
        width: '',
        height: '',
        x: '',
        y: '',
        dragging: '',
        line: '',
        axis: '',
        svg: '',
        clusterClass: 'species'
      }
    },
    watch: {
      selected: function () {
        this.updateTable();
      }
    },
    methods: {
      start() {
        // nastavi okraje grafu - pravo lavo hore dole do nasho col
        let margin = {top: 30, right: 10, bottom: 10, left: 10},
          width = 700 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        // nastavenie premennych ako hodnoty x, y, a dimension.
        let x = d3.scale.ordinal().rangePoints([0, width], 1);
        let y = {};
        let dragging = {};
        let dimensions = '';
        let line = d3.svg.line();
        let axis = d3.svg.axis().orient("left");
        let background;
        let foreground;
        let svg = d3.select("#coordinates")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //nacitane data
        let file = this.$store.getters.getRows;
        // Rozbaľte zoznam dimenzií a vytvorte mierku pre každú z nich.
        // URCENIE MIERKY
        // prirady body na os ypsilonovu
        let cluster = this.clusterClass;
        x.domain(dimensions = d3.keys(file[0])
          .filter(function (d) {
            return (d !== cluster) &&
              (y[d] =
                d3.scale.linear()
                  .domain(d3.extent(file, function (p) {
                    return +p[d];
                  }))
                  .range([height, 0]));
          }));

        // uprava pozadia
        // Add grey background lines for context.
        //DA NAM SIVOU TIE CASTI KTORE NIE SU ZVYRAZNENE
        background = svg.append("g")
          .attr("class", "background")
          .selectAll("path")
          .data(file)
          .enter()
          .append("path")
          .attr('stroke', '#b0a7cc')
          .attr('fill', '#fff')
          .attr('strokeWidth', 1)
          .attr('shapeRendering', 'crispEdges')
          .attr("d", path);

        // Add blue foreground lines for focus.
        // Pridajte modré riadky popredia pre zaostrenie.
        // POPREDIE
        foreground = svg.append("g")
          .attr("class", "foreground")
          .selectAll("path")
          .data(file)
          .enter()
          .append("path")
          .attr('stroke', '#980bb4')
          .attr('fill', '#fff')
          .attr("d", path);



        // Add a group element for each dimension.
        // Pridajte element skupiny pre každú dimenziu.
        // g su zvysle ciary
        let g = svg.selectAll(".dimension")
          .data(dimensions)
          .enter()
          .append("g")
          .attr("class", "dimension")
          .attr("transform", function (d) {
            return "translate(" + x(d) + ")";
          })
          .call(d3.behavior
            .drag()
            .origin(function (d) {
              return {x: x(d)};
            })
            .on("dragstart",
              function (d) {            //zaciatok presuvanie atributu
                dragging[d] = x(d);
                background
                  .attr("visibility", "hidden");
              })
            .on("drag",                        //presuvanie
              function (d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                foreground
                  .attr("d", path);
                dimensions
                  .sort(function (a, b) {
                    return position(a) - position(b);
                  });
                x
                  .domain(dimensions);
                g
                  .attr("transform",
                    function (d) {
                      return "translate(" + position(d) + ")";
                    });
              })
            .on("dragend",
              function (d) {         //presuvam
                delete dragging[d];

                transition(
                  d3.select(this))
                  .attr("transform", "translate(" + x(d) + ")");

                transition(foreground)
                  .attr("d", path);

                background
                  .attr("d", path)
                  .transition()
                  .delay(500)
                  .duration(0)
                  .attr("visibility", null);
              })
          );

        // Add an axis and title.
        //Pridajte os a názov.
        //NAZOV OSI X
        g.append("g")
          .attr("class", "axis")
          .each(function (d) {
            d3.select(this)
              .call(axis.scale(y[d]));
          })
          .append("text")
          .style("text-anchor", "middle")
          .attr("y", -9)
          .text(function (d) {
            return d;
          });

        // Add and store a brush for each axis.
        //Pridajte a uložte kefu pre každú os.
        g.append("g")
          .attr("class", "brush")
          .each(function (d) {
            d3.select(this)
              .call(y[d].brush = d3.svg.brush().y(y[d])
                .on("brushstart", brushstart)
                .on("brush", brush));
          })
          .selectAll("rect")
          .attr("x", -8)
          .attr("width", 16);

        //});

        // vrati konkretnu poziciu
        function position(d) {
          let v = dragging[d];
          return v == null ? x(d) : v;
        }

        // premiesni ich s 0.5 sekundovou odozvoou
        function transition(g) {
          return g.transition()
            .duration(500);
        }

        // Returns the path for a given data point.
        //   Vracia cestu pre daný dátový bod.
        function path(d) {
          return line(dimensions
            .map(function (p) {
              return [position(p), y[p](d[p])];
            })
          );
        }

        // ZACIATOK ZVYRAZNOVANIA
        // STOPNEME PREDEFINOVANU AKCIU
        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }

        // Spracováva udalosti štetce, prepínanie zobrazenia v popredí liniek.
        function brush() {
          let actives = dimensions
              .filter(
                function (p) {
                  return !y[p].brush.empty();
                }),
            extents = actives
              .map(
                function (p) {
                  return y[p].brush.extent();
                });

          foreground
            .style("display",
              function (d) {
                return actives
                  .every(
                    function (p, i) {
                      return extents[i][0] <= d[p] &&
                        d[p] <= extents[i][1];
                    }) ? null : "none";
              });
        }

      },
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
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Parallel coordinates');
      this.columns = this.$store.getters.getColumns;
      for (let i = 0; i < this.columns.length; i++) {
        this.selected.push(this.columns[i].label);
      }
      this.start();
    }
  }
</script>

<style scoped>
  svg {
    font: 10px sans-serif;
  }

  .background path {
    fill: #b0a7cc;
    stroke: #b0a7cc;
    /* shape-rendering: crispEdges; */
    stroke-width: 1;
  }

  .foreground path {
    fill: #b0a7cc;
    stroke: #980bb4;
  }

  .brush .extent {
    fill-opacity: .3;
    stroke: #fff;
    /* shape-rendering: crispEdges;*/
  }

  .axis line,
  .axis path {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .axis text {
    text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
    cursor: move;
  }

  .coordinates-checkbox, .coordinates-graph {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }
</style>
