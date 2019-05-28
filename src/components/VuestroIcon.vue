<template>
  <icon :name="name"></icon>
</template>

<script>

export default {
  name: 'VuestroIcon',
  props: {
    name: { type: String, required: true },
  },
};

</script>

<style scoped>

</style>
