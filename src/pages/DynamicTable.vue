<template>
  <vuestro-container>
    <vuestro-card color="#f47633">
      <template #heading>VuestroDynamicTable</template>
      <template #description>
        VuestroDynamicTable is a fully-reactive component which provides advanced datatable functionality with a focus on allowing navigation through complex documents.
      </template>

      <vuestro-panel>
        <template #title>Dynamic Table Example</template>
        <vuestro-dynamic-table :options="exampleOptions"
                               :data="exampleData"
                               @change="onChange">
        </vuestro-dynamic-table>
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
        columns: [
          'firstName',
          'lastName',
          'ipAddress',
          'carMake',
          'carModel',
        ]
      },
      exampleData: require('@/assets/example.json'),
    };
  },
  methods: {
    onChange(c) {
      this.exampleOptions.columns = c;
    },
  },
};

</script>

<style scoped>

</style>