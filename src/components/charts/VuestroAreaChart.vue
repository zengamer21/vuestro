<template>
  <div class="vuestro-area-chart" @mouseleave="onMouseleave">
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
         @mousemove="onMouseover">
      <!--LINES-->
      <g v-for="s in processedSeries" :key="s.field">
        <path v-if="!notFilled" class="vuestro-area-chart-area" :d="getArea(s.field)" :fill="s.color"/>
        <path class="vuestro-area-chart-line" :d="getLine(s.field)" :stroke="s.color"/>
      </g>
      <!--AXES-->
      <template v-if="showAxes">
        <g v-axis:x="scale" class="vuestro-area-chart-x-axis"
           :style="{ transform: `translate(0, ${height}px)` }">
        </g>
        <g v-axis:y="scale" class="vuestro-area-chart-y-axis"></g>
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
      timeSeries: true,
      granularity: null, // { 'year' 'month', 'quarter', 'week', 'isoWeek', 'day', 'date', 'hour', 'minute', 'second' }
      count: false,
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
      series: [{
        field: 'value',
        title: 'Count',
      }],
      valueAxis: {
        // render() {}
      },
      colors: d3.schemeCategory10,
      showAxes: false,
      hideTooltip: false,
      notFilled: false,
      utc: false,
      stacked: false,
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
    getArea(v) {
      let area = d3.area().x(d => d.x).y0(d => d[`${v}_y0`]).y1(d => d[`${v}_y1`]);
      if (this.smooth) {
        area.curve(d3.curveNatural);
      }
      return area(this.localData);
    },
    getLine(v) {
      let line = d3.line().x(d => d.x).y(d => d[`${v}_y1`]);
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
        x: d3.axisTop(scaleX),
        y: d3.axisRight(scaleY),
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
        extents = this.series.map((series, idx) => {
          return d3.extent(_.flatten(stackedData[idx]));
        });
      } else {
        extents = this.series.map((series) => {
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
      update(el, binding) {
        d3.select(el).call(binding.value[binding.arg]);
      }
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
  stroke: var(--vuestro-outline);
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