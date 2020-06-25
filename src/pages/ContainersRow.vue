<template>
  <vuestro-container class="outlines" column no-wrap>

    <vuestro-card cols="3">
      <template #heading>VuestroCard - cols="3"</template>
      <template #description>
        <span>
          Set the <strong>no-wrap</strong> and <strong>column</strong> properties on the container to make cards take up the full height, useful for dividing your layout into rows.
        </span>
      </template>
    </vuestro-card>
    <vuestro-card cols="9">
      <template #description>The layout will stretch to contain the content while keeping full height with small content.</template>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'ContainersRow',
};

</script>

<style scoped>

.vuestro-container.outlines {
  border: 1px dashed black;
  position: relative;
}
.vuestro-container.outlines .vuestro-card {
  border: 1px dashed black;
}

</style>