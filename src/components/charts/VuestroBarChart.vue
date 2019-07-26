<template>
  <div class="vuestro-bar-chart" >
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }"
         >
      <!--BARS-->
      <!--<g v-for="s in processedSeries" :key="s.field">-->
      <!--  <rect class="vuestro-bar-chart-bar" -->
      <!--        :fill="s.color"-->
      <!--        :x="/>-->
      <!--</g>-->
      <g v-for="d in localData">
        <rect class="vuestro-bar-chart-bar"
              :x="d.x"
              :y="d.y"
              :width="d.width"
              :height="d.height"
              :fill="color(d[categoryKey])">
        </rect>
      </g>
      <!--TOOLTIP-->
      <!--<template v-if="!hideTooltip && cursorLine.length > 0">-->
      <!--  <path class="vuestro-bar-chart-cursor" :d="cursorLine" />-->
      <!--  <vuestro-svg-tooltip :x="lastHoverPoint.x"-->
      <!--                       :x-max="width"-->
      <!--                       :categoryKey="categoryKey"-->
      <!--                       :utc="utc"-->
      <!--                       :series="processedSeries"-->
      <!--                       :values="localData[lastHoverPoint.index]">-->
      <!--  </vuestro-svg-tooltip>-->
      <!--</template>-->
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
                     .padding(0.08);

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
        d.x = scaleX(d[this.categoryKey]);
        d.width = scaleX.bandwidth();
        d.y = scaleY(d.value1);
        d.height = this.height - scaleY(d.value1);
        for (const [si, s] of this.series.entries()) {
          if (stackedData) {
            d[`${s.field}_y0`] = scaleY(stackedData[si][di][0]);
            d[`${s.field}_y1`] = scaleY(stackedData[si][di][1]);
          } else {
            d[`${s.field}_y0`] = this.height;
            d[`${s.field}_y1`] = scaleY(d[s.field]);
          }
        }
      }
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

</style>