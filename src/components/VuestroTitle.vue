<template>
  <span class="vuestro-title"
        :class="{ 'vuestro-title-clickable': clickable,
                  'vuestro-title-draggable': draggable }"
        @click="onClick">
    <slot></slot>
    <vuestro-icon name="spinner" pulse v-if="spinner"></vuestro-icon>
  </span>
</template>

<script>

export default {
  name: 'VuestroTitle',
  props: {
    spinner: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      if (this.clickable) {
        this.$emit('click', e);
      }
    }
  }
};

</script>

<style>
.vuestro-app {
  --vuestro-title-font-size: 13px;
  --vuestro-title-font-weight: 600;
  --vuestro-title-text-transform: uppercase;
}

.vuestro-app.mobile {
  --vuestro-title-font-size: 32px;
}
</style>

<style scoped>

.vuestro-title {
  font-size: var(--vuestro-title-font-size);
  font-weight: var(--vuestro-title-font-weight);
  pointer-events: none;
  display: flex;
  align-items: center;
  text-transform: var(--vuestro-title-text-transform);
}
.vuestro-title-clickable {
  pointer-events: initial;
  cursor: pointer;
}

.vuestro-title-draggable {
  pointer-events: initial;
  cursor: move;
}

.vuestro-title svg {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  margin-right: 5px;
}

</style>