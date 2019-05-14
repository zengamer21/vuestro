<template>
  <div class="vuestro-mini-sidebar-item"
       :class="{ bottom: route.meta.sidebarBottom }"
       @mouseleave="onLeave">

    <div class="vuestro-mini-sidebar-icon"
         :class="{ 'router-link-active': isParentRoute }"
         @mouseover="onHover"
         @click="tryPush">
      <icon v-if="route.meta.icon" :name="route.meta.icon"></icon>
      <span v-if="route.meta.svg" v-html="route.meta.svg"></span>
    </div>

    <div class="vuestro-mini-sidebar-popup"
         :style="{ visibility: active ? 'visible':'hidden',
                   opacity: active ? '1':'0',
                   height: active ? 'auto':'0' }">
      <div class="popup-title">
        <span class="no-select">{{ route.meta.title }}</span>
      </div>
      <vuestro-sub-routes v-if="route.children" :route="route"></vuestro-sub-routes>
    </div>
  </div>
</template>

<script>

import VuestroSubRoutes from './VuestroSubRoutes.vue';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroMiniSidebarItem',
  components: {
    Icon,
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
  height: var(--vuestro-sidebar-item-height);
}

.vuestro-mini-sidebar-item.bottom {
  margin-top: auto;
}

.vuestro-mini-sidebar-icon {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
}

.vuestro-mini-sidebar-icon.router-link-exact-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-item-active-fg);
}
.vuestro-mini-sidebar-icon.router-link-active {
  background-color: var(--vuestro-sidebar-item-hover);
  border-left: var(--vuestro-sidebar-active-border);
}
.vuestro-mini-sidebar-item:hover,
.vuestro-mini-sidebar-icon.router-link-active:hover {
  background-color: var(--vuestro-sidebar-item-hover);
  border-radius: 0;
}

/* popup sub-menu */
.vuestro-mini-sidebar-popup {
  width: var(--vuestro-sidebar-normal-width);
  background-color: var(--vuestro-sidebar-item-hover);
  color: var(--vuestro-sidebar-fg);
  position: absolute;
  top: 0;
  left: 100%;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
  z-index: 1000;
  padding-right: var(--vuestro-sidebar-radius);
}

.vuestro-mini-sidebar-popup > .popup-title {
  background-color: var(--vuestro-sidebar-item-hover);
  line-height: var(--vuestro-sidebar-item-height);
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