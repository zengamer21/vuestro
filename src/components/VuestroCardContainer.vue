<template>
  <div class="vuestro-card-container" :class="[gutter]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroCardContainer',
  props: {
    gutter: { type: String, default: 'md' },
  },
};

</script>

<style scoped>

.vuestro-card-container {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  padding-left: var(--gutter-size);
  padding-right: var(--gutter-size);
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

.vuestro-card-container > .vuestro-card {
  padding: var(--gutter-size);
}

.vuestro-card-container >>> .vuestro-card-heading {
  margin-bottom: var(--gutter-size);
}


</style>