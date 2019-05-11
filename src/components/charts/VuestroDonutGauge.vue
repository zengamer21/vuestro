<template>
  <div class="vuestro-donut">
    <div class="wrapper" ref="wrapper">
      <svg v-if="radius > 0" :style="style" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle class="vuestro-donut-circle"
                  :r="radius"
                  :cy="radius*1.5"
                  :cx="radius*1.5"
                  :stroke-width="width"
                  :stroke-dasharray="dashVal"
                  stroke="#6fdb6f"
                  fill="none"/>
          <text text-anchor="middle"
                dominant-baseline="middle"
                :font-size="radius/2"
                :y="radius*1.5"
                :x="radius*1.5">
            {{ title }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroDonut',
  props: {
    title: { type: String, default: '' },
    percentage: { type: Number, default: 0 },
    width: { type: Number, default: 6 },
  },
  data() {
    return {
      radius: 0
    };
  },
  created() {
    window.addEventListener('resize', this.resize);
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  computed: {
    style() {
      return {
        width: this.radius*3,
        height: this.radius*3,
        '--percent': (100 - this.percentage) / 100.0 * this.dashVal,
      };
    },
    dashVal() {
      return this.radius*2*Math.PI;
    },
  },
  mounted() {
    this.resize();
  },
  methods: {
    resize() {
      this.radius = Math.min(this.$refs.wrapper.clientHeight, this.$refs.wrapper.clientWidth) / 3;
    },
  },
};

</script>

<style scoped>

.vuestro-donut {
  position: relative;
  flex-grow: 1;
  --percent: 0;
}

.vuestro-donut .wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
}

.vuestro-donut-circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 1s;
  stroke-dashoffset: var(--percent)
}


</style>