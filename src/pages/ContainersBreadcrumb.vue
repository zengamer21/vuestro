<template>
  <vuestro-breadcrumb :pages="pages"></vuestro-breadcrumb>
</template>

<script>

import Home from '@/pages/breadcrumb/Home';
import Edit from '@/pages/breadcrumb/Edit';

export default {
  name: 'ContainersBreadcrumb',
  data() {
    return {
      pages: [
        {
          title: 'Home',
          icon: 'home',
          id: 'home',
          component: Home,
          data: [
            {
              firstName: 'Trent',
              lastName: 'Wilson',
              phone: '5553344232',
              email: 'goodtime@club.net',
              subObject: {
                subField1: 33,
                subField2: 'test1',
              }
            },
            {
              firstName: 'Ashley',
              lastName: 'Dobson',
              phone: '5553728112',
              email: 'youwish@gmail.com',
              subObject: {
                subField1: 12,
                subField2: 'test2',
              }
            },
            {
              firstName: 'Grace',
              lastName: 'Johnson',
              phone: '5552918382',
              email: 'oldmaid@caring.org',
              subObject: {
                subField1: 4,
                subField2: 'test3',
              }
            },
            {
              firstName: 'Trent',
              lastName: 'Washington',
              phone: '5558382833',
              email: 'justintime@ymail.net',
              subObject: {
                subField1: 25,
                subField2: 'test4',
              }
            },
          ],
          options: {

          },
        },
        {
          title: 'Edit',
          id: 'edit',
          component: Edit,
        }
      ],
    };
  },
  mounted() {
  }
};

</script>