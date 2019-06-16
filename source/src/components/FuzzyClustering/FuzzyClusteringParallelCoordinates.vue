<template>
  <b-row align-h="center" align-v="center">
    <b-col md="4" cols="10" class="coordinates-checkbox">
      <b-form-group label="Select the attributes for Parallel coordinates:">
        <b-form-checkbox style="text-align: left"
                         v-for="column in this.columns"
                         v-model="selected"
                         :key="column"
                         :value="column"
                         stacked>
          {{ column }}
        </b-form-checkbox>
      </b-form-group>
      <b-button variant="primary" @click="start()">Change attribute for clusters</b-button>
    </b-col>
    <b-col offset-md="1" md="7" cols="11" id="coordinates" class="coordinates-graph">
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
        clustersName: '',
        showColorPicker: false
      }
    },
    watch: {
      selected: function () {
        this.change();
      }
    },
    methods: {
      change() {
        d3.select("svg").remove();
        this.drawParallelCoordinates();
      },
      start() {
        let file = this.$store.getters.getRows;
        let row = file[0];
        let objectRow = Object.entries(row);
        let clusterIndex = -1;

        this.$swal({
          title: 'Index of clusters:',
          input: 'range',
          inputAttributes: {
            min: 1,
            max: objectRow.length,
            step: 1
          },
          padding: 30,
          allowOutsideClick: false,
          confirmButtonColor: '#1bd60b',
          backdrop: `rgba(0, 0, 0, 0.9)`,
          inputValue: 1
        }).then((result) => {
          clusterIndex = result.value;
          this.clustersName = objectRow[clusterIndex - 1][0];
          this.columns = [];
          for (let i = 0; i < objectRow.length; i++) {
            if (typeof objectRow[i][1] === 'number') {
              if (this.clustersName !== objectRow[i][0]) {
                this.columns.push(objectRow[i][0]);
              }
            }
          }
          this.selected = [];
          for (let i = 0; i < this.columns.length; i++) {
            if (this.clustersName !== this.columns[i]) {
              this.selected.push(this.columns[i]);
            }
          }
          this.change();
        });
      },
      drawParallelCoordinates() {
        let file = this.$store.getters.getRows;
        let margin = {top: 30, right: 10, bottom: 10, left: 10};
        let width = 700 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;
        let x = d3.scale.ordinal().rangePoints([0, width], 1);
        let y = {};
        let dragging = {};
        let dimensions = '';
        let line = d3.svg.line();
        let axis = d3.svg.axis().orient("left");
        let background;
        let foreground;

        let randomColorGenerator = function () {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };

        let arrayOfClusters = [];
        let arrayOfColors = [];

        for (let i = 0; i < file.length; i++) {
          let typeOfCluster = file[i][this.clustersName];
          let found = false;
          for (let j = 0; j < arrayOfClusters.length; j++) {
            if (typeOfCluster === arrayOfClusters[j]) {
              found = true;
              break;
            }
          }
          if (!found) {
            arrayOfClusters.push(typeOfCluster);
          }
        }

        for (let i = 0; i < arrayOfClusters.length; i++) {
          arrayOfColors.push(randomColorGenerator());
        }

        let color = d3.scale.ordinal().domain(arrayOfClusters).range(arrayOfColors);

        let svg = d3.select("#coordinates")
          .append("svg")
          .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(dimensions = (this.selected)
          .filter(function (d) {
            return (y[d] = d3.scale.linear().domain(
              d3.extent(file, function (p) {
                return +p[d];
              })
            ).range([height, 0]));
          }));

        background = svg.append("g")
          .attr("class", "background")
          .selectAll("path")
          .data(file)
          .enter()
          .append("path")
          .attr('stroke', '#e3e2e1')
          .attr('fill', 'none')
          .attr('strokeWidth', 1)
          .attr('shapeRendering', 'crispEdges')
          .attr("d", path);

        let pomClustersName = this.clustersName;

        foreground = svg.append("g")
          .attr("class", "foreground")
          .selectAll("path")
          .data(file)
          .enter()
          .append("path")
          .attr('strokeWidth', 1)
          .attr('shapeRendering', 'crispEdges')
          .attr('fill', 'none')
          .attr("d", path)
          .style("stroke", function (d) {
            return color(d[pomClustersName]);
          });

        // Add a group element for each dimension.
        let g = svg.selectAll(".dimension")
          .data(dimensions)
          .enter()
          .append("g")
          .attr("class", "dimension")
          .attr("transform", function (d) {
            return "translate(" + x(d) + ")";
          }).call(d3.behavior.drag().origin(function (d) {
              return {x: x(d)};
            }).on("dragstart", function (d) {
              dragging[d] = x(d);
              background.attr("visibility", "hidden");
            }).on("drag", function (d) {
              dragging[d] = Math.min(width, Math.max(0, d3.event.x));
              foreground.attr("d", path);
              dimensions.sort(function (a, b) {
                return position(a) - position(b);
              });
              x.domain(dimensions);
              g.attr("transform", function (d) {
                return "translate(" + position(d) + ")";
              });
            }).on("dragend", function (d) {
              delete dragging[d];
              transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
              transition(foreground).attr("d", path);
              background.attr("d", path).transition().delay(500).duration(0).attr("visibility", null);
            })
          );

        // Add an axis and title.
        g.append("g")
          .attr("class", "axis")
          .each(function (d) {
            d3.select(this).call(axis.scale(y[d]));
          })
          .append("text")
          .style("text-anchor", "middle")
          .style("text-shadow", "0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff")
          .style('cursor', 'move')
          .attr("y", -9)
          .text(function (d) {
            return d;
          });

        // Add and store a brush for each axis.
        g.append("g")
          .attr("class", "brush")
          .each(function (d) {
            d3.select(this)
              .call(y[d].brush = d3.svg.brush().y(y[d])
                .on("brushstart", brushstart)
                .on("brush", brush));
          })
          .selectAll("rect")
          .attr("x", -6)
          .attr("width", 12);

        function position(d) {
          let v = dragging[d];
          return v == null ? x(d) : v;
        }

        function transition(g) {
          return g.transition().duration(500);
        }

        // Returns the path for a given data point.
        function path(d) {
          return line(dimensions.map(function (p) {
              return [position(p), y[p](d[p])];
            })
          );
        }

        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }

        function brush() {
          let actives = dimensions.filter(function (p) {
              return !y[p].brush.empty();
            }),
            extents = actives.map(function (p) {
              return y[p].brush.extent();
            });

          foreground.style("display", function (d) {
            return actives.every(function (p, i) {
              return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
          });
        }
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Parallel coordinates');
      if (this.$store.getters.getRows.length === 0) {
        this.$swal({
          type: 'warning',
          allowOutsideClick: false,
          title: 'Please, try again.'
        }).then((result) => {
          if (result.value) {
            this.$router.push("dataInput");
          }
        })
      }
      this.start();
    }
  }
</script>

<style scoped>
  .axis line,
  .axis path {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
  }

  .coordinates-checkbox, .coordinates-graph {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }
</style>
