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
  --blue: #217ada;
  --primary: #09A1FF;
  --secondary: #8c949a;
  --success: #33b86c;
  --info: #08a1ff;
  --warning: #ebc142;
  --danger: #cb2a2a;
  --inverse: #14082d;
  --purple: #551A8B;
  --indigo: #682fa1;
  --pink: #f13c6e;
  --red: #ea4958;
  --orange: #f47633;
  --yellow: #fff700;
  --green: #4bbc79;
  --teal: #87e6ca;
  --cyan: #42b9cc;

  --white: #fff;
  --black: #000;
  --gray: #c3cbe0;
  --gray-med: #b3b3b3;
  --gray-dark: #505664;
  --light: #f5f5f5;
  --light-med: #ececec;
  
  --dark: #1b1c21;
  --darker: #101110;

  --selection: #2e3037;
  --outline: #4b4d57;

  --content-bg: #fff;
  --footer-bg: #f9f9f9;
  --notifications-bg: #fff3cd;

  --text-color: #666;
  --text-color-secondary: #696969;
  --text-color-muted: #aaa;
  --text-color-inverse: #fff;
}

/* DARK UI OVERRIDES */
.darkui {
  --content-bg: #1b1c21;
  --footer-bg: #101110;
  --outline: #4b4d57;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  font-size: 13px;
  color: var(--text-color);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

*, :after, :before {
  box-sizing: border-box;
}

</style>

<style scoped>

.vuestro-app {
  font-family: sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeSpeed;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
  color: var(--text-color);
}

.router-view {
  flex-direction: column;
  flex: 1;
  overflow: auto;
  transition: all 0.4s;
  position: relative;
}

</style>