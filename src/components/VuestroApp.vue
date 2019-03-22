<template>
  <div class="vuestro-app">
    <template v-if="authenticated && !loading">
      <slot name="sidebar">
        <vuestro-sidebar :title="title"
                         :logo="logo"
                         :user="user"
                         :user-img="userImg"
                         :role="role">
        </vuestro-sidebar>
      </slot>
      <div ref="routerView" id="router-view" @scroll="onScroll">
        <keep-alive> <!-- vue router option for persistent state -->
          <router-view/>
        </keep-alive>
      </div>
    </template>
    <slot v-if="loading" name="loading"></slot>
    <slot v-if="!authenticated" name="login"></slot>
  </div>
</template>

<script>

import VuestroSidebar from './sidebar/VuestroSidebar.vue';

export default {
  name: 'VuestroApp',
  components: {
    VuestroSidebar,
  },
  props: {
    authenticated: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    logo: { type: String, default: null },
    title: { type: String, default: '' },             // app title
    user: { type: String, default: '' }, // username
    userImg: { type: String, default: null }, // user image 
    role: { type: String, default: '' }, // user role
  },
  watch: {
    '$route'(to, from) {
      if (to.meta.scrollTop) {
        // restore scroll on routerView for this route
        this.$nextTick(() => {
          this.$refs.routerView.scrollTop = to.meta.scrollTop;
        });
      }
    }
  },
  methods: {
    onScroll(e) {
      // save content-container scroll position to this route's meta
      this.$route.meta.scrollTop = this.$refs.routerView.scrollTop;
    },

  }
};
  
</script>

<style>

/* GLOBAL STYLE VARIABLES */
:root {
  /* base palette */
  --vuestro-blue: #217ada;
  --vuestro-primary: #09A1FF;
  --vuestro-secondary: #8c949a;
  --vuestro-success: #33b86c;
  --vuestro-info: #08a1ff;
  --vuestro-warning: #ebc142;
  --vuestro-danger: #cb2a2a;
  --vuestro-inverse: #14082d;
  --vuestro-purple: #551A8B;
  --vuestro-indigo: #682fa1;
  --vuestro-pink: #f13c6e;
  --vuestro-red: #ea4958;
  --vuestro-orange: #f47633;
  --vuestro-yellow: #fff700;
  --vuestro-green: #4bbc79;
  --vuestro-teal: #87e6ca;
  --vuestro-cyan: #42b9cc;

  --vuestro-white: #fff;
  --vuestro-black: #000;
  --vuestro-gray: #c3cbe0;
  --vuestro-gray-med: #b3b3b3;
  --vuestro-gray-dark: #505664;
  --vuestro-light: #f5f5f5;
  --vuestro-light-med: #ececec;
  
  --vuestro-dark: #1b1c21;
  --vuestro-darker: #101110;

  --vuestro-selection: #2e3037;
  --vuestro-outline: #4b4d57;

  --vuestro-content-bg: #fff;
  --vuestro-footer-bg: #f9f9f9;
  --vuestro-notifications-bg: #fff3cd;

  --vuestro-text-color: #666;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
  --vuestro-text-color-inverse: #fff;
}

/* DARK UI OVERRIDES */
.vuestro-darkui {
  --vuestro-content-bg: #1b1c21;
  --vuestro-footer-bg: #101110;
  --vuestro-outline: #4b4d57;
}

/* need this for our components to look right, so may as well force it */
*, :after, :before {
  box-sizing: border-box;
}

</style>

<style scoped>

.vuestro-app {
  color: var(--vuestro-text-color);
  font-size: 13px;
  font-family: sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeSpeed;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
}

.router-view {
  flex-direction: column;
  flex: 1;
  overflow: auto;
  transition: all 0.4s;
  position: relative;
}

</style>