<template>
  <span class="vuestro-caret" :class="[size, { collapsed, left }]" @click="onClick"></span>
</template>

<script>

export default {
  name: 'VuestroCaret',
  props: {
    collapsed: { type: Boolean, required: true },
    size: { type: String, default: 'md' },
    left: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
};

</script>

<style scoped>

.vuestro-caret.lg {
  --size: 8px;
}

.vuestro-caret.md {
  --size: 7px;
}

.vuestro-caret.sm {
  --size: 6px;
}

.vuestro-caret {
  align-self: center;
  cursor: pointer;
  width: 0;
  height: 0;
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid var(--vuestro-text-color);
  transition: transform 0.2s;
  margin: 2px;
}

.vuestro-caret.collapsed {
  transform: rotate(90deg);
}

.vuestro-caret.collapsed.left {
  transform: rotate(-90deg);
}

</style>