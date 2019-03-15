<template>
  <div class="vuestro-column" :class="[gutter, `width-${cols}`]">
    <!--SLOT FOR HEADER TEXT (only show if "heading" slot was provided)-->
    <span v-if="$slots.heading" class="heading">
      <slot name="heading"></slot>
    </span>
    <!--DEFAULT SLOT-->
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroColumn',
  props: {
    cols: { default: 12 },
    gutter: { type: String, default: 'md' },
  },
};

</script>

<style scoped>

.vuestro-column.lg {
  --gutter-size: 15px;
}
.vuestro-column.md {
  --gutter-size: 8px;
}
.vuestro-column.sm {
  --gutter-size: 4px;
}

.vuestro-column {
  display: flex;
  flex-direction: column;
  padding-left: var(--gutter-size);
  padding-right: var(--gutter-size);
}

.vuestro-column > .heading {
  font-size: 22px;
  line-height: 22px;
  font-weight: 300;
  padding-left: 6px;
  padding-top: 2px;
  border-left: 4px solid var(--text-color);
  margin-bottom: 10px;
}

.vuestro-column > div {
  margin-top: var(--gutter-size);
}

.vuestro-column > div:last-child {
  margin-bottom: var(--gutter-size);
}

.vuestro-column.width-1 {
  flex: 0 0 8.33%;
  max-width: 16.67%;
}
.vuestro-column.width-2 {
  flex: 0 0 16.67%;
  max-width: 16.67%;
}
.vuestro-column.width-3 {
  flex: 0 0 25%;
  max-width: 25%;
}
.vuestro-column.width-4 {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}
.vuestro-column.width-5 {
  flex: 0 0 41.67%;
  max-width: 41.67%;
}
.vuestro-column.width-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
.vuestro-column.width-7 {
  flex: 0 0 58.33%;
  max-width: 58.33%;
}
.vuestro-column.width-8 {
  flex: 0 0 66.67%;
  max-width: 66.67%;
}
.vuestro-column.width-9 {
  flex: 0 0 75%;
  max-width: 75%;
}
.vuestro-column.width-10 {
  flex: 0 0 83.33%;
  max-width: 83.33%;
}
.vuestro-column.width-11 {
  flex: 0 0 91.67%;
  max-width: 91.67%;
}
.vuestro-column.width-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

</style>