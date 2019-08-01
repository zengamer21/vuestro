<template>
  <div class="vuestro-sidebar-menu" @click.self="$emit('click')">
    <vuestro-sidebar-item v-for="(route, ridx) in routes"
                          :key="route.path"
                          v-if="route.meta && (route.meta.sidebar || route.meta.sidebarBottom) && (route.meta.role ? (route.meta.role === role):true)"
                          :route="route">
    </vuestro-sidebar-item>
  </div>
</template>

<script>

import VuestroSidebarItem from './VuestroSidebarItem.vue';

export default {
  name: 'VuestroSideBarMenu',
  components: {
    VuestroSidebarItem,
  },
  props: {
    role: { type: String, default: '' }, // user role
    routes: { type: Array, required: true },
  },
};

</script>

<style scoped>

.vuestro-sidebar-menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-right: var(--vuestro-sidebar-item-padding-right);
  padding-bottom: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

</style>