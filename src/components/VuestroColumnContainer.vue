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

.vuestro-column-container {
  display: flex;
  flex-grow: 1;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
}

/* clear right padding for all but last (right-most) column */
.vuestro-column-container > .vuestro-column:not(:last-child) {
  padding-right: 0;
}

</style>