<template>
  <vuestro-card>
    This is the Home View for the vuestro-breadcrumb example.

    <p>This page would contain the top-level data and view. Once the user clicks on something of interest, the view will change and the vuestro-breadcrumb component will keep track of the breadcrumb trail and provide links back up the trail.
    </p>

    <vuestro-panel>
      <vuestro-table :data="data">
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

export default {
  name: 'Home',
  props: ['data', 'options'],
  methods: {
    onEdit(item) {
      this.$emit('descend', {
        id: 'edit',
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