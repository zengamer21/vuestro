<template>
  <span class="vuestro-title"
        :class="{ 'vuestro-title-clickable': clickable }"
        @click="onClick">
    <slot></slot>
    <icon name="spinner" pulse v-if="spinner"></icon>
  </span>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroTitle',
  components: {
    Icon,
  },
  props: {
    spinner: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
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

.vuestro-title svg {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  margin-right: 5px;
}

</style>