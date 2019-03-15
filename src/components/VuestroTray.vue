<template>
  <div class="vuestro-tray px-2 flex-flex">
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
  },
};

</script>

<style scoped>

.vuestro-tray {
  position: relative;
}

.vuestro-tray-title {
  flex-basis: 40px;
  margin-right: 10px;
}

.vuestro-tray > div:not(.vuestro-tray-title) {
  flex: 1 1 auto;
}

</style>