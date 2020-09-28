<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Multi Select</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>

      </template>
      <vuestro-multi-select placeholder="Select...">
        <template #title>Choices</template>
      </vuestro-multi-select>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsSpinner',
  data() {
    return {
      exampleOptions: [
      ],
      exampleValue: [],
    };
  },
};

</script>