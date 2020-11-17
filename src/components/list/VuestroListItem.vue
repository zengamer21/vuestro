<template>
  <div class="vuestro-list-item" :class="{ selected }">
    <div class="vuestro-list-item-text" @click="$emit('click')">
      <div class="vuestro-list-item-title">
        <slot name="title"></slot>
      </div>
      <div v-if="$slots.description" class="vuestro-list-item-description">
        <slot name="description"></slot>
      </div>
    </div>
    <div class="vuestro-list-item-buttons">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroListItem',
  props: {
    selected: { type: Boolean, default: false },
  },
};

</script>

<style>
.vuestro-app {
  --vuestro-list-item-selected-bg: var(--vuestro-selection);
  --vuestro-list-item-alt-bg: var(--vuestro-light);
  --vuestro-list-item-padding: 0.3em 0.4em;
}
.vuestro-dark.vuestro-app {
  --vuestro-list-item-alt-bg: var(--vuestro-gray-dark);
}

</style>

<style scoped>

.vuestro-list-item {
  display: flex;
}
.vuestro-list-item-text {
  cursor: pointer;
  flex-grow: 1;
  padding: var(--vuestro-list-item-padding);
}
.vuestro-list-item-title {
  font-size: 1.2em;
  font-weight: 400;
}
.vuestro-list-item-description {
  font-size: 0.9em;
}

.vuestro-list-item:nth-child(even) {
  background-color: var(--vuestro-list-item-alt-bg);
}
.vuestro-list-item.selected {
  background-color: var(--vuestro-list-item-selected-bg);
}

.vuestro-list-item-buttons {
  margin-left: auto;
  margin-right: 0.2em;
  --vuestro-control-margin-v: 0.2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>