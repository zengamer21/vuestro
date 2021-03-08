<template>
  <vuestro-container class="outlines" column no-wrap>
    <vuestro-card cols="3" shrink>
      <template #heading>
        <span>
          VuestroCard - <vuestro-code>cols="3"</vuestro-code>
        </span>
      </template>
      <template #description>
        <span>
          Set the <vuestro-code>no-wrap</vuestro-code> and <vuestro-code>column</vuestro-code> properties on the container to make cards take up the full height, useful for dividing your layout into rows. Make sure to add the <vuestro-code>shrink</vuestro-code> property to the VuestroCards.
        </span>
      </template>
    </vuestro-card>
    <vuestro-card cols="9"  shrink>
      <template #description>
        <span>
          <vuestro-code>cols="9"</vuestro-code> The layout will stretch to contain the content while keeping full height with small content.
        </span>
      </template>
      <p> Make sure to add the <vuestro-code>shrink</vuestro-code> property to the VuestroCards.</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
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
  border: 1px dashed var(--vuestro-outline);
}
.vuestro-container.outlines .vuestro-card {
  border: 1px dashed var(--vuestro-outline);
}

</style>