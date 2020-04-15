<template>
  <div class="vuestro-container" :class="{ noWrap, noGrow }">
    <div class="vuestro-container-inner" :class="[gutter, { column, noWrap, noShrink, spaceBetween, spaceEvenly, center, middle }]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroContainer',
  props: {
    gutter: { type: String, default: 'md' },
    column: { type: Boolean, default: false },
    noWrap: { type: Boolean, default: false },
    noGrow: { type: Boolean, default: false },
    noShrink: { type: Boolean, default: false }, // for compatibility
    spaceBetween: { type: Boolean, default: false },
    spaceEvenly: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    middle: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-container {
  display: flex;
  flex: 1 0 auto;
}
.vuestro-container.noGrow {
  flex-grow: 0;
}

.vuestro-container-inner.lg {
  --vuestro-gutter: 15px;
}
.vuestro-container-inner.md {
  --vuestro-gutter: 8px;
}
.vuestro-container-inner.sm {
  --vuestro-gutter: 4px;
}
.vuestro-container-inner.none {
  --vuestro-gutter: 0px;
}

.vuestro-container-inner {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  flex-direction: row;
  padding: var(--vuestro-gutter);
  align-content: flex-start;
  justify-content: flex-start;
}
.vuestro-container-inner.column {
  flex-direction: column;
}
.vuestro-container-inner.noWrap {
  flex-wrap: nowrap;
}
.vuestro-container-inner.noShrink {
  flex-shrink: 0;
}
.vuestro-container-inner.spaceBetween {
  justify-content: space-between;
}
.vuestro-container-inner.spaceEvenly {
  justify-content: space-evenly;
}
.vuestro-container-inner.center {
  justify-content: center;
}
.vuestro-container-inner.middle {
  align-items: center;
}

</style>