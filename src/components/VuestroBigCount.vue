<template>
  <vuestro-panel :color="color">
    <div class="vuestro-big-count-title">{{ title }}</div>
    <div class="vuestro-big-count-value">{{ data | vuestroCommas }}</div>
  </vuestro-panel>
</template>

<script>

/* globals _ */

export default {
  name: 'VuestroBigCount',
  props: {
    data: { type: Array, default: 0 },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      title: 'Default Title',
      color: 'var(--vuestro-primary)',
    };
  },
  beforeMount() {
    _.merge(this, this.options);
  },
};

</script>

<style scoped>

.vuestro-big-count-title {
  color: var(--vuestro-white);
  font-size: 24px;
  padding-top: 5px;
  padding-left: 8px;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.vuestro-big-count-value {
  color: var(--vuestro-white);
  text-align: right;
  padding-right: 15px;
  font-size: 36px;
}

</style>