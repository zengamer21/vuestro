<template>
  <div class="vuestro-app" :class="{ 'vuestro-dark': dark }">
    <!--MAIN TEMPLATE-->
    <template v-if="authenticated && !loading">

      <!--SLOT WITH DEFAULT NAVBAR-->
      <slot name="navbar">
        <vuestro-navbar :title="title">
          <template slot="left"><slot name="navbar-left"></slot></template>
          <template slot="center"><slot name="navbar-center"></slot></template>
          <template slot="right"><slot name="navbar-right"></slot></template>
        </vuestro-navbar>
      </slot>

      <div class="vuestro-content">
        <!--SLOT WITH DEFAULT SIDEBAR-->
        <slot name="sidebar">
          <vuestro-sidebar :user="user"
                           :user-img="userImg"
                           :role="role">
            <template slot="logo">
            </template>
            <template slot="footer">
              <slot name="sidebar-footer"></slot>
            </template>
          </vuestro-sidebar>
        </slot>

        <!--MAIN PAGE VIEW-->
        <div ref="routerView" class="vuestro-router-view" @scroll="onScroll">
          <keep-alive> <!-- vue router option for persistent state -->
            <router-view/>
          </keep-alive>
          <slot name="footer">
            <p class="default-footer">Vuestro ❤ Vue</p>
          </slot>
        </div>
      </div>
    </template>

    <!--SLOT FOR CUSTOM LOADING PAGE-->
    <slot v-if="loading" name="loading"></slot>

    <!--SLOT FOR CUSTOM LOGIN PAGE-->
    <slot v-if="!authenticated" name="login"></slot>
  </div>
</template>

<script>

import VuestroNavbar from './VuestroNavbar.vue';
import VuestroSidebar from './sidebar/VuestroSidebar.vue';

export default {
  name: 'VuestroApp',
  components: {
    VuestroNavbar,
    VuestroSidebar,
  },
  props: {
    authenticated: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    logo: { type: String, default: null },
    title: { type: String, default: '' },     // app title
    user: { type: String, default: '' },      // username
    userImg: { type: String, default: null }, // user image
    role: { type: String, default: '' },      // user role
    dark: { type: Boolean, default: false },  // dark mode
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
.vuestro-app {
  /* base palette */
  --vuestro-blue: #217ada;
  --vuestro-primary: #0c86d2;
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

  /* the following are theme-able colors */
  --vuestro-content-bg: #f7f9fa;
  --vuestro-panel-bg: #fff;
  --vuestro-panel-dark-bg: #959a9e;
  --vuestro-widget-light-bg: #e8e9ec;
  --vuestro-widget-dark-bg: #2f353f;

  --vuestro-field-bg: #e8e9ec;

  --vuestro-popup-bg: #464748;
  --vuestro-popup-fg: #eee;

  --vuestro-selection: #2e3037;
  --vuestro-outline: #aaa;
  --vuestro-active: #e9eff7;
  --vuestro-hover: #e4e7ea;

  --vuestro-footer-bg: #f9f9f9;
  --vuestro-notifications-bg: #fff3cd;

  --vuestro-text-color: #323334;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
  --vuestro-text-color-inverse: #eee;
}

/* DARK UI OVERRIDES */
.vuestro-dark {
  --vuestro-content-bg: #1b1c21;
  --vuestro-panel-bg: #232425;
  --vuestro-widget-light-bg: #d6d7d8;
  --vuestro-widget-dark-bg: #78797a;

  --vuestro-field-bg: #535456;
  --vuestro-footer-bg: #101110;
  --vuestro-outline: #4b4d57;
  --vuestro-active: #37383a;

  --vuestro-text-color: #ccc;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
  --vuestro-text-color-inverse: #323334;
}

</style>

<style scoped>

@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('../assets/Quicksand-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

.vuestro-app >>> *, :after, :before {
  box-sizing: border-box;
}

.vuestro-app {
  color: var(--vuestro-text-color);
  font-size: 13px;
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeSpeed;
  min-height: 100%; /* stretches app down to bottom edge of body */
  display: flex;
  flex-direction: column;
  background-color: var(--vuestro-content-bg);
}

.vuestro-content {
  flex: 1; /* make the content stretch to bottom of .vuestro-app */
  display: flex;
  overflow: hidden; /* lets .vuestro-router-view do the scrolling */
}

.vuestro-router-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  position: relative;
  overflow: auto;
}

.default-footer {
  text-align: center;
}

</style>