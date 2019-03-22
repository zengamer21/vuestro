<template>
  <div class="vuestro-mini-sidebar-item" @mouseleave="onLeave">
    
    <div class="vuestro-mini-sidebar-icon"
         :class="{ 'router-link-active': isParentRoute }"
         @mouseover="onHover"
         @click="tryPush">
      <icon :name="route.icon"></icon>
    </div>
    
    <div class="vuestro-mini-sidebar-popup"
         :style="{ visibility: active ? 'visible':'hidden',
                   opacity: active ? '1':'0' }">
      <div class="popup-title">
        <span class="no-select">{{ route.meta.title }}</span>
      </div>
      <vuestro-sub-routes v-if="route.children" :route="route"></vuestro-sub-routes>
    </div>
  </div>
</template>

<script>

import VuestroSubRoutes from './VuestroSubRoutes.vue';

export default {
  name: 'VuestroMiniSidebarItem',
  components: {
    VuestroSubRoutes,
  },
  props: {
    route: { type: Object, required: true },
  },
  data() {
    return {
      active: this.isParentRoute,
    };
  },
  computed: {
    isDashboard() {
      return this.route.name === 'dashboard';
    },
    isParentRoute() {
      let p = this.route.path.split('/:'); // remove any params
      return this.$route.fullPath.startsWith(p[0]);
    },
  },
  methods: {
    onHover() {
      this.active = true;
    },
    onLeave() {
      this.active = false;
    },
    tryPush() {
      if (!this.route.children) {
        this.$router.push(this.route);
      }
    },
    addDashboard() {
      this.$store.dispatch('addDashboard');
    },
  },
};

</script>

<style scoped>

.vuestro-mini-sidebar-item {
  position: relative;
  height: var(--sidebar-item-height);
}

.vuestro-mini-sidebar-icon {
  height: 100%;
  width: 100%;
  color: var(--gray);
  font-size: 15px;
  text-decoration: none;
  transition: all 0.4s;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vuestro-mini-sidebar-icon:hover,
.vuestro-mini-sidebar-icon.router-link-active:hover,
.vuestro-mini-sidebar-icon.router-link-active {
  background-color: var(--dark);
  border-left: 3px solid var(--primary);
}

/* popup sub-menu */
.vuestro-mini-sidebar-popup {
  width: var(--sidebar-normal);
  background-color: var(--dark);
  color: var(--gray);
  position: absolute;
  top: 0;
  left: 100%;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  z-index: 1000;
}

.vuestro-mini-sidebar-popup > .popup-title {
  line-height: var(--sidebar-item-height);
  padding-left: 5px;
  padding-right: 15px;
  font-size: 15px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vuestro-mini-sidebar-popup > .sidebar-subnav {
  margin-bottom: 10px;
}

</style>