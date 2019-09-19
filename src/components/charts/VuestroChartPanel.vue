<template>
  <vuestro-panel stretch class="vuestro-chart-panel" overflow-hidden>
    <template #title><span class="drag">{{ options.title }}</span></template>
    <component :is="options.component" :data="data" :options="options"></component>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'VuestroChartPanel',
  props: {
    data: { required: true },
    options: { type: Object, required: true },
  },
};

</script>

<style scoped>

.vuestro-chart-panel {
  overflow: hidden;
}

</style>