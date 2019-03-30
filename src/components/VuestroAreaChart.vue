<template>
  <div class="vuestro-area-chart">
    <svg :width="width" :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
         @mousemove="onMouseover">
      <g>
        <path class="area" :d="paths.area" />
        <path class="line" :d="paths.line" />
        <path class="selector" :d="paths.selector" />
      </g>
    </svg>
  </div>
</template>

<script>

/* globals window, _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroAreaChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },
  data() {
    return {
      width: 0,
      height: 0,
      paths: {
        area: '',
        line: '',
        selector: '',
      },
      lastHoverPoint: {},
      points: [],
      smooth: false,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      categoryKey: 'title',
      valueKeys: ['value'],
    };
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
  watch: {
    width() {
      this.redraw();
    },
  },
  methods: {
    resize() {
      this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
      this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
    },
    createArea(points) {
      let area = d3.area().x(d => d.x).y0(d => d.max).y1(d => d.y);
      if (this.smooth) {
        area.curve(d3.curveNatural);
      }
      return area(points);
    },
    createLine(points) {
      let line = d3.line().x(d => d.x).y(d => d.y);
      if (this.smooth) {
        line.curve(d3.curveNatural);
      }
      return line(points);
    },
    createValueSelector: d3.area().x(d => d.x).y0(d => d.max).y1(0),
    redraw() {
      // get scale based on svg element size
      let scaleX = d3.scaleLinear().range([0, this.width]);
      let scaleY = d3.scaleLinear().range([this.height, 0]);

      d3.axisLeft().scale(scaleX);
      d3.axisBottom().scale(scaleY);

      scaleX.domain(d3.extent(this.data, (d, i) => i));
      scaleY.domain([0, d3.max(this.data, function(d) { return d.value; })*1.1]);

      // process the data
      this.points = [];
      for (const [i, d] of this.data.entries()) {
        this.points.push({
          x: scaleX(i),
          y: scaleY(d.value),
          max: this.height,
        });
      }

      // set the svg path strings
      this.paths.area = this.createArea(this.points);
      this.paths.line = this.createLine(this.points);
    },
    onMouseover({ offsetX }) {
      if (this.points.length > 0) {
        const x = offsetX;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.points[closestPoint.index];
          this.paths.selector = this.createValueSelector([point]);
          this.$emit('select', this.data[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.points
        .map((point, index) => ({
          x: point.x,
          diff: Math.abs(point.x - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
  },
};
</script>

<style scoped>

.vuestro-area-chart {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.area {
  fill: #76BF8A;
}

.line {
  stroke: #4F7F5C;
  stroke-width: 1px;
  fill: none;
}

.selector {
  stroke: #666768;
  stroke-width: 2px;
  fill: none;
}

.tooltip {

}

</style>