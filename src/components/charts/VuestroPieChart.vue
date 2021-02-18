<template>
  <div class="vuestro-pie-chart" @mouseleave="onMouseleave">
    <div class="vuestro-pie-chart-inner">
      <svg id="Pie"
           :width="width"
           :height="height"
           :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
        <!--PIE WEDGES (all centered on pie center)-->
        <g v-for="d in localData"
           :key="d.id"
           :transform="`translate(${pieX},${pieY})`">
          <path :d="d.arc"
                :fill="d.color"
                @mouseenter="onMouseenter"/>
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
          <text v-if="donutRadius > 0"
                :x="pieX"
                :y="pieY"
                text-anchor="middle"
                fill="white">
            {{ donutTextValue }}
          </text>
        </g>

        <!--TOOLTIP-->
        <template v-if="!hideTooltip && hoverIdx > -1">
          <vuestro-svg-tooltip :x="toolTipLocationX"
                               :x-max="width"
                               :y="toolTipLocationY"
                               :y-max="height"
                               :categoryKey="categoryField"
                               :utc="utc"
                               :series="[localData[hoverIdx]]"
                               :values="localData[hoverIdx]"/>
        </template>
        <!--PIE LEGEND-->
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
  name: 'VuestroPieChart',

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
      pieX: 0, // derived center X
      pieY: 0, // derived center Y
      localData: [], // local copy of data
      colors: d3.schemeCategory10,
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      paddingPercent
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
      enableToolTip: false,
      donutTextRender: null,
      donutTextValue: null,
      donutRadius: 0,
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
        this.pieX = this.width/2;
        this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom;
        this.pieY = this.height/2;
        this.maxRadius = Math.min(this.pieX, this.pieY);

        this.redraw();
      }
    },
    // redraw componenet
    redraw() {
      this.localData = _.cloneDeep(this.data);
      // generate pie
      this.pieGenerate();
    },
    onMouseenter({ offsetX }) {
      //console.log(event.target);
      //console.log(event.target.attributes.d.nodeValue);
      this.toolTipLocationX = event.offsetX;
      this.toolTipLocationY = event.offsetY;
      // grab selected pie section
      let pieSection = event.target.attributes.d.nodeValue;
      // find the data item for the wedge under cursor
      for (let [di, d] of this.localData.entries()) {
        if(d.arc === pieSection) {
          this.hoverIdx = di;
        }
      }
    },
    onMouseleave() {
      this.hoverIdx = -1;
    },
    pieLabels(data, index, innerRadius, arcGenerator) {
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
    pieGenerate() {
      // see if donut is enabled
      if(this.donutRadius > 0) {
        this.donutValueRender();
      }
      // get pie wedge angles from d3
      let pieGen = d3.pie().value((d) => { return d[this.valueField]; });
      let pieData = pieGen(this.localData);
      // Update values of pie chart
      for (let [di, d] of this.localData.entries()) {
        d.field = this.valueField; // alias for tooltip to pick up color too
        d.title = this.valueTitle; // alias for tooltip to pick up color too
        // generate svg path data (pie sections)
        d.arc = d3.arc()({
          startAngle: pieData[di]["startAngle"],
          endAngle: pieData[di]["endAngle"],
          innerRadius: this.maxRadius * this.donutRadius / 100.0,
          outerRadius: this.maxRadius,
        });
        d.color = this.color(d[this.valueField]);
        if (this.showLabels) {
          this.pieLabels(pieData, di, this.maxRadius * this.donutRadius / 100.0, d3.arc());
        }
      }
    },
    donutValueRender() {
      if (typeof(this.donutTextRender) === 'function') {
        this.donutTextValue = this.donutTextRender();
      } else {
        this.donutTextValue = this.donutTextRender;
      }
    },
  },
};

</script>

<style scoped>

.vuestro-pie-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-pie-chart-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vuestro-pie-chart-pie {
  transition: all 0.4s ease-in-out;
}

.vuestro-pie-chart-cursor {
  stroke: var(--vuestro-outline);
  stroke-width: 1px;
  fill: none;
}

</style>