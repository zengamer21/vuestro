<template>
  <div class="vuestro-mini-sidebar-menu" @click.self="$emit('click')">
    <!--<div class="vuestro-mini-sidebar-menu-inner">-->
      <vuestro-mini-sidebar-item v-for="(route, ridx) in routes"
                          :key="route.path"
                          v-if="route.meta && (route.meta.sidebar || route.meta.sidebarBottom) && (route.meta.role ? (route.meta.role === role):true)"
                          :route="route">
      </vuestro-mini-sidebar-item>
    <!--</div>-->
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
    role: { type: String, default: '' }, // user role
    routes: { type: Array, required: true },
  },
};

</script>

<style scoped>

.vuestro-mini-sidebar-menu {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-right: var(--vuestro-sidebar-item-padding-right);
}

.vuestro-mini-sidebar-menu-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>

