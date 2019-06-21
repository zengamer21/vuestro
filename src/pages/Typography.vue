<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-cyan)">
      <template #heading>Typography</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroCleanKvp</template>
      <template #description>A simple and clean way to display key value pairs; placing more emphasis on the important part, the value.</template>
      <vuestro-container column>
        <vuestro-clean-kvp>
          <template #key>name</template>
          <template #value>Vuestro Library</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>version</template>
          <template #value>v1.0.0</template>
        </vuestro-clean-kvp>
        <vuestro-clean-kvp>
          <template #key>date</template>
          <template #value>{{ (new Date).toISOString() }}</template>
        </vuestro-clean-kvp>
      </vuestro-container>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'Typography',

};

</script>

<style scoped>

</style>