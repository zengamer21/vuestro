<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-yellow">
      <template #heading>Mixins</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroDownloadAsJson(data, filename)</template>
      <template #description>Mixin will stringify the given data object as JSON and initiate a browser download with the given filename.</template>
      <vuestro-container>
        <vuestro-button @click="vuestroDownloadAsJson({test:1}, 'test.json')">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
      </vuestro-container>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'PluginMixins',

};

</script>

<style scoped>
</style>