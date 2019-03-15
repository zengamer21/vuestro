<template>
  <panel class="vuestro-panel-collapsible">
    <!--TITLE BAR-->
    <div class="flex-flex">
      <sub-title class="flex-align-self-center flex-grow-1" :spinner="spinner">
        <slot name="title"></slot>
      </sub-title>
      <slot name="toolbar"></slot>
      <vuestro-caret @click="collapsed = !collapsed" :collapsed="collapsed"></vuestro-caret>
    </div>
    <!--COLLAPSING CONTENT-->
    <span v-if="!collapsed">
      <slot></slot>
    </span>
  </panel>
</template>

<script>

import VuestroPanel from './Panel.vue';
import VuestroTitle from './VuestroTitle.vue';
import VuestroCaret from './VuestroCaret.vue';

export default {
  name: 'VuestroPanelCollapsible',
  components: {
    VuestroPanel,
    VuestroTitle,
    VuestroCaret,
  },
  props: {
    spinner: { type: Boolean, default: false },
  },
  data() {
    return {
      collapsed: false,
    };
  },
};

</script>

<style scoped>

.vuestro-panel-collapsible {
  padding: 6px;
}

</style>