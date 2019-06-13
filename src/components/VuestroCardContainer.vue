<template>
  <div class="vuestro-card-container" :class="[gutter, { noWrap, flexShrink }]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroCardContainer',
  props: {
    gutter: { type: String, default: 'md' },
    noWrap: { type: Boolean, default: false },
    flexShrink: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-card-container {
  display: flex;
  flex: 1 0 auto; /* clear shrink since it triggers bugs in non-latest browsers */
  flex-wrap: wrap;
  align-content: flex-start;
  padding: var(--gutter-size);
}

.vuestro-card-container.lg {
  --gutter-size: 15px;
}
.vuestro-card-container.md {
  --gutter-size: 8px;
}
.vuestro-card-container.sm {
  --gutter-size: 4px;
}
.vuestro-card-container.none {
  --gutter-size: 0px;
}
.vuestro-card-container.noWrap {
  flex-wrap: nowrap;
}
.vuestro-card-container.flexShrink {
  flex-shrink: 1;
}
.vuestro-card-container > .vuestro-card {
  padding: var(--gutter-size);
}

</style>