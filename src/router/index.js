/* global Vue */
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Charts from '../pages/Charts.vue';
import Buttons from '../pages/Buttons.vue';
import Pickers from '../pages/Pickers.vue';
import Pills from '../pages/Pills.vue';
import Inputs from '../pages/Inputs.vue';
import TextInputs from '../pages/TextInputs.vue';
import SearchInput from '../pages/SearchInput.vue';
import Containers from '../pages/Containers.vue';
import ContainerContainer from '../pages/ContainerContainer.vue';
import CardContainer from '../pages/CardContainer.vue';
import ColumnContainer from '../pages/ColumnContainer.vue';
import PanelContainer from '../pages/PanelContainer.vue';
import Popups from '../pages/Popups.vue';
import SankeyCharts from '../pages/SankeyCharts.vue';
import AreaChart from '../pages/AreaChart.vue';
import DataContainers from '../pages/DataContainers.vue';
import Table from '../pages/Table.vue';
import ObjectBrowser from '../pages/ObjectBrowser.vue';
import ForceGraph from '../pages/ForceGraph.vue';
import Typography from '../pages/Typography.vue';

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
        title: 'Containers',
        sidebar: true,
        icon: 'boxes',
      },
      name: 'containers',
      path: '/containers',
      component: Containers,
      children: [
        {
          meta: {
            title: 'Container',
            sidebar: true,
          },
          name: 'container',
          path: 'container',
          component: ContainerContainer,
        },
        {
          meta: {
            title: 'Cards',
            sidebar: true,
          },
          name: 'card-container',
          path: 'card-container',
          component: CardContainer,
        },
        {
          meta: {
            title: 'Columns',
            sidebar: true,
          },
          name: 'column-container',
          path: 'column-container',
          component: ColumnContainer,
        },
        {
          meta: {
            title: 'Panels',
            sidebar: true,
          },
          name: 'panel-container',
          path: 'panel-container',
          component: PanelContainer,
        },
      ],
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
        },
        {
          meta: {
            title: 'Force Graph',
            sidebar: true,
          },
          name: 'force-graph',
          path: 'force-graph',
          component: ForceGraph,
        },
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
        title: 'Typography',
        sidebar: true,
        icon: 'font',
      },
      name: 'typography',
      path: '/typography',
      component: Typography,
    },
    {
      meta: {
        title: 'Data Containers',
        sidebar: true,
        icon: 'table',
      },
      name: 'datacontainers',
      path: '/datacontainers',
      component: DataContainers,
      children: [
        {
          meta: {
            title: 'Table',
            sidebar: true,
          },
          name: 'table',
          path: 'table',
          component: Table,
        },
        {
          meta: {
            title: 'Object Browser',
            sidebar: true,
          },
          name: 'object-browser',
          path: 'object-browser',
          component: ObjectBrowser,
        },
      ]
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
        },
        {
          meta: {
            title: 'Search',
            sidebar: true,
          },
          name: 'search',
          path: 'search',
          component: SearchInput,
        },
      ]
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

