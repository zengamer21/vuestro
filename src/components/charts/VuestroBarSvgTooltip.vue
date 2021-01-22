<template>
  <g class="vuestro-bar-svg-tooltip">
	<!-- BACKGROUND -->
    <rect :width="tooltipWidth" :height="tooltipHeight" :rx="radius"></rect>
    <!-- TEXT -->    
    <text :x="padding/2" :y="padding" ref="text">
      <tspan dy=".6em">{{ toolData.key }}</tspan>      
      <template v-for="d in toolData.data">
            <tspan :key="d.id" :x="padding/2" dy="1.2em" :fill="d.color" :stroke="d.color" stroke-width="2">|</tspan>
            <tspan :key="d.id" >{{ d.title }}</tspan>
            <tspan :key="d.id" :x="tooltipWidth - padding/2" text-anchor="end">{{ d.value }}</tspan>          
      </template>
    </text>
  </g>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'VuestroBarSvgTooltip',
  props: {
    x: { type: Number, default: 0 },
    xMax: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    yMax: { type: Number, default: 0 },
    toolData: { type: Object },
    mouseX: { type: Number, default: 0 },
    mouseY: { type: Number, default: 0 },
    padding: { type: Number, default: 10 },
    radius: { type: Number, default: 2 },
  },
  data() {
    return {
      tooltipHeight: 0,
      tooltipWidth: 0,
    };
  },
  watch: {
    x() {
      this.update();
    },
    y() {
      this.update();
    },
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
        this.tooltipHeight = 0;
        this.tooltipWidth = 0;

        let width = this.$el.getBBox().width;
        let height = this.$el.getBBox().height;
        // size it
        let size = this.$refs.text.getBBox();
        //STRANGE BUG WHERE BOX KEEPS GROWING
        //console.log(this.$refs.text);
        //console.log(size);
        //console.log(this.tooltipWidth);
        this.tooltipHeight = size.height + this.padding;
        this.tooltipWidth = size.width + this.padding;        
        // move it
        d3.select(this.$el).attr("transform", `translate(${this.x}, ${this.y})`);
    }
  },
};

</script>

<style scoped>

.vuestro-bar-svg-tooltip > rect {
  fill: var(--vuestro-popup-bg);
  opacity: var(--vuestro-tooltip-opacity);
}

.vuestro-bar-svg-tooltip > text {
  fill: var(--vuestro-popup-fg);
}

</style>