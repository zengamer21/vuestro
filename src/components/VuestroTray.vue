<template>
  <div class="vuestro-tray"
       :class="[`vuestro-tray-${variant}`, { noBorder }]">
    <div v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <vuestro-title v-else-if="title" class="vuestro-tray-title flex-align-self-center">{{ title }}</vuestro-title>
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
    title: { type: String, required: false },
    noBorder: { type: Boolean, default: false },
    variant: { type: String, default: 'regular' },
  },
};

</script>

<style scoped>

.vuestro-tray {
  display: flex;
  position: relative;
  padding: 2px;
  border: 1px solid var(--vuestro-outline);
  border-radius: 4px;
  margin-bottom: 2px;
}

.vuestro-tray-outline {
  border: 1px solid var(--vuestro-outline);
  border-radius: 4px;
}
.vuestro-tray-regular {
  border-bottom: 1px solid var(--vuestro-outline);
}

.vuestro-tray-shaded {
  border: none;
  background-color: var(--vuestro-light-med);
}
.vuestro-tray-shaded.dark {
  background-color: var(--vuestro-darker);
}

.vuestro-tray-title {
  margin-right: 10px;
  align-self: center;
}

</style>