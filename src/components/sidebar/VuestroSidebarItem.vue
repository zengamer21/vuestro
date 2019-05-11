<template>
  <div class="vuestro-sidebar-item" :class="{ bottom: route.meta.sidebarBottom }">
    <!--CHILDREN-->
    <template v-if="route.children">
      <a :class="{ 'router-link-active': isParentRoute }"
         @click="toggle">
        <icon :name="route.meta.icon"></icon>
        <span>{{ route.meta.title }}</span>
      </a>
      <vuestro-sub-routes :show="active" :route="route"></vuestro-sub-routes>
    </template>
    <!--NO CHILDREN-->
    <router-link v-else :to="route">
      <icon v-if="route.meta.icon" :name="route.meta.icon"></icon>
      <span v-if="route.meta.svg" v-html="route.meta.svg"></span>
      <span>{{ route.meta.title }}</span>
    </router-link>
  </div>
</template>

<script>

import VuestroSubRoutes from './VuestroSubRoutes.vue';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroSidebarItem',
  components: {
    Icon,
    VuestroSubRoutes,
  },
  props: {
    route: { type: Object, required: true },
  },
  data() {
    return {
      active: false,
    };
  },
  beforeMount() {
    this.active = this.isParentRoute;
  },
  computed: {
    isParentRoute() {
      let p = this.route.path.split('/:'); // remove any params
      return this.$route.fullPath.startsWith(p[0]);
    },
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
  }
};

</script>

<style scoped>

.vuestro-sidebar-item {
  position: relative;
}

.vuestro-sidebar-item.bottom {
  margin-top: auto;
}

.vuestro-sidebar-item > a {
  min-height: var(--vuestro-sidebar-item-height);
  display: flex;
  padding-left: 5px;
  align-items: center;
  color: var(--vuestro-sidebar-fg);
  font-size: 15px;
  text-decoration: none;
  transition: all 0.4s;
  cursor: pointer;
  white-space: nowrap;
  border-top-right-radius: calc(var(--vuestro-sidebar-item-height) / 2);
  border-bottom-right-radius: calc(var(--vuestro-sidebar-item-height) / 2);
}

.vuestro-sidebar-item > a:hover,
.vuestro-sidebar-item > a.router-link-active,
.vuestro-sidebar-item > a.router-link-active:hover {
  background-color: var(--vuestro-sidebar-item-hover);
}
.vuestro-sidebar-item > a.router-link-exact-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-item-active-fg);
}

.vuestro-sidebar-item .fa-icon {
  width: 35px;
}

</style>