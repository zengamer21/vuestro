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
                v-for="(n, idx) in graph.nodes"
                :class="{ focused: idx === focusedNode }"
                :x="n.x0"
                :y="n.y0"
                :key="n.name"
                :height="n.y1- n.y0"
                :width="n.x1 - n.x0"
                :fill="color(n.name)"
                @click="focusNode(idx)">
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
              <text>{{ renderValue(l.value) }}</text>
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
    <div class="sankey-toolbar" :style="{ height: `${toolbarHeight}px` }">
      <span class="text">Max Links</span>
      <vuestro-button pill size="sm" @click="increaseLinkThreshold">
        <vuestro-icon name="plus"></vuestro-icon>
      </vuestro-button>
      <vuestro-pill color="var(--vuestro-secondary)">
        <template #title>{{ maxLinks }}</template>
      </vuestro-pill>
      <vuestro-button pill size="sm" @click="decreaseLinkThreshold">
        <vuestro-icon name="minus"></vuestro-icon>
      </vuestro-button>
      <div class="sankey-toolbar-selected-node" v-if="focusedNode !== null">
        <span class="sankey-toolbar-selected-node-title">{{ selectedNodeLabel }}</span>
        <span class="sankey-toolbar-selected-node-value">{{ this.data.nodes[focusedNode].name }}</span>
        <slot :node="this.data.nodes[focusedNode]"></slot>
      </div>
    </div>
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
      toolbarHeight: 24,
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
      maxLinks: this.data.links.length,
      renderValue: (d) => {
        return d;
      },
      focusedNode: null,
      selectedNodeLabel: 'Selected Node',
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
      // see if a node was marked as focused
      if (!this.focusedNode) {
        this.focusedNode = _.findIndex(this.data.nodes, 'focus');
      }
      if (this.data.links && this.data.links.length <= this.maxLinks) {
        // take all the data
        this.prunedData = _.cloneDeep(this.data);
      } else {
        this.prunedData = {
          nodes: [],
          links: [],
        };
        let keptLinks = [];
        if (this.focusedNode < 0) {
          // no focused node, just take the top N links by value
          keptLinks = _.take(_.orderBy(this.data.links, 'value', ['desc']), this.maxLinks);
        } else {
          // node was focused, take that node and top N links in and out of it
          keptLinks = _.take(_.orderBy(_.filter(this.data.links, (d) => {
            return d.source === this.focusedNode || d.target === this.focusedNode;
          }), 'value', ['desc']), this.maxLinks);
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
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom - this.toolbarHeight;
          if (this.prunedData.nodes && this.prunedData.links && this.prunedData.nodes.length > 0 && this.prunedData.links.length > 0) {
              this.graph = this.sankey(this.prunedData);
          }
        });
      }
    },
    increaseLinkThreshold() {
      this.maxLinks += 5;
      if (this.maxLinks > this.data.links.length) {
        this.maxLinks = this.data.links.length;
      }
      this.processData();
      this.resize();
    },
    decreaseLinkThreshold() {
      this.maxLinks -= 5;
      if (this.maxLinks < 0) {
        this.maxLinks = 0;
      }
      this.processData();
      this.resize();
    },
    focusNode(nidx) {
      this.focusedNode = nidx;
      this.processData();
      this.resize();
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

.vuestro-sankey-node {
  cursor: pointer;
}

.vuestro-sankey-node.focused {
  stroke: var(--vuestro-gold);
  stroke-width: 3;
}

.sankey-toolbar {
  width: 100%;
  padding: 2px;
  position: absolute;
  bottom: 0;
  display: flex;
}
.sankey-toolbar > .text {
  margin-left: 6px;
  align-self: center;
  font-size: 12px;
  color: var(--vuestro-text-color-muted);
  font-weight: 500;
  margin-right: 6px;
}

.sankey-toolbar-selected-node {
  font-weight: 500;
  font-size: 12px;
  align-self: center;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.sankey-toolbar-selected-node-title {
  color: var(--vuestro-text-color-muted);
  margin-right: 8px;
}
.sankey-toolbar-selected-node-value {
  font-size: 13px;
  margin-right: 5px;
}

</style>