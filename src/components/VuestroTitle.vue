<template>
  <span class="vuestro-title">
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
  },
};

</script>

<style scoped>

.vuestro-title {
  font-size: 13px;
  font-weight: 500;
  pointer-events: none;
  display: flex;
  align-items: center;
}

.vuestro-title svg {
  width: 12px;
  height: 12px;
  margin-left: 5px;
  margin-right: 5px;
}

</style>