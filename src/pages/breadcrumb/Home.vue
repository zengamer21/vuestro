<template>
  <vuestro-card>
    This is the Home View for the vuestro-breadcrumb example.

    <p>This page would contain the top-level data and view. Once the user clicks on something of interest, the view will change and the vuestro-breadcrumb component will keep track of the breadcrumb trail and provide links back up the trail.
    </p>

    <vuestro-panel>
      <vuestro-table :data="list">
        <template #row-buttons="{ item, index }">
          <vuestro-button round no-border @click="onEdit(item)">
            <vuestro-icon name="edit"></vuestro-icon>
          </vuestro-button>
          <vuestro-confirm-delete></vuestro-confirm-delete>
        </template>
      </vuestro-table>
    </vuestro-panel>

    <vuestro-card>
      <template #description>
        Implementation details
      </template>
      <span>Each view for this breadcrumb must be backed by a component. You need to define a <em>pages</em> array for the vuestro-breadcrumb component describing the possible states. Your subcomponent will them either emit <em>descend</em> or <em>ascend</em> to move within the stack. The vuestro-breadcrumb component will take care of jumping up in the stack in response to a user clicking a breadcrumb.</span>
    </vuestro-card>
  </vuestro-card>
</template>

<script>

import Edit from '@/pages/breadcrumb/Edit';

export default {
  name: 'Home',
  props: ['data', 'options'],
  data() {
    return {
      list: [
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
    };
  },
  methods: {
    getTitle() {
      return 'Home';
    },
    getIcon() {
      return 'home';
    },
    onEdit(item) {
      this.$emit('descend', {
        title: 'Edit',
        component: Edit,
        data: item,
        options: {},
      });
    },
    refresh() {
      console.log('refresh called');
    },
  }
};

</script>