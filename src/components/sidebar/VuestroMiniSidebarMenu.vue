<template>
  <div class="vuestro-mini-sidebar-menu" @click.self="$emit('click')">
    <vuestro-mini-sidebar-item v-for="(route, ridx) in routes"
                        :key="route.path"
                        v-if="route.meta &&
                              (route.meta.sidebar || route.meta.sidebarBottom) &&
                              (route.meta.role ? (route.meta.role === role || role.indexOf(route.meta.role) > -1):true) &&
                              (!route.meta.showFunc || route.meta.showFunc())"
                        :role="role"
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
    role: { type: [String, Array], default: () => [] }, // user role
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

</style>

