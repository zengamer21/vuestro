<template>
  <span class="vuestro-code"><slot></slot></span>
</template>

<script>

export default {
  name: 'VuestroCode',
};

</script>

<style>

.vuestro-app {
  --vuestro-code-font-family: monospace;
}

</style>

<style scoped>

.vuestro-code {
  font-family: var(--vuestro-code-font-family);
  border: 1px dashed var(--vuestro-outline);
  padding: 0 0.4em;
  border-radius: var(--vuestro-selection-border-radius);
  background-color: var(--vuestro-field-bg);
  box-shadow: inset 0 0 0.2em var(--vuestro-gray-dark);
}

</style>