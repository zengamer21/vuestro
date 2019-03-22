<template>
  <div class="vuestro-sidebar">
    <div class="vuestro-sidebar-inner">
      
      <!--LOGO-->
      <div v-if="logo" class="logo">
        <img :src="logo"/>
      </div>
      
      <!--TITLE-->
      <transition name="logo-text" mode="out-in">
        <div v-if="!mini" class="logo-text">{{ title }}</div>
      </transition>
      
      <!--USER BLOCK-->
      <transition name="user-block" mode="out-in">
        <vuestro-geo-pattern v-if="!mini" class="user-block" :seed="user" @color="(c) => {this.geoColor = c}">
          <img v-if="userImg" :src="userImg" class="img-circle"/>
          <div class="user-block-text">
            <span class="username">{{ user }}</span>
            <span>{{ role }}</span>
          </div>
        </vuestro-geo-pattern>
      </transition>
      
      <!--MENU-->
      <transition name="vuestro-sidebar" mode="out-in">
        <vuestro-sidebar-menu v-if="!mini" 
                              :routes="$router.options.routes"
                              :userColor="geoColor"></vuestro-sidebar-menu>
        <vuestro-mini-sidebar-menu v-else 
                                   :routes="$router.options.routes"
                                   :userColor="geoColor">
        </vuestro-mini-sidebar-menu>
      </transition>
    </div>
  </div>
</template>

<script>

/* global _ */
import VuestroGeoPattern from '../VuestroGeoPattern.vue';
import VuestroSidebarMenu from './VuestroSidebarMenu.vue';
import VuestroMiniSidebarMenu from './VuestroMiniSidebarMenu.vue';

import 'vue-awesome/icons/plus.js';
import 'vue-awesome/icons/minus.js';
import 'vue-awesome/icons/sign-out-alt.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroSidebar',
  components: {
    VuestroGeoPattern,
    VuestroSidebarMenu,
    VuestroMiniSidebarMenu,
    Icon,
  },
  props: {
    title: { type: String, default: '' }, // app title
    logo: { type: String, default: '' }, // app logo
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
    };
  },
  watch: {
    mini(newVal) {
      this.checkSidebar();
    },
  },
  methods: {
    checkSidebar() {
      if (this.mini) {
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
:root {
  --vuestro-sidebar-normal-width: 180px;
  --vuestro-sidebar-mini-width: 70px;
  --vuestro-sidebar-bg: #1b1c21;
  --vuestro-sidebar-border: #aaa;
}
</style>

<style scoped>

.vuestro-sidebar {
  background-color: var(--vuestro-sidebar-bg);
  border-right: 1px solid var(--vuestro-sidebar-border);
  position: fixed;
  height: 100%;
  z-index: 101;
  width: var(--vuestro-sidebar-normal-width);
  transition: all 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-repeat: repeat;
}

/* .vuestro-mini-sidebar is added to body */
.vuestro-mini-sidebar .vuestro-sidebar {
  width: var(--vuestro-sidebar-mini-width);
}

.vuestro-sidebar-inner {
  width: 100%;
  overflow-x: visible;
}

.logo {
  color: white;
  background-color: white;
  padding-top: 25px;
  padding-bottom: 15px;
  text-align: center;
}

.logo img {
  fill: white;
  transition: all 0.4s;
  width: 120px;
}

.vuestro-mini-sidebar .logo-icon {
  padding-bottom: 10px;
}

.vuestro-mini-sidebar .logo-icon img {
  width: calc(var(--vuestro-sidebar-mini-width) - 10px);
}

.user-block {
  display: flex;
  color: white;
  height: 50px;
  padding: 30px 10px;
}
.user-block img {
  align-self: center;
  width: 40px;
  border-radius: 50%;
}

.user-block-text {
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  overflow: hidden;
}
.user-block-text > span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.user-block-text .username {
  font-weight: 700;
}
.user-block-enter-active, .user-blockleave-active {
  transition: all 0.4s;
}
.user-block-enter, .user-block-leave-to {
  opacity: 0;
  font-size: 0;
}

/* transitions */
.vuestro-sidebar-enter-active, .vuestro-sidebar-leave-active {
  transition: opacity 0.2s;
}
.vuestro-sidebar-enter, .vuestro-sidebar-leave-to {
  opacity: 0;
}

.logo-text {
  color: white;
  text-align: center;
  font-size: 34px;
  padding: 5px 0;
  font-weight: 300;
}
.logo-text-enter-active, .logo-text-leave-active {
  transition: all 0.4s;
}
.logo-text-enter, .logo-text-leave-to {
  opacity: 0;
  font-size: 0;
}


</style>