<template>
  <ul class="vuestro-sub-routes fade-in-left">
    <template v-for="subroute in route.children">
      <li class="vuestro-sub-routes-item" v-if="subroute.meta.sidebar">
        <router-link :to="{ path: route.path + '/' + subroute.path }">
          <span>{{ subroute.meta.title }}</span>
        </router-link>
      </li>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'VuestroSubRoutes',
  props: {
    route: { type: Object, required: true },
  },
};

</script>

<style scoped>

.vuestro-sub-routes {
  background-color: var(--dark);
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

/* all sub-menu item styling */
.vuestro-sub-routes-item > a {
  padding: 6px 25px 6px 55px;
  color: var(--gray);
  text-decoration: none;
  white-space: nowrap;
  font-size: 14px;
  text-align: left;
  display: block;
  transition: all 0.4s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* highlight for sub-menu hover */
.vuestro-sub-routes-item > a:hover {
  filter: brightness(130%);
  border-left: 3px solid var(--orange);
  background-color: var(--dark);
}
.vuestro-sub-routes-item > a.router-link-active {
  filter: brightness(115%);
  border-left: 3px solid var(--orange);
  background-color: var(--dark);
}

/* animation for opening sub-menu in mini-sidebar */
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-10%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}

.fade-in-left {
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-name: fadeInLeft;
}

@keyframes fadeIn {
  0% {
    display: inline;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>