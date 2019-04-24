<template>
  <vuestro-panel :color="color">
    <div class="vuestro-big-count-title">{{ title }}</div>
    <div class="vuestro-big-count-value">{{ value }}</div>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'VuestroBigCount',
  props: {
    title: { type: String, required: true },
    value: { type: String, required: true },
    color: { type: String },
  },
};

</script>

<style scoped>

</style>