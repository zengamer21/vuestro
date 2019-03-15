<template>
  <panel>
    <!--TOOLBAR-->
    <div class="vuestro-panel-toolbar">
      <sub-title class="title">
        <slot name="title"></slot>
      </sub-title>
      <span class="vuestro-toolbar">
        <slot name="toolbar"></slot>
      </span>
    </div>
    <!--MAIN CONTENT-->
    <slot></slot>
  </panel>
</template>

<script>

import VuestroPanel from './VuestroPanel.vue';
import VuestroTitle from './VuestroTitle.vue';

export default {
  name: 'VuestroPanelToolbar',
  components: {
    VuestroPanel,
    VuestroTitle,
  },
};

</script>

<style scoped>

.vuestro-panel-toolbar {
  padding: 4px 4px 4px 8px;
  color: var(--panel-toolbar-text);
  background-color: var(--panel-toolbar);
  display: flex;
}

.title {
  flex-grow: 1;
  align-self: center;
}

.vuestro-toolbar {
  display: flex;
  align-items: center;
  z-index: 200;
}

</style>