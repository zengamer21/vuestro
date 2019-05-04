<template>
  <div class="vuestro-panel"
       :class="[ gutter, { dark }]"
       :style="color ? { 'background-color': color }:{}">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroPanel',
  props: {
    dark: { type: Boolean, default: false },
    gutter: { type: String, default: 'md' },
    color: { type: String, default: null },
  },
};

</script>

<style scoped>

.vuestro-panel.lg {
  --gutter-size: 15px;
}
.vuestro-panel.md {
  --gutter-size: 4px;
}
.vuestro-panel.sm {
  --gutter-size: 2px;
}
.vuestro-panel.none {
  --gutter-size: 0px;
}

.vuestro-panel {
  background-color: var(--vuestro-panel-bg);
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  margin-top: var(--gutter-size);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* border only for dark ui */
.vuestro-panel.dark {
  background-color: var(--vuestro-panel-dark-bg);
  border: 1px solid var(--vuestro-outline);
}

.vuestro-panel .vuestro-tray:not(:last-child) {
  border-bottom: 1px solid var(--vuestro-outline);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

</style>