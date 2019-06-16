<template>
  <b-row align-h="center" align-v="center">
    <b-col md="4" cols="10" class="radviz-checkbox">
      <b-form-group label="Select the attributes for Radviz:">
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
    <b-col offset-md="1" md="7" cols="11" class="radviz-graph" id="radvizWrapper">
      <div id="radviz"></div>
      <div id="tooltip"></div>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "FuzzyClusteringRadviz",
    data() {
      return {
        columns: [],
        selected: [],
        dimensions: [],
        clustersName: '',
        clusters: []
      }
    },
    watch: {
      selected: function () {
        this.change();
      }
    },
    methods: {
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
        })
      },
      change() {
        document.getElementById("radviz").innerHTML = "";
        this.dimensions = this.selected;
        this.drawRadviz();
      },
      drawRadviz() {
        var utils = {
          merge: function (obj1, obj2) {
            for (var p in obj2) {
              if (obj2[p] && obj2[p].constructor == Object) {
                if (obj1[p]) {
                  this.merge(obj1[p], obj2[p]);
                  continue;
                }
              }
              obj1[p] = obj2[p];
            }
          },
          mergeAll: function () {
            var newObj = {};
            var objs = arguments;
            for (var i = 0; i < objs.length; i++) {
              this.merge(newObj, objs[i]);
            }
            return newObj;
          },
          htmlToNode: function (htmlString, parent) {
            while (parent.lastChild) {
              parent.removeChild(parent.lastChild);
            }
            return this.appendHtmlToNode(htmlString, parent);
          },
          appendHtmlToNode: function (htmlString, parent) {
            return parent.appendChild(document.importNode(new DOMParser().parseFromString(htmlString, "text/html").body.childNodes[0], true));
          }
        };

        var randomColorGenerator = function () {
          let letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };

        var selectedPom = this.clusters;
        var colors = function () {
          let colorsArray = [];
          for (let i = 0; i < selectedPom.length; i++) {
            colorsArray.push(randomColorGenerator());
          }

          return colorsArray;
        };

        var radvizComponent = function () {
          var config = {
            el: null,
            size: 0,
            margin: 0,
            colorScale: d3.scale.ordinal().range(colors()),
            colorAccessor: null,
            dimensions: [],
            drawLinks: true,
            zoomFactor: 1,
            dotRadius: 6,
            useRepulsion: false,
            useTooltip: true,
            tooltipFormatter: function (d) {
              return d;
            }
          };
          var events = d3.dispatch("panelEnter", "panelLeave", "dotEnter", "dotLeave");
          var force = d3.layout.force().chargeDistance(0).charge(-60).friction(.5);
          var render = function (data) {
            var localData = addNormalizedValues(JSON.parse(JSON.stringify(data)));
            var normalizeSuffix = "_normalized";
            var dimensionNamesNormalized = config.dimensions.map(function (d) {
              return d + normalizeSuffix;
            });
            var thetaScale = d3.scale.linear().domain([0, dimensionNamesNormalized.length]).range([0, Math.PI * 2]);
            var chartRadius = config.size / 2 - config.margin;
            var nodeCount = localData.length;
            var panelSize = config.size - config.margin * 2;
            var dimensionNodes = config.dimensions.map(function (d, i) {
              var angle = thetaScale(i);
              var x = chartRadius + Math.cos(angle) * chartRadius * config.zoomFactor;
              var y = chartRadius + Math.sin(angle) * chartRadius * config.zoomFactor;
              return {
                index: nodeCount + i,
                x: x,
                y: y,
                fixed: true,
                name: d
              };
            });
            var linksData = [];
            localData.forEach(function (d, i) {
              dimensionNamesNormalized.forEach(function (dB, iB) {
                linksData.push({
                  source: i,
                  target: nodeCount + iB,
                  value: d[dB]
                });
              });
            });
            force.size([panelSize, panelSize]).linkStrength(function (d) {
              return d.value;
            }).nodes(localData.concat(dimensionNodes)).links(linksData).start();
            var svg = d3.select(config.el).append("svg").attr({
              width: config.size,
              height: config.size
            });
            svg.append("rect").classed("bg", true).attr({
              width: config.size,
              height: config.size
            });
            var root = svg.append("g").attr({
              transform: "translate(" + [config.margin, config.margin] + ")"
            });
            var panel = root.append("circle").classed("panel", true).attr({
              r: chartRadius,
              cx: chartRadius,
              cy: chartRadius
            });
            if (config.useRepulsion) {
              root.on("mouseenter", function (d) {
                force.chargeDistance(80).alpha(.2);
                events.panelEnter();
              });
              root.on("mouseleave", function (d) {
                force.chargeDistance(0).resume();
                events.panelLeave();
              });
            }
            if (config.drawLinks) {
              var links = root.selectAll(".link").data(linksData).enter().append("line").classed("link", true);
            }
            var nodes = root.selectAll("circle.dot").data(localData).enter().append("circle").classed("dot", true).attr({
              r: config.dotRadius,
              fill: function (d) {
                return config.colorScale(config.colorAccessor(d));
              }
            }).on("mouseenter", function (d) {
              if (config.useTooltip) {
                var mouse = d3.mouse(config.el);
                tooltip.setText(config.tooltipFormatter(d)).setPosition(mouse[0], mouse[1]).show();
              }
              events.dotEnter(d);
              this.classList.add("active");
            }).on("mouseout", function (d) {
              if (config.useTooltip) {
                tooltip.hide();
              }
              events.dotLeave(d);
              this.classList.remove("active");
            });
            var labelNodes = root.selectAll("circle.label-node").data(dimensionNodes).enter().append("circle").classed("label-node", true).attr({
              cx: function (d) {
                return d.x;
              },
              cy: function (d) {
                return d.y;
              },
              r: 4
            });
            var labels = root.selectAll("text.label").data(dimensionNodes).enter().append("text").classed("label", true).attr({
              x: function (d) {
                return d.x;
              },
              y: function (d) {
                return d.y;
              },
              "text-anchor": function (d) {
                if (d.x > panelSize * .4 && d.x < panelSize * .6) {
                  return "middle";
                } else {
                  return d.x > panelSize / 2 ? "start" : "end";
                }
              },
              "dominant-baseline": function (d) {
                return d.y > panelSize * .6 ? "hanging" : "auto";
              },
              dx: function (d) {
                return d.x > panelSize / 2 ? "6px" : "-6px";
              },
              dy: function (d) {
                return d.y > panelSize * .6 ? "6px" : "-6px";
              }
            }).text(function (d) {
              return d.name;
            });
            force.on("tick", function () {
              if (config.drawLinks) {
                links.attr({
                  x1: function (d) {
                    return d.source.x;
                  },
                  y1: function (d) {
                    return d.source.y;
                  },
                  x2: function (d) {
                    return d.target.x;
                  },
                  y2: function (d) {
                    return d.target.y;
                  }
                });
              }
              nodes.attr({
                cx: function (d) {
                  return d.x;
                },
                cy: function (d) {
                  return d.y;
                }
              });
            });
            var tooltipContainer = d3.select(config.el).append("div").attr({
              id: "radviz-tooltip"
            });
            var tooltip = tooltipComponent(tooltipContainer.node());
            return this;
          };
          var setConfig = function (_config) {
            config = utils.mergeAll(config, _config);
            return this;
          };
          var addNormalizedValues = function (data) {
            data.forEach(function (d) {
              config.dimensions.forEach(function (dimension) {
                d[dimension] = +d[dimension];
              });
            });
            var normalizationScales = {};
            config.dimensions.forEach(function (dimension) {
              normalizationScales[dimension] = d3.scale.linear().domain(d3.extent(data.map(function (d, i) {
                return d[dimension];
              }))).range([0, 1]);
            });
            data.forEach(function (d) {
              config.dimensions.forEach(function (dimension) {
                d[dimension + "_normalized"] = normalizationScales[dimension](d[dimension]);
              });
            });
            return data;
          };
          var exports = {
            config: setConfig,
            render: render
          };
          d3.rebind(exports, events, "on");
          return exports;
        };

        var tooltipComponent = function (tooltipNode) {
          var root = d3.select(tooltipNode).style({
            position: "absolute",
            "pointer-events": "none"
          });
          var setText = function (html) {
            root.html(html);
            return this;
          };
          var position = function (x, y) {
            root.style({
              left: x + "px",
              top: y + "px"
            });
            return this;
          };
          var show = function () {
            root.style({
              display: "block"
            });
            return this;
          };
          var hide = function () {
            root.style({
              display: "none"
            });
            return this;
          };
          return {
            setText: setText,
            setPosition: position,
            show: show,
            hide: hide
          };
        };

        let pomClustersName = this.clustersName;
        let pomClusters = [];
        let size = -1;
        /*if (document.getElementById('radvizWrapper').offsetWidth < 400) {
          size = document.getElementById('radvizWrapper').offsetWidth + 10;
        } else {*/
          size = document.getElementById('radviz').offsetWidth;
        //}
        console.log(size);
        let radviz = radvizComponent().config({
          el: document.querySelector("#radviz"),
          colorAccessor: function (d) {
            pomClusters.push([pomClustersName]);
            return d[pomClustersName];
          },
          dimensions: this.dimensions,
          size: size,
          margin: 100,
          useRepulsion: true,
          drawLinks: true,
          tooltipFormatter: function (d) {
            return (
              "<h1>" +
              d[pomClustersName] +
              "</h1>" +
              this.dimensions
                .map(function (dB) {
                  return dB + ": " + d[dB];
                })
                .join("<br />")
            );
          }
        });
        this.clusters = pomClusters;
        radviz.render(this.$store.getters.getRows);
      }
    },
    mounted() {
      this.$store.dispatch('loadHeader', 'Radviz');
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
  .radviz-checkbox, .radviz-graph {
    border: 2px solid #0f193c;
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
  }

  #radvizWrapper {
    padding: 0;
  }
</style>
