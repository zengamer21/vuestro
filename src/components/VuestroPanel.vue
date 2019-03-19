<template>
  <div class="vuestro-panel" :class="{ dark }">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroPanel',
  props: {
    dark: { type: Boolean, default: false },
  },
};
  
</script>

<style scoped>

.vuestro-panel {
  background-color: var(--panel-background);
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
}

/* border only for dark ui */
.vuestro-panel.dark {
  border: 1px solid var(--panel-border);
}

.vuestro-panel .vuestro-tray:not(:last-child) {
  border-bottom: 2px solid var(--light);
}

</style>