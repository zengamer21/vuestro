<template>
  <div class="vuestro-area-chart" @mouseleave="onMouseleave" :style="style">
    <div class="vuestro-area-chart-inner">
      <svg :width="width"
           :height="height"
           :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
           @mousemove="onMouseover">
        <!--GRADIENT DEFS-->
        <defs>
          <linearGradient v-for="s in processedSeries" :key="s.field"
                          :id="`${s.field}-gradient`" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :stop-color="s.color" stop-opacity="0.8"></stop>
            <stop offset="100%" :stop-color="s.color" stop-opacity="0.2"></stop>
          </linearGradient>
        </defs>
        <!--GRID-->
        <template v-if="showGrid">
          <g v-axis:x="scale" class="vuestro-area-chart-x-axis" :class="{ showGrid }"></g>
          <g v-axis:y="scale" class="vuestro-area-chart-y-axis" :class="{ showGrid }"></g>
        </template>
        <!--LINES-->
        <g v-for="s in processedSeries" :key="s.field">
          <template v-if="!s.disabled">
            <path v-if="!notFilled"
                  v-animate:getArea="s.field"
                  class="vuestro-area-chart-area"
                  :fill="gradientFill ? `url(#${s.field}-gradient) ${s.color}`:s.color"
                  :opacity="gradientFill ? 1:fillOpacity"/>
            <path class="vuestro-area-chart-line"
                  v-animate:getLine="s.field"
                  :stroke="s.color"/>
          </template>
        </g>
        <!--AXES-->
        <template v-if="showAxes">
          <g v-axis:x="scale" class="vuestro-area-chart-x-axis" :class="{ showAxes }"></g>
          <g v-axis:y="scale" class="vuestro-area-chart-y-axis" :class="{ showAxes }"></g>
        </template>
        <!--TOOLTIP-->
        <template v-if="!hideTooltip && cursorLine.length > 0">
          <path class="vuestro-area-chart-cursor" :d="cursorLine" />
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
  </div>
</template>

<script>

/* globals window, _ */
import * as d3 from 'd3';
import moment from 'moment';

