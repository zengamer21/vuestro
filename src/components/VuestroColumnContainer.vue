<template>
  <div class="vuestro-column-container">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroColumnContainer',
};

</script>

<style scoped>

.column-container {
  display: flex;
  flex-grow: 1;
}

/* clear right padding for all but last (right-most) column */
.column-container > .column:not(:last-child) {
  padding-right: 0;
}

</style>