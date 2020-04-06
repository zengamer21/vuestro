<template>
  <vuestro-container>
    <vuestro-card color="#f47633">
      <template #heading>VuestroDynamicTable</template>
      <template #description>
        VuestroDynamicTable is a fully-reactive component which provides advanced datatable functionality with a focus on allowing navigation through complex documents.
      </template>

      <vuestro-panel>
        <template #title>Dynamic Table Example</template>
        <vuestro-dynamic-table :data="exampleData"></vuestro-dynamic-table>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      exampleOptions: {
      },
      exampleData: require('@/assets/example.json'),
    };
  },
};

</script>

<style scoped>

</style>