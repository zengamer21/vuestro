<template>
  <vuestro-breadcrumb :pages="pages"></vuestro-breadcrumb>
</template>

<script>

/* global Vue */
import Home from '@/pages/breadcrumb/Home';
Vue.component('Home', Home);

export default {
  name: 'ContainersBreadcrumb',
  data() {
    return {
      pages: [
        {
          component: 'home',
          data: [],
          options: {},
        },
      ],
    };
  },
  mounted() {
  }
};

</script>