export default {
  name: 'VuestroAreaChart',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      timeSeries: true, // treat category as datetime
      granularity: null, // { 'year' 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second' }
      count: false, // enable count aggregation per granularity for time series
      smooth: true, // smooth the lines
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      categoryKey: 'key',
      colors: d3.schemeCategory10,
      valueAxis: {
        // render() {}
      },
      series: [], // series object
      showAxes: false, // show the axes
      showGrid: false, // show the grid
      transition: 1000, // animation transition period
      hideTooltip: false, // disable tooltip
      notFilled: false, // disable area fill
      gradientFill: false, // use gradient fill
      utc: false, // interpret dates as utc
      stacked: false, // stack the series
      fillOpacity: 0.6, // opacity for filled area
      gridDashArray: 1, // svg grid dash array
      strokeWidth: '2px', // svg stroke width
      width: 0, // derived width
      height: 0, // derived height
      localData: [], // local copy of data
      lastHoverPoint: {}, // tooltip last hover data point
      cursorLine: '', // svg path for cursor line
      scale: {}, // d3 axes renderers
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
    },
    getCursor() {
      return d3.area().x(d => d.x).y0(this.height).y1(0);
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
    style() {
      return {
        '--vuestro-area-chart-grid-dasharray': this.gridDashArray,
        '--vuestro-area-chart-stroke-width': this.strokeWidth,
      };
    },
  },
  watch: {
    data(newVal) {
      this.redraw();
    },
    options: {
      handler() {
        _.merge(this, this.options);
        // overwrite series separately
        this.series = _.cloneDeep(this.options.series);
        this.$nextTick(() => {
          this.redraw();
        });
      },
      deep: true,
    }
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  created() {
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  mounted() {
    this.resize();
  },
  methods: {
    resize() {
      this.$nextTick(() => { // let $el size settle
        if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
          this.redraw();
        }
      });
    },
    getArea(v, zeroed=false) {
      let area = d3.area().x(d => d.x).y0((d) => {
        if (zeroed) return this.height;
        return d[`${v}_y0`];
      }).y1((d) => {
        if (zeroed) return this.height;
        return  d[`${v}_y1`];
      });
      if (this.smooth) {
        area.curve(d3.curveNatural);
      }
      return area(this.localData);
    },
    getLine(v, zeroed=false) {
      let line = d3.line().x(d => d.x).y((d) => {
        if (zeroed) {
          return this.height;
        }
        return d[`${v}_y1`];
      });
      if (this.smooth) {
        line.curve(d3.curveNatural);
      }
      return line(this.localData);
    },
    redraw() {
      let scale;

      if (this.timeSeries && this.granularity) {
        // nest data based on granularity
        let nested = d3.nest().key((d) => {
          return moment(d[this.categoryKey]).startOf(this.granularity).toDate();
        }).rollup((d) => {
          let ret = {};
          for (let s of this.series) {
            if (this.count) {
              ret[s.field] = d.length;
            } else {
              ret[s.field] = d3.sum(d, function(g) { return g[s.field]; });
            }
          }
          return ret;
        }).entries(this.data);
        // promote aggregated values in .value out to top level
        this.localData = nested.map(function(d) {
          return {
            ...d,
            ...d.value,
          };
        });
      } else { // clone data
        this.localData = _.cloneDeep(this.data);
      }

      if (this.timeSeries) {
        // use d3 time scale
        scale = d3.scaleTime();
        // make sure category data is a native Date
        for (let d of this.localData) {
          if (!_.isDate(d[this.categoryKey])) {
            d[this.categoryKey] = new Date(d[this.categoryKey]);
          }
        }
      } else {
        scale = d3.scalePoint();
      }
      // get scale based on svg element size
      let scaleX = scale.range([0, this.width]);
      let scaleY = d3.scaleLinear().range([this.height, 0]);

      this.scale = {
        x: d3.axisBottom(scaleX).tickSize(this.height),
        y: d3.axisLeft(scaleY).tickSize(-this.width),
      };

      // use value axis render function if provided
      if (this.valueAxis.render && typeof(this.valueAxis.render) === 'function') {
        this.scale.y.tickFormat((d) => {
          if (d) {
            return this.valueAxis.render(d);
          }
          return '';
        });
      }

      if (this.timeSeries) {
        scaleX.domain(d3.extent(this.localData, (d) => d[this.categoryKey]));
      } else {
        scaleX.domain(this.localData.map((d) => d[this.categoryKey]));
      }

      let stackedData;
      let extents;
      if (this.stacked) {
        let keys = _.flatMap(this.series, 'field');
        stackedData = d3.stack().keys(keys)(this.localData);
        extents = _.reject(this.series, 'disabled').map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = _.reject(this.series, 'disabled').map((series) => {
          return d3.extent(this.localData, function(d) {
            return d[series.field];
          });
        });
      }
      scaleY.domain([d3.min(extents, function(d) { return d[0]; }),
                     d3.max(extents, function(d) {
                       let m = d[1] * 1.1;
                       if (m > 0) {
                         return m;
                       } else {
                         return 1;
                       }
                     })]);

      // map the points the data
      for (let [di, d] of this.localData.entries()) {
        d.x = scaleX(d[this.categoryKey]);
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d[`${s.field}_y0`] = scaleY(stackedData[si][di][0] || 0);
            d[`${s.field}_y1`] = scaleY(stackedData[si][di][1] || 0);
          } else {
            d[`${s.field}_y0`] = this.height;
            d[`${s.field}_y1`] = scaleY(d[s.field] || 0);
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
          x: point.x,
          diff: Math.abs(point.x - x),
          index,
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onMouseleave() {
      this.cursorLine = '';
    },
  },
  directives: {
    axis: {
      update(el, binding, vnode) {
        d3.select(el).transition().duration(vnode.context.transition).call(binding.value[binding.arg]);
      }
    },
    animate: {
      bind(el) {
        el.dataset.oldD = '';
      },
      update(el, binding, vnode) {
        let newD = vnode.context[binding.arg](binding.value);
        if (el.dataset.oldD == '') {
          // animated path update
          d3.select(el)
            .attr('d', vnode.context[binding.arg](binding.value, true))
            .transition().duration(vnode.context.transition)
            .attr('d', newD);
        } else {
          // standard path update
          d3.select(el).transition().duration(vnode.context.transition).attr('d', newD);
        }
        el.dataset.oldD = newD; // clear animate flag
      }
    }
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

.vuestro-area-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vuestro-area-chart-line {
  stroke-width: var(--vuestro-area-chart-stroke-width);
  fill: none;
}

.vuestro-area-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 2px;
  fill: none;
}

.vuestro-area-chart-tooltip rect {
	fill: var(--vuestro-light);
}

/* always hide axes lines */
.vuestro-area-chart-x-axis >>> path {
  display: none;
}
.vuestro-area-chart-y-axis >>> path {
  display: none;
}

/* toggle x grid */
.vuestro-area-chart-x-axis >>> line {
  display: none;
  stroke: var(--vuestro-outline);
  stroke-dasharray: var(--vuestro-area-chart-grid-dasharray);
}
.vuestro-area-chart-x-axis.showGrid >>> line {
  display: inline;
}
/* toggle x axes labels */
.vuestro-area-chart-x-axis >>> text {
  display: none;
  transform: translateY(-15px);
  text-anchor: start;
  alignment-baseline: baseline;
}
.vuestro-area-chart-x-axis.showAxes >>> text {
  display: inline;
}
/* toggle y grid */
.vuestro-area-chart-y-axis >>> line {
  display: none;
  stroke: var(--vuestro-outline);
  stroke-dasharray: var(--vuestro-area-chart-grid-dasharray);
}
.vuestro-area-chart-y-axis.showGrid >>> line {
  display: inline;
}
/* toggle y axes labels */
.vuestro-area-chart-y-axis >>> text {
  display: none;
  transform: translate(10px, -6px);
  text-anchor: start;
}
.vuestro-area-chart-y-axis.showAxes >>> text {
  display: inline;
}

</style>