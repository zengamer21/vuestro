<template>
  <div class="vuestro-mini-sidebar-menu">
    <vuestro-mini-sidebar-item v-for="(route, ridx) in routes" 
                        :key="route.path" 
                        v-if="route.meta.sidebar" 
                        :route="route">
    </vuestro-mini-sidebar-item>
  </div>
</template>

<script>

import VuestroMiniSidebarItem from './VuestroMiniSidebarItem.vue';

export default {
  name: 'VuestroMiniSidebarMenu',
  components: {
    VuestroMiniSidebarItem,
  },
  props: {
    routes: { type: Array, required: true },
  },
};

</script>

<style scoped>

</style>

