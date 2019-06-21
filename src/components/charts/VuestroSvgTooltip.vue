<template>
  <g class="vuestro-svg-tooltip">
		<rect :width="tooltipWidth" :height="tooltipHeight" :rx="radius"></rect>
    <text :x="padding/2" :y="padding" ref="text">
      <tspan dy=".6em">{{ renderCategory(values[categoryKey]) }}</tspan>
      <template v-for="s in series">
        <tspan :x="padding/2" dy="1.2em" :fill="s.color" :stroke="s.color" stroke-width="2">|</tspan>
        <tspan>{{ s.title || s.field }}</tspan><tspan :x="tooltipWidth - padding/2" text-anchor="end">{{ values[s.field] | filterProxy(s.render, values) }}</tspan>
      </template>
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
    series: { type: Array, required: true },
    values: { type: null },
    padding: { type: Number, default: 10 },
    radius: { type: Number, default: 2 },
    utc: { type: Boolean, default: false },
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
      // x
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
			// y
			let height = this.$el.getBBox().height;
			let newY = 0;
			if (this.y + height > this.yMax) {
				// clamp maximum x
				newY = this.yMax - height;
			} else {
				newY = this.y - height/2;
				// clamp minimum
				if (newY < 0) {
					newY = 0;
				}
			}
			// size it
			let size = this.$refs.text.getBBox();
			this.tooltipHeight = size.height + this.padding;
			this.tooltipWidth = size.width + this.padding;
			// move it
      d3.select(this.$el).attr("transform", `translate(${newX}, ${newY})`);
    },
    renderCategory(d) {
      if (d instanceof Date) {
        if (this.utc) {
          return d.toISOString();
        } else {
          return d.toLocaleString();
        }
      }
      return d;
    },
  },
  filters: {
    filterProxy(value, renderer, row) {
      if (renderer) {
        return renderer(value, row);
      } else {
        return value;
      }
    }
  },
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