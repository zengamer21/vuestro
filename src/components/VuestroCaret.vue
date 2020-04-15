<template>
  <div class="vuestro-caret" :class="[size, { collapsed, left }]" @click="onClick">
    <vuestro-icon name="angle-down"></vuestro-icon>
  </div>
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
  --size: 22px;
}

.vuestro-caret.md {
  --size: 18px;
}

.vuestro-caret.sm {
  --size: 12px;
}

.vuestro-caret {
  width: var(--size);
  height: var(--size);
  align-self: center;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
}
.vuestro-caret.collapsed {
  transform: rotate(-90deg);
}
.vuestro-caret.collapsed.left {
  transform: rotate(90deg);
}
.vuestro-caret >>> svg {
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>