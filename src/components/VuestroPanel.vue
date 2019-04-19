<template>
  <div class="vuestro-panel" :class="[ gutter, { dark }]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroPanel',
  props: {
    dark: { type: Boolean, default: false },
    gutter: { type: String, default: 'md' },
  },
};

</script>

<style scoped>

.vuestro-panel.lg {
  --gutter-size: 15px;
}
.vuestro-panel.md {
  --gutter-size: 8px;
}
.vuestro-panel.sm {
  --gutter-size: 4px;
}
.vuestro-panel.none {
  --gutter-size: 0px;
}

.vuestro-panel {
  background-color: var(--panel-background);
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  margin-top: var(--gutter-size);
}

/* border only for dark ui */
.vuestro-panel.dark {
  border: 1px solid var(--panel-border);
}

.vuestro-panel .vuestro-tray:not(:last-child) {
  border-bottom: 2px solid var(--light);
}

</style>