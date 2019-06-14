<template>
  <div class="vuestro-clean-kvp" :class="[ `vuestro-clean-kvp-${size}` ]">
    <span class="vuestro-clean-kvp-key">
      <slot name="key"></slot>
    </span>
    <span class="vuestro-clean-kvp-value">
      <slot name="value"></slot>
    </span>
  </div>
</template>

<script>

export default {
  name: 'VuestroCleanKvp',
  props: {
    size: { type: String, default: 'md' },
  },
};

</script>

<style scoped>

.vuestro-clean-kvp-sm .vuestro-clean-kvp-key {
  font-size: 12px;
  font-weight: 200;
}

.vuestro-clean-kvp-sm .vuestro-clean-kvp-value {
  font-size: 18px;
  font-weight: 400;
}

.vuestro-clean-kvp-md .vuestro-clean-kvp-key {
  font-size: 16px;
  font-weight: 200;
}

.vuestro-clean-kvp-md .vuestro-clean-kvp-value {
  font-size: 24px;
  font-weight: 400;
}

.vuestro-clean-kvp-lg .vuestro-clean-kvp-key {
  font-size: 18px;
  font-weight: 200;
}

.vuestro-clean-kvp-lg .vuestro-clean-kvp-value {
  font-size: 32px;
  font-weight: 400;
}

</style>