/* global Vue */
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Charts from '../pages/Charts.vue';
import Buttons from '../pages/Buttons.vue';
import Pickers from '../pages/Pickers.vue';
import Pills from '../pages/Pills.vue';
import Inputs from '../pages/Inputs.vue';
import TextInputs from '../pages/TextInputs.vue';
import Containers from '../pages/Containers.vue';
import Popups from '../pages/Popups.vue';
import SankeyCharts from '../pages/SankeyCharts.vue';
import AreaChart from '../pages/AreaChart.vue';

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
      children: [
        {
          meta: {
            title: 'Area Chart',
            sidebar: true,
          },
          name: 'area-chart',
          path: 'area-chart',
          component: AreaChart,
        },
        {
          meta: {
            title: 'Sankey',
            sidebar: true,
          },
          name: 'sankey-charts',
          path: 'sankey-charts',
          component: SankeyCharts,
        }
      ]
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
        title: 'Pickers',
        sidebar: true,
        icon: 'hand-point-left',
      },
      name: 'pickers',
      path: '/pickers',
      component: Pickers,
    },
    {
      meta: {
        title: 'Popups',
        sidebar: true,
        icon: 'layer-group',
      },
      name: 'popups',
      path: '/popups',
      component: Popups,
    },
    {
      meta: {
        title: 'Pills',
        sidebar: true,
        icon: 'capsules',
      },
      name: 'pills',
      path: '/pills',
      component: Pills,
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

