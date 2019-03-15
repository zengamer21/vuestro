<template>
  <span class="vuestro-panel-toolbar-button" @click="click">
    <slot></slot>
  </span>
</template>

<script>

export default {
  name: 'VuestroPanelToolbarButton',
  methods: {
    click(e) {
      this.$emit('click', e);
    },
  },
};

</script>

<style scoped>

.vuestro-panel-toolbar-button {
  padding: 4px;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuestro-panel-toolbar-button:hover {
  background-color: var(--hover-highlight);
  border-color: var(--hover-highlight-border);
  color: var(--hover-text);
  border-radius: 50%;
}

</style>