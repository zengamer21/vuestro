/* global Vue */

import Vuestro from './plugin';
Vue.use(Vuestro);

import App from './App.vue';
import router from './router';

// disable production tip
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
