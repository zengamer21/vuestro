<template>
  <div class="vuestro-area-chart" @mouseleave="onMouseleave">
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
         @mousemove="onMouseover">
      <!--LINES-->
      <g v-for="v in valueKeys" :key="v">
        <path class="vuestro-area-chart-area" :d="getArea(v)" :fill="color(v)"/>
        <path class="vuestro-area-chart-line" :d="getLine(v)" :stroke="color(v)"/>
      </g>
      <!--AXES-->
      <template v-if="showAxes">
        <g v-axis:x="scale" class="vuestro-area-chart-x-axis"
           :style="{ transform: `translate(0, ${height}px)` }">
        </g>
        <g v-axis:y="scale" class="vuestro-area-chart-y-axis"></g>
      </template>
      <!--TOOLTIP-->
      <template v-if="cursorLine.length > 0">
        <path class="vuestro-area-chart-cursor" :d="cursorLine" />
        <vuestro-svg-tooltip :x="lastHoverPoint.x"
                             :x-max="width"
                             :categoryKey="categoryKey"
                             :valueKeys="valueKeys"
                             :values="data[lastHoverPoint.index]">
        </vuestro-svg-tooltip>
      </template>
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
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      timeSeries: false,
      width: 0,
      height: 0,
      localData: [],
      lastHoverPoint: {},
      cursorLine: '',
      scale: {},
      smooth: true,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      categoryKey: 'key',
      valueKeys: ['value'],
      colors: d3.schemeCategory10,
      showAxes: false,
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    getCursor() {
      return d3.area().x(d => d.x).y0(d => d.max).y1(0);
    },
  },
  watch: {
    data(newVal) {
      this.prepareData();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.prepareData();
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    prepareData() {
      this.localData = _.cloneDeep(this.data);
    },
    resize() {
      this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
      this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
      this.redraw();
    },
    getArea(v) {
      let area = d3.area().x(d => d.x).y0(d => d.max).y1(d => d[`${v}_y`]);
      if (this.smooth) {
        area.curve(d3.curveNatural);
      }
      return area(this.localData);
    },
    getLine(v) {
      let line = d3.line().x(d => d.x).y(d => d[`${v}_y`]);
      if (this.smooth) {
        line.curve(d3.curveNatural);
      }
      return line(this.localData);
    },
    redraw() {
      let scale;
      if (this.timeSeries) {
        // use d3 time scale
        scale = d3.scaleTime();
        // make sure category data is a native Date
        for (const d of this.localData) {
          if (!_.isDate(d[this.categoryKey])) {
            d[this.categoryKey] = new Date(d[this.categoryKey]);
          }
        }
      } else {
        scale = d3.scaleLinear();
      }
      // get scale based on svg element size
      let scaleX = scale.range([0, this.width]);
      let scaleY = d3.scaleLinear().range([this.height, 0]);

      this.scale = {
        x: d3.axisTop(scaleX),
        y: d3.axisRight(scaleY),
      };

      scaleX.domain(d3.extent(this.localData, (d) => d[this.categoryKey]));
      var extents = this.valueKeys.map((dimensionName) => {
        return d3.extent(this.localData, function(d) { return d[dimensionName]; });
      });

      scaleY.domain([d3.min(extents, function(d) { return d[0]; }),
                     d3.max(extents, function(d) { return d[1] * 1.1; })]);

      // map the points the data
      for (const d of this.localData) {
        d.x = scaleX(d[this.categoryKey]);
        d.max = this.height;
        for (const v of this.valueKeys) {
          d[`${v}_y`] = scaleY(d[v]);
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
          // console.log(this.data[closestPoint.index])
        }
      }
    },
    getClosestPoint(x) {
      return this.localData
        .map((point, index) => ({
          x: point.x,
          diff: Math.abs(point.x - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      // this.cursorLine = '';
    },
  },
  directives: {
    axis(el, binding) {
      d3.select(el).call(binding.value[binding.arg]);
    },

  }
};
</script>

<style scoped>

.vuestro-area-chart {
  position: relative;
  width: 100%;
  height: 100%;
	flex-grow: 1;
  overflow: hidden;
}

.vuestro-area-chart-area {
  opacity: 0.5;
}

.vuestro-area-chart-line {
  stroke-width: 1px;
  fill: none;
}

.vuestro-area-chart-cursor {
  stroke: var(--vuestro-hover);
  stroke-width: 1px;
  fill: none;
}

.vuestro-area-chart-tooltip rect {
	fill: var(--vuestro-light);
}

.vuestro-area-chart-x-axis >>> path {
  display: none;
}
.vuestro-area-chart-y-axis >>> path {
  display: none;
}

</style>