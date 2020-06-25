<template>
  <vuestro-container class="outlines" no-wrap>
    <vuestro-card cols="3">
      <template #heading>VuestroCard - cols="3"</template>
      <template #description>
        <span>
          Set the <strong>no-wrap</strong> property on the container to make cards full height, useful for dividing your layout into columns.
        </span>
      </template>
    </vuestro-card>
    <vuestro-card cols="9" color="var(--vuestro-green)">
      <template #description>The layout will stretch to contain the content without breaking the column layout.</template>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'CardContainer',
};

</script>

<style scoped>

.vuestro-container.outlines {
  border: 1px dashed black;
  position: relative;
}

.vuestro-container.outlines .vuestro-card {
  border: 1px dashed black;
  position: relative;
}

</style>