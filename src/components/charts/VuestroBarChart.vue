<template>
  <div class="vuestro-bar-chart" >
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
         @mousemove="onMouseover">
      <!--BARS-->
      <g v-for="d in localData">
        <rect v-for="s in processedSeries" :key="s.field"
              class="vuestro-bar-chart-bar"
              :x="d[`${s.field}_x`]"
              :y="d[`${s.field}_y`]"
              :width="d.width"
              :height="d[`${s.field}_height`]"
              :fill="s.color"
              fill-opacity="0.7"
              :stroke="s.color">
        </rect>
      </g>
      <!--TOOLTIP-->
      <template v-if="!hideTooltip && cursorLine.length > 0">
        <path class="vuestro-bar-chart-cursor" :d="cursorLine" />
        <vuestro-svg-tooltip :x="lastHoverPoint.x"
                             :x-max="width"
                             :categoryKey="categoryKey"
                             :utc="utc"
                             :series="processedSeries"
                             :values="localData[lastHoverPoint.index]">
        </vuestro-svg-tooltip>
      </template>
    </svg>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroBarChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0,
      height: 0,
      localData: [],
      lastHoverPoint: {},
      cursorLine: '',
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      categoryKey: 'key',
      series: [{
        field: 'value'
      }],
      stacked: false,
      padding: 0.1,
      hideTooltip: false,
      utc: false,
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    // process series prop by adding default colors
    processedSeries() {
      return this.series.map((s) => {
        if (s.field && !s.color) {
          s.color = this.color(s.field);
        }
        return s;
      });
    },
    getCursor() {
      return d3.area().x(d => d.center).y0(this.height).y1(0);
    },
  },
  watch: {
    data(newVal) {
      this.redraw();
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
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.redraw();
      }
    },
    getBar(v) {
    },
    redraw() {
      this.localData = _.cloneDeep(this.data);

      let scaleX = d3.scaleBand()
                     .domain(this.data.map((d) => { return d[this.categoryKey]; }))
                     .rangeRound([this.margin.left, this.width - this.margin.right])
                     .padding(this.padding);

      let scaleY = d3.scaleLinear().range([this.height, 0]);

      let stackedData;
      let extents;
      if (this.stacked) {
        let keys = _.flatMap(this.series, 'field');
        stackedData = d3.stack().keys(keys)(this.localData);
        extents = this.series.map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = this.series.map((series) => {
          return d3.extent(this.localData, function(d) { return d[series.field]; });
        });
      }
      scaleY.domain([0, d3.max(extents, function(d) { return d[1] * 1.1; })]);

      // set the bar descriptions
      for (let [di, d] of this.localData.entries()) {
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d[`${s.field}_y`] = scaleY(stackedData[si][di][0]);
            d[`${s.field}_height`] = scaleY(stackedData[si][di][1]);
          } else {
            d.width = scaleX.bandwidth() / this.series.length;
            d[`${s.field}_x`] = scaleX(d[this.categoryKey]) + si*(d.width + 1);
            d[`${s.field}_y`] = scaleY(d[s.field]) - 1;
            d[`${s.field}_height`] = this.height - scaleY(d[s.field]);
            d.center = scaleX(d[this.categoryKey]) + scaleX.bandwidth() / 2;
          }
        }
      }
    },
    onMouseover({ offsetX }) {
      if (this.localData.length > 0) {
        const x = offsetX;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.localData[closestPoint.index];
          this.cursorLine = this.getCursor([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.localData
        .map((point, index) => ({
          x: point[`${this.series[this.series.length-1].field}_x`],
          diff: Math.abs(point[`${this.series[this.series.length-1].field}_x`] - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      this.cursorLine = '';
    },
  },
};

</script>

<style scoped>

.vuestro-bar-chart {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vuestro-bar-chart-bar {
  transition: all 0.4s ease-in-out;
}

.vuestro-bar-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 1px;
  fill: none;
}

</style>