<template>
  <div class="vuestro-app" :class="{ mobile: $root.mobile, 'vuestro-dark': isDark }">
    <!--MAIN TEMPLATE-->
    <template v-if="authenticated && !loading">

      <!--SLOT WITH DEFAULT NAVBAR-->
      <slot name="navbar">
        <vuestro-navbar :title="title">
          <template #mobile-sidebar>
            <slot name="sidebar">
              <vuestro-sidebar :user="user"
                               :user-img="userImg"
                               :role="role">
                <template #logo>
                  <slot name="sidebar-logo"></slot>
                </template>
                <template #footer>
                  <slot name="sidebar-footer"></slot>
                </template>
              </vuestro-sidebar>
            </slot>
          </template>
          <slot name="navbar-slot"></slot>
        </vuestro-navbar>
      </slot>

      <div class="vuestro-content">
        <!--SLOT WITH DEFAULT SIDEBAR-->
        <template v-if="!$root.mobile">
          <slot name="sidebar">
            <vuestro-sidebar :user="user"
                             :user-img="userImg"
                             :role="role">
              <template #logo>
                <slot name="sidebar-logo"></slot>
              </template>
              <template #footer>
                <slot name="sidebar-footer"></slot>
              </template>
            </vuestro-sidebar>
          </slot>
        </template>

        <!--MAIN PAGE VIEW-->
        <div ref="routerView" class="vuestro-router-view" @scroll="onScroll">
          <slot name="pre-content"></slot>
          <keep-alive> <!-- vue router option for persistent state -->
            <router-view/>
          </keep-alive>

          <slot name="footer"></slot>
        </div>
      </div>
    </template>

    <!--SLOT FOR CUSTOM LOADING PAGE-->
    <slot v-else-if="authenticated && loading" name="loading"></slot>

    <!--SLOT FOR CUSTOM LOGIN PAGE-->
    <slot v-else name="login"></slot>
  </div>
</template>

<script>

/* global Event, navigator */
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
  computed: {
    isDark() {
      // if store is setup to provide isDarkUI, use it
      if (this.$store && this.$store.getters.isDarkUI) {
        return this.$store.getters.isDarkUI;
      }
      // default to prop
      return this.dark;
    },
  },
  watch: {
    '$route'(to, from) {
      if (to.meta.scrollTop) {
        // restore scroll on routerView for this route
        this.$nextTick(() => {
          this.$refs.routerView.scrollTop = to.meta.scrollTop;
        });
      }
      // emit a global resize event so widgets/charts can resize
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }
  },
  beforeMount() {
    console.log('vuestro-app beforeMount');
    console.log('window width', window.innerWidth);
    console.log('ua', navigator.userAgent);
    if (navigator.userAgent.match(/Mobile/)) {
      console.log('vuestro-app going into MOBILE mode');
      this.$root.mobile = true;
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
  --vuestro-font-size: 14px;
  --vuestro-rounded-border-radius: 4px;
  --vuestro-rounded-border-width: 1px;
  --vuestro-control-sm-height: 18px;
  --vuestro-control-md-height: 24px;
  --vuestro-control-lg-height: 32px;
  --vuestro-control-xl-height: 48px;
  --vuestro-control-margin: 2px;

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
  --vuestro-magenta: #ed23a9;
  --vuestro-gold: #fce228;

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
  --vuestro-panel-dark-bg: #636363; /* panel forced dark mode */
  --vuestro-widget-light-bg: #e8e9ec;
  --vuestro-widget-dark-bg: #2f353f;

  --vuestro-field-bg: #e8e9ec;

  --vuestro-popup-bg: #464748;
  --vuestro-popup-fg: #eee;
  --vuestro-tooltip-opacity: 0.8;

  --vuestro-selection: #2e3037;
  --vuestro-outline: #aaa;
  --vuestro-active: #e9eff7;
  --vuestro-hover: #e4e7ea;

  --vuestro-notifications-bg: #fff3cd;

  --vuestro-text-color: #323334;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #888;
  --vuestro-text-color-inverse: #eee;
}

/* DARK UI OVERRIDES */
.vuestro-dark {
  --vuestro-content-bg: #1b1c21;
  --vuestro-panel-dark-bg: #383a3c; /* panel will use this in global dark mode */

  --vuestro-widget-dark-bg: #383b3f;
  --vuestro-widget-light-bg: var(--vuestro-widget-dark-bg);
  --vuestro-field-bg: #535456;
  --vuestro-outline: #7d7d7d;
  --vuestro-active: #37383a;
  --vuestro-hover: #535456;
  --vuestro-popup-bg: #323334;

  --vuestro-text-color: #ccc;
  --vuestro-text-color-secondary: #696969;
  --vuestro-text-color-muted: #aaa;
}

.vuestro-app.mobile {
  --vuestro-base-font-size: 32px;
  --vuestro-rounded-border-radius: 10px;
  --vuestro-rounded-border-width: 2px;
  --vuestro-control-sm-height: 42px;
  --vuestro-control-md-height: 50px;
  --vuestro-control-lg-height: 64px;
  --vuestro-control-xl-height: 74px;
  --vuestro-control-margin: 5px;
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
  font-size: var(--vuestro-base-font-size);
  font-family: 'Quicksand', sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeLegibility;
  min-height: 100%; /* stretches app down to bottom edge of body */
  display: flex;
  flex-direction: column;
  background-color: var(--vuestro-content-bg);
}

.vuestro-content {
  flex: 1 1 auto; /* make the content stretch to bottom of .vuestro-app */
  display: flex;
  overflow: hidden; /* lets .vuestro-router-view do the scrolling */
}

.vuestro-router-view {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  transition: all 0.4s;
  position: relative;
  overflow: auto;
}

</style>