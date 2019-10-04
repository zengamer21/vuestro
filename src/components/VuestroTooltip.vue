<template>
  <div class="vuestro-tooltip"
       :class="[ position, { active, rounded }]"
       @mouseover="active=true"
       @mouseleave="active=false">
    <slot></slot>
    <div ref="content"
         class="vuestro-tooltip-content"
         :class="{ noWrap }"
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
            bottom: 'calc(100% + 8px)',
            left: `calc(50% + ${this.offsetX}px)`,
            transform: 'translateX(-50%)'
          };
        case 'left':
          return {
            right: 'calc(100% + 8px)',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        case 'right':
          return {
            left: 'calc(100% + 8px)',
            top: '50%',
            transform: 'translateY(-50%)',
          };
        case 'bottom':
          return {
            top: 'calc(100% + 8px)',
            left: `calc(50% + ${this.offsetX}px)`,
            transform: 'translateX(-50%)',
          };
      }
    },
  },
  mounted() {
    let bcr = this.$refs.content.getBoundingClientRect();
    // see if menu would go offscreen so we can flip it to right justified
    if (bcr.right > window.innerWidth) {
      this.offsetX =  window.innerWidth - this.$refs.content.getBoundingClientRect().right;
    }
    // add offset if tooltip is too close to edge based on the local offsetLeft value
    if (this.$el.offsetLeft < this.$refs.content.clientWidth / 2) {
      this.offsetX = this.$refs.content.clientWidth / 2 - this.$el.offsetLeft;
    }
  },
  methods: {

  },
};

</script>

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
  border: 1px solid var(--vuestro-dropdown-outline);
  padding: 2px;
  z-index: 999;
}
.vuestro-tooltip.rounded .vuestro-tooltip-content {
  border-radius: 4px;
}
.vuestro-tooltip-content.noWrap {
  white-space: nowrap;
}

/* render arrow */
.vuestro-tooltip.active.top::after {
  content: " ";
  position: absolute;
  bottom: calc(100% - 10px);
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: var(--vuestro-dropdown-content-bg) transparent transparent transparent;
}

.vuestro-tooltip.active.left::after {
  content: " ";
  position: absolute;
  right: calc(100% - 10px);
  top: 50%;
  margin-top: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent transparent var(--vuestro-dropdown-content-bg);
}

.vuestro-tooltip.active.bottom::after {
  content: " ";
  position: absolute;
  top: calc(100% - 10px);
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--vuestro-dropdown-content-bg) transparent;
}

.vuestro-tooltip.active.right::after {
  content: " ";
  position: absolute;
  left: calc(100% - 10px);
  top: 50%;
  margin-top: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent var(--vuestro-dropdown-content-bg) transparent transparent;
}

</style>