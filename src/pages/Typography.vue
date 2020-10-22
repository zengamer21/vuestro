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

    <vuestro-card>
      <template #subheading>Async Text</template>
      <template #description>
        <span>Simple spinner that shows for a text field that evaluates to null or undefined.</span>
      </template>
      <vuestro-container>
        <vuestro-async-text :value="asyncText"></vuestro-async-text>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Icons</template>
      <vuestro-icon variant="danger" name="tractor"></vuestro-icon>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'Typography',
  data() {
    return {
      asyncText: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.asyncText = 'I was loaded asynchronously!';
    }, 2000);
  }
};

</script>

<style scoped>

</style>