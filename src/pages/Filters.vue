<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-magenta)">
      <template #heading>Filters</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroCommas</template>
      <template #description>Render a number with comma thousands separators</template>
      {{ 3233322452 }} -> {{ 3233322452 | vuestroCommas }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroPhoneUS</template>
      <template #description>Render a string or number into US phone number format</template>
      {{ 3233322452 }} -> {{ 3233322452 | vuestroPhoneUS }}
    </vuestro-card>

    <vuestro-card>
      <template #subheading>vuestroHMS</template>
      <template #description>Render simple hours:minutes:seconds from a Date object</template>
      {{ testDate }} -> {{ testDate | vuestroHMS }}
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Filters',
  data() {
    return {
      testDate: new Date(),
    };
  },
};

</script>