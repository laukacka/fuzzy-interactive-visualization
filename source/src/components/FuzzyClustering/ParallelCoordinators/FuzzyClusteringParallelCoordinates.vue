<template>
  <div>
    <b-row>
      <b-col id="coordinates">

      </b-col>
    </b-row>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: "FuzzyClusteringParallelCoordinates",
    data() {
      return {
        columns: this.$store.getters.getColumns,
      }
    },
    methods: {
      start() {
        /*// set the dimensions and margins of the graph
                let margin = {top: 30, right: 10, bottom: 10, left: 0},
                  width = 500 - margin.left - margin.right,
                  height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
                let svg = d3.select("#coordinates")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // Parse the Data
                d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function (data) {
                  // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
                  let dimensions = d3.keys(data[0]).filter(function (d) {
                    return d != "Species"
                  });
                  console.log(data);
                  console.log(dimensions);

                  // For each dimension, I build a linear scale. I store all in a y object
                  let y = {};
                  for (i in dimensions) {
                    name = dimensions[i];
                    y[name] = d3.scaleLinear()
                      .domain(d3.extent(data, function (d) {
                        return +d[name];
                      }))
                      .range([height, 0])
                  }

                  // Build the X scale -> it find the best position for each Y axis
                  let x = d3.scalePoint()
                    .range([0, width])
                    .padding(1)
                    .domain(dimensions);

                  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
                  function path(d) {
                    return d3.line()(dimensions.map(function (p) {
                      return [x(p), y[p](d[p])];
                    }));
                  }

                  // Draw the lines
                  svg
                    .selectAll("myPath")
                    .data(data)
                    .enter().append("path")
                    .attr("d", path)
                    .style("fill", "none")
                    .style("stroke", "#69b3a2")
                    .style("opacity", 0.5)

                  // Draw the axis:
                  svg.selectAll("myAxis")
                  // For each dimension of the dataset I add a 'g' element:
                    .data(dimensions).enter()
                    .append("g")
                    // I translate this element to its right position on the x axis
                    .attr("transform", function (d) {
                      return "translate(" + x(d) + ")";
                    })
                    // And I build the axis with the call function
                    .each(function (d) {
                      d3.select(this).call(d3.axisLeft().scale(y[d]));
                    })
                    // Add axis title
                    .append("text")
                    .style("text-anchor", "middle")
                    .attr("y", -9)
                    .text(function (d) {
                      return d;
                    })
                    .style("fill", "black")
                })*/
        var margin = {top: 30, right: 10, bottom: 10, left: 10},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangePoints([0, width], 1),
          y = {},
          dragging = {};

        var line = d3.svg.line(),
          axis = d3.svg.axis().orient("left"),
          background,
          foreground;

        var svg = d3.select("coordinates").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("cars.csv", function (error, cars) {

          // Extract the list of dimensions and create a scale for each.
          x.domain(dimensions = d3.keys(cars[0]).filter(function (d) {
            return d != "name" && (y[d] = d3.scale.linear()
              .domain(d3.extent(cars, function (p) {
                return +p[d];
              }))
              .range([height, 0]));
          }));

          // Add grey background lines for context.
          background = svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(cars)
            .enter().append("path")
            .attr("d", path);

          // Add blue foreground lines for focus.
          foreground = svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(cars)
            .enter().append("path")
            .attr("d", path);

          // Add a group element for each dimension.
          var g = svg.selectAll(".dimension")
            .data(dimensions)
            .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function (d) {
              return "translate(" + x(d) + ")";
            })
            .call(d3.behavior.drag()
              .origin(function (d) {
                return {x: x(d)};
              })
              .on("dragstart", function (d) {
                dragging[d] = x(d);
                background.attr("visibility", "hidden");
              })
              .on("drag", function (d) {
                dragging[d] = Math.min(width, Math.max(0, d3.event.x));
                foreground.attr("d", path);
                dimensions.sort(function (a, b) {
                  return position(a) - position(b);
                });
                x.domain(dimensions);
                g.attr("transform", function (d) {
                  return "translate(" + position(d) + ")";
                })
              })
              .on("dragend", function (d) {
                delete dragging[d];
                transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground).attr("d", path);
                background
                  .attr("d", path)
                  .transition()
                  .delay(500)
                  .duration(0)
                  .attr("visibility", null);
              }));

          // Add an axis and title.
          g.append("g")
            .attr("class", "axis")
            .each(function (d) {
              d3.select(this).call(axis.scale(y[d]));
            })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) {
              return d;
            });

          // Add and store a brush for each axis.
          g.append("g")
            .attr("class", "brush")
            .each(function (d) {
              d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
            })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
        });

        function position(d) {
          var v = dragging[d];
          return v == null ? x(d) : v;
        }

        function transition(g) {
          return g.transition().duration(500);
        }

// Returns the path for a given data point.
        function path(d) {
          return line(dimensions.map(function (p) {
            return [position(p), y[p](d[p])];
          }));
        }

        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }

// Handles a brush event, toggling the display of foreground lines.
        function brush() {
          var actives = dimensions.filter(function (p) {
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
      this.start();
    }
  }
</script>

<style scoped>

</style>
