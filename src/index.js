/* global Vue */
import App from './App.vue';
import router from './router';

import Vuestro from './plugin';
Vue.use(Vuestro);

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
