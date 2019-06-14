<template>
  <div class="vuestro-container" :class="[gutter, { column, noWrap, shrink, spaceBetween, spaceEvenly, center, middle }]">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroContainer',
  props: {
    gutter: { type: String, default: 'md' },
    column: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    shrink: { type: Boolean, default: false },
    spaceBetween: { type: Boolean, default: false },
    spaceEvenly: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    middle: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-container.lg {
  --vuestro-gutter: 15px;
}
.vuestro-container.md {
  --vuestro-gutter: 8px;
}
.vuestro-container.sm {
  --vuestro-gutter: 4px;
}
.vuestro-container.none {
  --vuestro-gutter: 0px;
}

.vuestro-container {
  display: flex;
  flex: 1 0 auto; /* clear shrink and make it an option since it triggers bugs in non-latest browsers */
  flex-wrap: wrap;
  flex-direction: row;
  padding: var(--vuestro-gutter);
  align-content: flex-start;
  justify-content: flex-start;
}
.vuestro-container.column {
  flex-direction: column;
}
.vuestro-container.noWrap {
  flex-wrap: nowrap;
}
.vuestro-container.shrink {
  flex-shrink: 1;
}
.vuestro-container.spaceBetween {
  justify-content: space-between;
}
.vuestro-container.spaceEvenly {
  justify-content: space-evenly;
}
.vuestro-container.center {
  justify-content: center;
}
.vuestro-container.middle {
  align-items: center;
}

</style>