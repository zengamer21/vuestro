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
      <!--<vuestro-spinner></vuestro-spinner>-->
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsSpinner',
  data() {
    return {
      numericValue: 3,
    };
  },
};

</script>