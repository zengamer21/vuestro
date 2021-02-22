<template>
  <div class="vuestro-donut-chart" @mouseleave="onMouseleave">
    <div class="vuestro-donut-chart-inner">
      <svg :width="width"
           :height="height"
           :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <!--THE ARCS (all centered)-->
        <g v-for="d in localData"
           :key="d.id"
           :transform="`translate(${centerX},${centerY})`">
          <path :d="d.arc"
                :fill="d.color"
                :opacity="fillOpacity"
                @mouseenter="onMouseenter"/>
          <path :d="d.arc"
                fill="none"
                :stroke-width="strokeWidth"
                :stroke="d.color"/>
          <text v-if="showLabels"
                :x="d.label[0]"
                :y="d.label[1]"
                text-anchor="middle"
                fill="white">
            {{ d[categoryField] }}
          </text>
        </g>
        <!--DONUT CENTER LABEL-->
        <g>
          <text class="donut-text"
                :x="centerX"
                :y="centerY"
                text-anchor="middle"
                alignment-baseline="middle">
            {{ donutTextValue }}
          </text>
        </g>

        <!--TOOLTIP-->
        <template v-if="!hideTooltip && hoverIdx > -1">
          <vuestro-svg-tooltip :x="toolTipLocationX"
                               :x-max="width"
                               :y="toolTipLocationY"
                               :y-max="height"
                               :categoryField="categoryField"
                               :utc="utc"
                               :series="[localData[hoverIdx]]"
                               :values="localData[hoverIdx]"/>
        </template>
        <!--LEGEND-->
        <template v-for="(pieSection, index) in localData">
          <vuestro-svg-legend v-if="showLegend"
                              :pieSection="pieSection"
                              :x="pieX-pieY*1.6"
                              :y="18*(index+1)"
                              :key="index"/>
        </template>
      </svg>
    </div>
  </div>
</template>


<script>

/* global _ */
import * as d3 from 'd3';

export default {
  name: 'VuestroDonutChart',

  //essentially static data
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} },
  },

  //essentially dynamic data
  data() {
    return {
      width: 0, // derived width
      height: 0, // derived height
      centerX: 0, // derived center X
      centerY: 0, // derived center Y
      localData: [], // local copy of data
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      padding: 15, // percentage padding around the donut
      categoryField: 'key',
      valueField: 'value',
      valueTitle: 'Value',
      utc: false,
      hideTooltip: false,
      hoverIdx: -1,
      maxRadius: 0, // max radius without overflow
      toolTipLocationX: 0,
      toolTipLocationY: 0,
      showLegend: false,
      showLabels: false,
      fillOpacity: 0.6, // opacity for filled area
      strokeWidth: '2px', // svg stroke width
      donutTextRender: null,
      donutTextValue: null,
      donutRadius: 70, // percentage for donut hole (0 = pie chart)
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(this.colors);
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
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    // redraw if window changes
    resize() {
      if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
        this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
        this.centerX = this.width/2;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.centerY = this.height/2;
        this.maxRadius = Math.min(this.centerX, this.centerY) * (100 - this.padding) / 100.0;
        this.redraw();
      }
    },
    redraw() {
      this.localData = _.cloneDeep(this.data);
      // refresh donut center text
      this.donutValueRender();
      // get pie wedge angles from d3
      let arcGen = d3.pie().value((d) => { return d[this.valueField]; });
      let arcData = arcGen(this.localData);
      // Update values of pie chart
      for (let [di, d] of this.localData.entries()) {
        d.field = this.valueField; // alias for tooltip to pick up color too
        d.title = this.valueTitle; // alias for tooltip to pick up color too
        // generate svg path data (pie sections)
        d.arc = d3.arc()({
          startAngle: arcData[di]["startAngle"],
          endAngle: arcData[di]["endAngle"],
          innerRadius: this.maxRadius * this.donutRadius / 100.0,
          outerRadius: this.maxRadius,
        });
        d.color = this.color(d[this.valueField]);
        if (this.showLabels) {
          this.arcLabels(arcData, di, this.maxRadius * this.donutRadius / 100.0, d3.arc());
        }
      }
    },
    onMouseenter({ offsetX }) {
      this.toolTipLocationX = event.offsetX;
      this.toolTipLocationY = event.offsetY;
      // target arc
      let arc = event.target.attributes.d.nodeValue;
      // match target arc to localData item
      for (let [di, d] of this.localData.entries()) {
        if(d.arc === arc) {
          this.hoverIdx = di;
        }
      }
    },
    onMouseleave() {
      this.hoverIdx = -1;
    },
    arcLabels(data, index, innerRadius, arcGenerator) {
      // create label coordinates
      let labelData = arcGenerator.centroid({
        startAngle: data[index]["startAngle"],
        endAngle: data[index]["endAngle"],
        innerRadius: innerRadius,
        outerRadius: this.maxRadius,
      });
      // set label coordinates into local data
      this.localData[index]["label"] = labelData;
    },
    // try to execute render function, otherwise leave donutTextValue alone
    donutValueRender() {
      if (this.donutTextRender && typeof(this.donutTextRender) === 'function') {
        this.donutTextValue = this.donutTextRender();
      }
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-donut-text-font-size: 2em;
}

</style>

<style scoped>

.vuestro-donut-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-donut-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.donut-text {
  fill: var(--vuestro-text-color);
  font-size: var(--vuestro-donut-text-font-size);
}


</style>