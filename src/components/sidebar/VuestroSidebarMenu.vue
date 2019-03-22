<template>
  <div class="vuestro-sidebar-menu">
    <vuestro-sidebar-item v-for="(route, ridx) in routes"
                          :key="route.path"
                          v-if="route.meta && route.meta.sidebar"
                          :route="route"
                          :userColor="userColor">
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
    routes: { type: Array, required: true },
    userColor: { type: String, required: true },
  },
};

</script>

<style scoped>

</style>