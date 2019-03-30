/* global Vue */
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Charts from '../pages/Charts.vue';
import Buttons from '../pages/Buttons.vue';
import Inputs from '../pages/Inputs.vue';
import TextInputs from '../pages/TextInputs.vue';
import Containers from '../pages/Containers.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      meta: {
        title: 'Dashboard',
        sidebar: true,
        icon: 'tachometer-alt',
      },
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
    },
    {
      meta: {
        title: 'Charts',
        sidebar: true,
        icon: 'chart-area',
      },
      name: 'charts',
      path: '/charts',
      component: Charts,
    },
    {
      meta: {
        title: 'Buttons',
        sidebar: true,
        icon: 'th',
      },
      name: 'buttons',
      path: '/buttons',
      component: Buttons,
    },
    {
      meta: {
        title: 'Inputs',
        sidebar: true,
        icon: 'i-cursor',
      },
      name: 'inputs',
      path: '/inputs',
      component: Inputs,
      children: [
        {
          meta: {
            title: 'Text',
            sidebar: true,
          },
          name: 'inputs-text',
          path: 'inputs-text',
          component: TextInputs,
        }
      ]
    },
    {
      meta: {
        title: 'Containers',
        sidebar: true,
        icon: 'boxes',
      },
      name: 'containers',
      path: '/containers',
      component: Containers,
    },
    {
      meta: {
        title: 'Admin',
        sidebarBottom: true,
        icon: 'sliders-h',
      },
      name: 'admin',
      path: '/admin',

    },
    { path: '/*', redirect: '/dashboard' } // redirect to dashboard
  ]
});

