<template>
  <span class="vuestro-title flex-flex flex-justify-content-between">
    <slot></slot>
    <icon name="spinner" pulse v-if="spinner"></icon>
  </span>
</template>

<script>

export default {
  name: 'VuestroTitle',
  props: {
    spinner: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-title {
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  pointer-events: none;
}

.vuestro-title .fa-icon {
  margin-right: 5px;
}

</style>