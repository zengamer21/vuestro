<template>
  <div class="vuestro-mini-sidebar-menu" @click.self="$emit('click')">
    <vuestro-mini-sidebar-item v-for="(route, ridx) in routes" 
                        :key="route.path" 
                        v-if="route.meta && (route.meta.sidebar || route.meta.sidebarBottom)" 
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

.vuestro-mini-sidebar-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

</style>

