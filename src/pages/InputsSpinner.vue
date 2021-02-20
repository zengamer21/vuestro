<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Input Spinner</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Number Spinner
      </template>
      <vuestro-container>
        <vuestro-spinner v-model="numericValue"></vuestro-spinner>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Number Spinner with custom render function
      </template>
      <vuestro-container>
        <vuestro-spinner v-model="largeNumber" step="100" :render="renderer"></vuestro-spinner>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Number Spinner with placeholder slot
      </template>
      <vuestro-container>
        <vuestro-spinner v-model="numericValue">
          <template #placeholder>Retries</template>
        </vuestro-spinner>
      </vuestro-container>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsSpinner',
  data() {
    return {
      numericValue: 3,
      largeNumber: 1234,
    };
  },
  methods: {
    renderer(d) {
      return Vue.filter('vuestroHumanNum')(d);
    },
  }
};

</script>