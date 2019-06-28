<template>
  <vuestro-panel stretch>
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

</style>