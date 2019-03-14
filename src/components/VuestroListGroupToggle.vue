<template>
  <div class="vuestro-list-group-label" @click="toggle">
    <vuestro-caret :collapsed="!expanded" left size="sm"></vuestro-caret>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>

import 'vue-awesome/icons/caret-right.js';
import 'vue-awesome/icons/caret-down.js';
import Icon from 'vue-awesome/components/Icon';

import VuestroCaret from './VuestroCaret.vue';

export default {
  name: 'ListGroupToggle',
  components: {
    VuestroCaret,
    Icon,
  },
  props: {
    title: { type: String, required: true },
    expanded: { type: Boolean, required: true },
  },
  methods: {
    toggle() {
      let newVal = !this.expanded;
      this.$emit('toggle', newVal);
    },
  },
};

</script>

<style scoped>

.vuestro-list-group-label {
  cursor: pointer;
  font-size: 12px;
  line-height: 13px;
  font-weight: 600;
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
}

.vuestro-list-group-label .title {
  align-self: center;
  user-select: none;
}

</style>