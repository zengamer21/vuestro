<template>
  <transition name="vuestro-sub-routes" mode="out-in">
    <ul v-if="show" class="vuestro-sub-routes">
      <template v-for="subroute in route.children">
        <li class="vuestro-sub-routes-item" v-if="subroute.meta.sidebar">
          <router-link v-if="toPath" :to="{ path: route.path + '/' + subroute.path }">
            <span>{{ subroute.meta.title }}</span>
          </router-link>
          <router-link v-else :to="subroute">
            <span>{{ subroute.meta.title }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </transition>
</template>

<script>

export default {
  name: 'VuestroSubRoutes',
  props: {
    route: { type: Object, required: true },
    show: { type: Boolean, default: true },
    toPath: { type: Boolean, default: false }, // build a path manually
  },
};

</script>

<style scoped>

.vuestro-sub-routes {
  list-style-type: none;
  padding-left: 0;
  margin: var(--vuestro-sidebar-subroutes-spacing) 0;
}

/* all sub-menu item styling */
.vuestro-sub-routes-item > a {
  padding: 6px 25px 6px 40px;
  text-decoration: none;
  white-space: nowrap;
  font-size: 14px;
  text-align: left;
  display: block;
  transition: all 0.4s;
  color: var(--vuestro-sidebar-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
}

/* highlight for sub-menu hover */
.vuestro-sub-routes-item > a:hover {
  background-color: var(--vuestro-sidebar-item-hover);
  filter: brightness(102%);
}
.vuestro-sub-routes-item > a.router-link-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-item-active-fg);
  border-left: var(--vuestro-sidebar-subroute-active-border);
}

.vuestro-sub-routes-enter-active, .vuestro-sub-routes-leave-active {
  transition: all 0.4s;
}
.vuestro-sub-routes-enter, .vuestro-sub-routes-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>