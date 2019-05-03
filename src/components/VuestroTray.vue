<template>
  <div class="vuestro-tray" :class="{ noBorder }">
    <vuestro-title class="vuestro-tray-title flex-align-self-center">{{ title }}</vuestro-title>
    <slot></slot>
  </div>
</template>

<script>

import VuestroTitle from './VuestroTitle.vue';

export default {
  name: 'VuestroTray',
  components: {
    VuestroTitle,
  },
  props: {
    title: { type: String, required: true },
    noBorder: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-tray {
  display: flex;
  position: relative;
  padding: 2px 10px;
  border: 1px solid var(--vuestro-outline);
  border-radius: 4px;
}
.vuestro-tray.noBorder {
  border: none;
}

.vuestro-tray-title {
  margin-right: 10px;
  align-self: center;
}

</style>