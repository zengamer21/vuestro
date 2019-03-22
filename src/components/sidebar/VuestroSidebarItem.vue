<template>
  <div class="vuestro-sidebar-item">
    <!--CHILDREN-->
    <template v-if="route.children">
      <a :class="{ 'router-link-active': isParentRoute }"
         :style="style"
         @click="toggle">
        <icon :name="route.meta.icon"></icon>
        <span>{{ route.meta.title }}</span>
      </a>
      <div v-if="active">
        <vuestro-sub-routes :route="route"></vuestro-sub-routes>
      </div>
    </template>
    <!--NO CHILDREN-->
    <router-link v-else :to="route" :style="style">
      <icon :name="route.meta.icon"></icon>
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
    userColor: { type: String, required: true },
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
    style() {
      return {
        'border-color': this.userColor,
      };
    },
    isDashboard() {
      return this.route.name === 'dashboard';
    },
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

.vuestro-sidebar-item > a {
  display: block;
  padding: 14px 8px;
  color: var(--gray);
  font-size: 15px;
  text-decoration: none;
  transition: all 0.4s;
  font-weight: 400;
  cursor: pointer;
  white-space: nowrap;
}

.vuestro-sidebar-item > a > span {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

.vuestro-sidebar-item > a:hover,
.vuestro-sidebar-item > a.router-link-active:hover,
.vuestro-sidebar-item > a.router-link-active {
  border-left: 3px solid;
  background-color: rgba(255,255,255,0.1);
}

.vuestro-sidebar-item a svg {
  margin-top: 2px;
  width: 35px;
  float: left;
}

</style>