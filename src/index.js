/* global Vue */

import Vuestro from './plugin';
Vue.use(Vuestro);

import App from './App.vue';
import router from './router';
import axios from 'axios';

// disable production tip
Vue.config.productionTip = false;

console.log('VUESTRO DEV MODE');
let oldConsoleLog = console.log;
console.log = function() {
  axios.post('/vuestro-dev-console/log', [...arguments]);
  oldConsoleLog(...arguments);
};
let oldConsoleWarn = console.warn;
console.warn = function() {
  axios.post('/vuestro-dev-console/warn', [...arguments]);
  oldConsoleWarn(...arguments);
};
let oldConsoleError = console.error;
console.error = function() {
  axios.post('/vuestro-dev-console/error', [...arguments]);
  oldConsoleError(...arguments);
};
let oldConsoleInfo = console.info;
console.info = function() {
  axios.post('/vuestro-dev-console/info', [...arguments]);
  oldConsoleInfo(...arguments);
};

console.log('-> testing browser-side dev console forwarding');

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  data() {
    return {
      mobile: false, // $root flag for mobile mode
    };
  },
  components: {
    App
  }
});
