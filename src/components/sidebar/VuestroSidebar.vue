<template>
  <div class="vuestro-sidebar">

    <!--HEADER BLOCK-->
    <div class="vuestro-sidebar-header">
      <div v-if="$slots.toolbar" class="vuestro-sidebar-toolbar">
        <slot name="toolbar">
        </slot>
      </div>

      <!--LOGO-->
      <div v-if="$slots.logo" class="vuestro-sidebar-logo">
        <slot name="logo"></slot>
      </div>

    </div>

    <!--TITLE BLOCK-->
    <transition v-if="title" name="vuestro-title-text" mode="out-in">
      <div v-if="!localMini" class="vuestro-title-text">{{ title }}</div>
    </transition>

    <!--USER BLOCK-->
    <template v-if="user">
      <vuestro-geo-pattern class="vuestro-user-block" :seed="user" @color="(c) => {this.geoColor = c}">
        <img v-if="userImg" :src="userImg" class="img-circle"/>
        <transition name="vuestro-user-block" mode="out-in">
          <div v-if="!localMini" class="vuestro-user-block-text">
            <span class="username">{{ user }}</span>
            <span>{{ role }}</span>
          </div>
        </transition>
      </vuestro-geo-pattern>
    </template>

    <!--MENU-->
    <transition name="vuestro-sidebar" mode="out-in">
      <vuestro-sidebar-menu v-if="!localMini"
                            :role="role"
                            :routes="$router.options.routes"
                            @click="toggleSidebar"></vuestro-sidebar-menu>
      <vuestro-mini-sidebar-menu v-else
                                 :role="role"
                                 :routes="$router.options.routes"
                                 @click="toggleSidebar">
      </vuestro-mini-sidebar-menu>
    </transition>

    <!--FOOTER BLOCK-->
    <div class="vuestro-sidebar-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

/* global _ */
import VuestroGeoPattern from '../VuestroGeoPattern.vue';
import VuestroSidebarMenu from './VuestroSidebarMenu.vue';
import VuestroMiniSidebarMenu from './VuestroMiniSidebarMenu.vue';

export default {
  name: 'VuestroSidebar',
  components: {
    VuestroGeoPattern,
    VuestroSidebarMenu,
    VuestroMiniSidebarMenu,
  },
  props: {
    title: { type: String, default: '' }, // app title
    user: { type: String, default: '' }, // username
    userImg: { type: String, default: null }, // user image
    role: { type: String, default: '' }, // user role
    link: { type: String, default: '' }, // user link
    mini: { type: Boolean, default: false }, // mini sidebar
  },
  data() {
    return {
      routes: _.cloneDeep(this.$router.options.routes),
      geoColor: '',
      localMini: false,
    };
  },
  mounted() {
    this.localMini = this.mini;
    this.checkSidebar();
  },
  watch: {
    mini(newVal) {
      this.localMini = newVal;
      this.checkSidebar();
    },
  },
  methods: {
    toggleSidebar() {
      this.localMini = !this.localMini;
      this.$emit('update:mini', this.localMini);
      this.checkSidebar();
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 400);
    },
    checkSidebar() {
      if (this.localMini) {
        document.body.classList.add('vuestro-mini-sidebar');
      } else {
        document.body.classList.remove('vuestro-mini-sidebar');
      }
    },
  },
};
</script>

<style>
/* override these global css vars to set widths */
.vuestro-app {
  --vuestro-sidebar-normal-width: 180px;
  --vuestro-sidebar-mini-width: 70px;
  --vuestro-sidebar-header-bg: var(--vuestro-content-bg);
  --vuestro-sidebar-header-fg: var(--vuestro-black);
  --vuestro-sidebar-bg: var(--vuestro-content-bg);
  --vuestro-sidebar-fg: var(--vuestro-text-color);
  --vuestro-sidebar-border: transparent;
  --vuestro-sidebar-item-height: 50px;
  --vuestro-sidebar-item-padding-right: 15px;
  --vuestro-sidebar-item-hover: var(--vuestro-hover);
  --vuestro-sidebar-item-active-bg: var(--vuestro-active);
  --vuestro-sidebar-item-active-fg: var(--vuestro-primary);
  --vuestro-sidebar-radius: calc(var(--vuestro-sidebar-item-height) / 2);
  --vuestro-sidebar-subroutes-spacing: 2px;
  --vuestro-sidebar-active-border: 3px solid var(--vuestro-primary);
  --vuestro-sidebar-subroute-active-border: 3px solid var(--vuestro-orange);
  --vuestro-sidebar-user-image-width: 40px;
}
</style>

<style scoped>

.vuestro-sidebar {
  color: var(--vuestro-sidebar-fg);
  background-color: var(--vuestro-sidebar-bg);
  border-right: 1px solid var(--vuestro-sidebar-border);
  width: var(--vuestro-sidebar-normal-width);
  transition: all 0.4s;
  flex: none;
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

/* .vuestro-mini-sidebar is added to body */
.vuestro-mini-sidebar .vuestro-sidebar {
  width: var(--vuestro-sidebar-mini-width);
}

.vuestro-sidebar-header {
  background-color: var(--vuestro-sidebar-header-bg);
  color: var(--vuestro-sidebar-header-fg);
}

.vuestro-sidebar-logo {
  padding-top: 15px;
  padding-bottom: 15px;
  transition: all 0.4s;
  display: flex;
  justify-content: center;
}

.vuestro-mini-sidebar .vuestro-sidebar-logo {
  padding-bottom: 15px;
}

.vuestro-user-block {
  display: flex;
  color: white;
  height: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  margin-right: calc(var(--vuestro-sidebar-item-padding-right) / 2);
  border-top-right-radius: calc(var(--vuestro-sidebar-radius) * 2);
  border-bottom-right-radius: calc(var(--vuestro-sidebar-radius) * 2);
}
.vuestro-user-block img {
  align-self: center;
  width: var(--vuestro-sidebar-user-image-width);
  border-radius: 50%;
}
.vuestro-mini-sidebar .vuestro-user-block {
  padding-left: 0px;
  justify-content: center;
}

.vuestro-user-block-text {
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
}
.vuestro-user-block-text > span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-user-block-text .username {
  font-weight: 700;
}
.vuestro-user-block-enter-active, .vuestro-user-blockleave-active {
  transition: all 1s;
}
.vuestro-user-block-enter, .vuestro-user-block-leave-to {
  opacity: 0;
}

/* transitions */
.vuestro-sidebar-enter-active, .vuestro-sidebar-leave-active {
  transition: opacity 0.2s;
}
.vuestro-sidebar-enter, .vuestro-sidebar-leave-to {
  opacity: 0;
}

.vuestro-title-text {
  background-color: var(--vuestro-sidebar-header-bg);
  color: var(--vuestro-sidebar-header-fg);
  text-align: center;
  font-size: 34px;
  padding: 5px 0;
  font-weight: 300;
}
.vuestro-title-text-enter-active, .vuestro-title-text-leave-active {
  transition: all 0.4s;
}
.vuestro-title-text-enter, .vuestro-title-text-leave-to {
  opacity: 0;
  font-size: 0;
}

.vuestro-sidebar-toolbar {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

/* put footer all the way down */
.vuestro-sidebar-footer {
  margin-top: auto;
}

</style>