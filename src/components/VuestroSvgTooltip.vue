<template>
  <g class="vuestro-svg-tooltip">
		<rect :width="tooltipWidth" :height="tooltipHeight" :rx="radius"></rect>
    <text :x="padding/2" :y="padding/2" ref="text">
      <tspan dy=".6em">{{ values[categoryKey] }}</tspan>
      <tspan :x="padding/2" dy="1.2em" v-for="v in valueKeys">
        {{ v }}: {{ values[v] }}
      </tspan>
    </text>
  </g>
</template>

<script>

import * as d3 from 'd3';

export default {
  name: 'VuestroSvgTooltip',
  props: {
    x: { type: Number, default: 0 },
    xMax: { type: Number },
    y: { type: Number, default: 0 },
    yMax: { type: Number },
    categoryKey: { type: String, required: true },
    valueKeys: { type: Array, required: true },
    values: { type: null },
    padding: { type: Number, default: 10 },
    radius: { type: Number, default: 4 },
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
      let width = this.$el.getBBox().width;
			let newX = 0;
			if (this.x + width > this.xMax) {
				// clamp maximum x
				newX = this.xMax - width;
			} else {
				newX = this.x - width/2;
				// clamp minimum
				if (newX < 0) {
					newX = 0;
				}
			}
			// size it
			let size = this.$refs.text.getBBox();
			this.tooltipHeight = size.height + this.padding/2;
			this.tooltipWidth = size.width + this.padding/2;
			// move it
      d3.select(this.$el).attr("transform", `translate(${newX}, 10)`);
    },
  }
};

</script>

<style scoped>

.vuestro-svg-tooltip > rect {
  fill: var(--vuestro-popup-bg);
}

.vuestro-svg-tooltip > text {
  fill: var(--vuestro-popup-fg);
}

</style>