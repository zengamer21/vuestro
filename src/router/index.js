/* global Vue */
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      meta: {
        title: 'Dashboard',
      },
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      sidebar: true,
      icon: 'tachometer-alt',
      props: true,
    },
    { path: '/*', redirect: '/dashboard' } // redirect to dashboard
  ]
});

