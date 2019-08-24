<template>
  <div class="vuestro-sankey-chart">
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
      <defs>
        <linearGradient v-for="l in graph.links"
                        :id="`gradient_${l.index}`"
                        :key="l.index"
                        gradientUnits="userSpaceOnUse"
                        :x1="l.source.x"
                        :y1="l.source.y"
                        :x2="l.target.x"
                        :y2="l.target.y">
          <stop offset="0%" :stop-color="color(l.source.name)"></stop>
          <stop offset="100%" :stop-color="color(l.target.name)"></stop>
        </linearGradient>
      </defs>
      <g>
        <g stroke="#000">
          <rect class="vuestro-sankey-node"
                v-for="n in graph.nodes"
                :class="{ focused: n.focus }"
                :x="n.x0"
                :y="n.y0"
                :key="n.name"
                :height="n.y1- n.y0"
                :width="n.x1 - n.x0"
                :fill="color(n.name)">
          </rect>
        </g>
        <g fill="none" stroke-opacity="0.5">

          <path v-for="l in graph.links"
                :d="sankeyLink(l)"
                :key="l.index"
                :stroke="`url(#gradient_${l.index})`"
                :stroke-width="l.width"
                class="sankey-link">
            <title>
              <text>{{ l.value }}</text>
            </title>
          </path>
        </g>
        <g>
          <text v-for="n in graph.nodes"
                v-if="n.x0 !== undefined && n.x1 !== undefined"
                :x="n.x0 < width / 2 ? n.x1 + 6 : n.x0 - 6"
                :key="n.name"
                :y="(n.y1 + n.y0) / 2"
                :text-anchor="n.x0 < width / 2 ? 'start' : 'end'">
            {{ n.name }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';
import * as Sankey from 'd3-sankey';

export default {
  name: 'VuestroSankeyChart',
  props: {
    data: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      prunedData: {},
      width: 0,
      height: 0,
      nodeWidth: 10,
      nodePadding: 5,
      graph: {},
      margin: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      maxLinks: 100,
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(d3.schemeCategory10);
    },
    sankey() {
      return Sankey.sankey()
        .nodeWidth(this.nodeWidth)
        .nodePadding(this.nodePadding)
        .size([this.width, this.height]);
    },
    sankeyLink() {
      return Sankey.sankeyLinkHorizontal();
    },
  },
  watch: {
    data(newVal) {
      this.processData();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.processData();
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    processData() {
      if (this.data.links && this.data.links.length < this.maxLinks) {
        // take all the data
        this.prunedData = this.data;
      } else {
        this.prunedData = {
          nodes: [],
          links: [],
        };
        let keptLinks = [];
        // see if a node was marked as focused
        let fidx = _.findIndex(this.data.nodes, 'focus');
        if (fidx < 0) {
          // no focused node, just take the top N links by value
          keptLinks = _.take(_.orderBy(this.data.links, 'value', ['desc']), this.maxLinks);
        } else {
          // node was focused, take that node and top N links in and out of it
          keptLinks = _.take(_.filter(this.data.links, function (d) {
            return d.source === fidx || d.target === fidx;
          }), this.maxLinks);
        }
        for (let l of keptLinks) {
          let srcIdx = _.findIndex(this.prunedData.nodes, this.data.nodes[l.source]);
          if (srcIdx < 0) {
            srcIdx = this.prunedData.nodes.length;
            this.prunedData.nodes.push(this.data.nodes[l.source]);
          }
          let tgtIdx = _.findIndex(this.prunedData.nodes, this.data.nodes[l.target]);
          if (tgtIdx < 0) {
            tgtIdx = this.prunedData.nodes.length;
            this.prunedData.nodes.push(this.data.nodes[l.target]);
          }
          this.prunedData.links.push({
            source: srcIdx,
            target: tgtIdx,
            value: l.value,
          });
        }
      }
    },
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.$nextTick(() => {
          this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
          if (this.prunedData.nodes && this.prunedData.links && this.prunedData.nodes.length > 0 && this.prunedData.links.length > 0) {
              this.graph = this.sankey(this.prunedData);
          }
        });
      }
    },
  },
};

</script>

<style scoped>

.vuestro-sankey-chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.sankey-link {
  stroke-opacity: 0.4
}

.sankey-link:hover {
  stroke-opacity: 0.8
}


.vuestro-sankey-node.focused {
  stroke: var(--vuestro-gold);
  stroke-width: 3;
}


</style>