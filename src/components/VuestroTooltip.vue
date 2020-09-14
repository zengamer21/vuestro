<template>
  <div class="vuestro-tooltip"
       :class="[ position, { active, rounded }]"
       @mouseover="onMouseOver"
       @mouseleave="active=false">
    <slot></slot>
    <div ref="content"
         class="vuestro-tooltip-content"
         :class="{ noWrap, noPadding }"
         :style="[style, { 'min-width': `${minWidth}px`, visibility: active ? 'visible':'hidden', opacity: active ? '1':'0' }]">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroTooltip',
  props: {
    position: { type: String, default: 'top' },
    rounded: { type: Boolean, default: false },
    minWidth: { type: null, default: 10 },
    noWrap: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
  data() {
    return {
      active: false,
      offsetX: 0,
      offsetY: 0,
    };
  },
  computed: {
    style() {
      switch(this.position) {
        case 'top':
          return {
            bottom: 'calc(100% + var(--vuestro-tooltip-arrow-size))',
            left: `calc(50% + ${this.offsetX}px)`,
            transform: 'translateX(-50%)'
          };
        case 'left':
          return {
            right: 'calc(100% + var(--vuestro-tooltip-arrow-size))',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        case 'right':
          return {
            left: 'calc(100% + var(--vuestro-tooltip-arrow-size))',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        case 'bottom':
          return {
            top: 'calc(100% + var(--vuestro-tooltip-arrow-size))',
            left: `calc(50% + ${this.offsetX}px)`,
            transform: 'translateX(-50%)',
          };
      }
    },
  },
  mounted() {
    let bcr = this.$refs.content.getBoundingClientRect();
    // handle right edge
    if (bcr.right > window.innerWidth) {
      this.offsetX =  window.innerWidth - this.$refs.content.getBoundingClientRect().right;
    }
    // handle left edge
    if (this.$el.offsetLeft < this.$refs.content.clientWidth / 2) {
      this.offsetX = this.$refs.content.clientWidth / 2 - this.$el.offsetLeft;
    }
  },
  methods: {
    onMouseOver() {
      this.active = true;
      return true;
    }
  },
};

</script>

<style>
/* override these css vars to set style */
.vuestro-app {
  --vuestro-tooltip-arrow-size: 10px;
}

.vuestro-app.mobile {
  --vuestro-tooltip-arrow-size: 20px;
}

</style>

<style scoped>

.vuestro-tooltip {
  display: flex;
  align-self: center;
  position: relative;
}

.vuestro-tooltip-content {
  position: absolute;
  background: var(--vuestro-dropdown-content-bg);
  color: var(--vuestro-dropdown-content-fg);
  border: var(--vuestro-rounded-border-width) solid var(--vuestro-dropdown-outline);
  padding: 0.5em;
  z-index: 3000;
}
.vuestro-tooltip-content.noPadding {
  padding: 0;
}
.vuestro-tooltip-content.noWrap {
  white-space: nowrap;
}
.vuestro-tooltip.rounded .vuestro-tooltip-content {
  border-radius: var(--vuestro-rounded-border-radius);
}

/* render arrow */
.vuestro-tooltip.active.top::after {
  content: " ";
  position: absolute;
  bottom: 100%;
  left: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-left: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-top: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
}
.vuestro-dark .vuestro-tooltip.active.top::after {
  border-top: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.left::after {
  content: " ";
  position: absolute;
  right: 100%;
  top: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-top: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-left: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
}
.vuestro-dark .vuestro-tooltip.active.left::after {
  border-left: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.bottom::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-left: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
}
.vuestro-dark .vuestro-tooltip.active.bottom::after {
  border-bottom: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}

.vuestro-tooltip.active.right::after {
  content: " ";
  position: absolute;
  left: 100%;
  top: calc(50% - var(--vuestro-tooltip-arrow-size));
  border-top: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-bottom: var(--vuestro-tooltip-arrow-size) solid transparent;
  border-right: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-dropdown-content-bg);
}
.vuestro-dark .vuestro-tooltip.active.right::after {
  border-right: var(--vuestro-tooltip-arrow-size) solid var(--vuestro-outline);
}


</style>