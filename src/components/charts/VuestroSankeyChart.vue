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
          <rect class="node"
                v-for="n in graph.nodes"
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
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.$nextTick(() => {
          this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
          if (this.data.nodes && this.data.links && this.data.nodes.length > 0 && this.data.links.length > 0) {
              this.graph = this.sankey(this.data);
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

</style>