<template>
  <div id="app">
    <!--<vuestro-side-bar title="Vuestro"/>-->
    <div id="content-container">
      <keep-alive> <!-- vue router option for persistent state -->
        <router-view/>
      </keep-alive>
    </div>    
    
    <!--FOOTER-->
    <div id="footer">
      <strong>Vuestro</strong> v{{version}} ©2019
    </div>
  </div>
</template>

<script>

/* global __VERSION__ */

export default {
  name: 'app',
  data() {
    return {
      version: __VERSION__,
    };
  },
};
</script>

<style>

/* GLOBAL STYLE VARIABLES */
:root {
  /* base palette */
  --blue: #217ada;
  --primary: #6e98d7;
  --secondary: #8c949a;
  --success: #33b86c;
  --info: #007bff;
  --warning: #ebc142;
  --danger: #cb2a2a;
  --inverse: #14082d;
  --purple: #551A8B;
  --indigo: #682fa1;
  --pink: #f13c6e;
  --red: #ea4958;
  --orange: #f4984e;
  --yellow: #fff700;
  --green: #4bbc79;
  --teal: #87e6ca;
  --cyan: #42b9cc;

  --white: #fff;
  --black: #000;
  --gray: #979dad;
  --gray-dark: #505664;
  --gray-med: #b3b3b3;
  --light: #f5f5f5;
  --light-med: #ececec;
  
  /* high-level definitions (should use colors above) */
  --selection: #2e3037;
  --outline: #4b4d57;
  --dark: #1b1c21;
  --darker: #101110;
    
  --navbar-bg: #fff;
  --navbar-border: #fff;

  --sidebar-normal: 180px;
  --sidebar-mini: 60px;
  --sidebar-bg: #2f353f;
  --sidebar-border: #2f353f;
  --sidebar-sub-bg: #505050;
  --sidebar-item-height: 50px;
  
  --content-bg: #c0c0c0;
  --footer-bg: #101110;
  --notifications-bg: #fff3cd;

  --text-color: #666;
  --text-color-secondary: #696969;
  --text-color-muted: #aaa;
  --text-color-inverse: #fff;
  
}

html, body {
  height: 100%;
  width: 100%;
}
body {
  font-family: sans-serif;
  font-size: 13px;
  color: var(--text-color);
  margin: 0;
}

*, :after, :before {
  box-sizing: border-box;
}

#app {
  font-family: sans-serif;
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeSpeed;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
  color: var(--text-color);
}

#content-container {
  padding-top: var(--navbar-height);
  margin-left: var(--sidebar-normal);
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: all 0.4s;
}

#footer {
  background-color: var(--footer-bg);
  border-top: 1px solid var(--outline);
  padding: 5px 10px;
  text-align: right;
}

/* BEGIN GLOBAL UTILITY STYLES */

img.img-circle {
  border-radius: 50%;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.no-wrap { white-space: nowrap; }
.no-padding { padding: 0 !important; }
.no-margin { margin: 0 !important; }
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-muted { color: var(--text-color-muted); }

.clickable { cursor: pointer; }
.no-select { user-select: none; }
.overflow-hidden { overflow: hidden; }
.transition-all { transition: all 0.4s; }
.ml-auto { margin-left: auto; }
.mr-auto { margin-right: auto; }
.float-left { float: left; }
.float-right { float: right; }

/* END GLOBAL UTILITY STYLES */

/* BEGIN FLEXBOX ALIAS CLASSES */

.flex-flex { display: flex; }
.flex-column { flex-direction: column; }
.flex-grow-1 { flex-grow: 1; }
.flex-shrink-1 { flex-shrink: 1; }
.flex-1-1-auto { flex: 1 1 auto; }
.flex-none { flex: none; }
.flex-wrap { flex-wrap: wrap; }
.flex-align-self-center { align-self: center; }
.flex-align-self-end { align-self: flex-end; }
.flex-align-self-stretch { align-self: stretch; }
.flex-align-items-stretch { align-items: stretch; }
.flex-align-items-center { align-items: center; }
.flex-align-items-end { align-items: end; }
.flex-align-content-center { align-content: center; }
.flex-align-content-stretch { align-content: stretch; }
.flex-align-content-end { align-content: end; }
.flex-justify-content-between { justify-content: space-between; }
.flex-justify-content-evenly { justify-content: space-evenly; }
.flex-justify-content-start { justify-content: flex-start; }
.flex-justify-content-end { justify-content: flex-end; }
.flex-justify-content-center { justify-content: center; }
.flex-justify-content-around { justify-content: space-around; }

/* END FLEXBOX ALIAS CLASSES */

</style>
