<template>
  <vuestro-card-container>
    <vuestro-card color="#f47633">
      <template slot="heading">VuestroTable</template>
      <template slot="description">
        VuestroTable is a fully-reactive component which provides basic datatable functionality such as sort, while leveraging Vue slots to allow itself to be composed into a parent providing more complex functionality.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Basic table with auto-generated column names
      </template>
      <vuestro-panel>
        <vuestro-table :data="exampleData"></vuestro-table>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Specify columns array property to format column headers and provide options such as padding, sortable, sort (default direction), and a render function.
      </template>
      <vuestro-panel>
        <vuestro-table :columns="exampleColumns" :data="exampleData"></vuestro-table>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Provide a template for cells and headers through the cell/header slot. The slot scope object "item" contains a column specifier for headers and both the column specifier and row data item for cells.
      </template>
      <vuestro-panel>
        <vuestro-table :columns="exampleColumns" :data="exampleData">
          <template #header="{ item }">
            {{ item }}
          </template>
          <template #cell="{ item }">
            {{ item }}
          </template>
        </vuestro-table>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Specify "component" header property to use a Vue component to render a particular column
      </template>
      <vuestro-panel>
        <vuestro-table :columns="exampleColumns2" :data="exampleData"></vuestro-table>
      </vuestro-panel>
    </vuestro-card>


  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      exampleColumns: [
        {
          field: 'firstName',
          title: 'First Name',
          sortable: true,
        },
        {
          field: 'lastName',
          title: 'Last Name',
          sortable: true,
          sort: 'asc',
        },
        {
          field: 'phone',
          title: 'Phone No. (centered, filtered)',
          align: 'center',
          filter: Vue.filter('vuestroPhoneUS'),
        },
        {
          field: 'email',
          title: 'Email (right-justified, zero padding)',
          align: 'right',
          padding: 0,
        },
      ],
      exampleColumns2: [
        {
          field: 'firstName',
          title: 'First Name',
          sortable: true,
        },
        {
          field: 'lastName',
          title: 'Last Name',
          sortable: true,
        },
        {
          field: 'phone',
          title: 'Phone No. (centered, filtered)',
          align: 'center',
          filter: Vue.filter('vuestroPhoneUS'),
        },
        {
          field: 'email',
          title: 'Email (VuestroEditableText component)',
          align: 'right',
          component: 'VuestroEditableText',
        },
      ],
      exampleData: [
        {
          firstName: 'Trent',
          lastName: 'Wilson',
          phone: '5553344232',
          email: 'goodtime@club.net',
        },
        {
          firstName: 'Ashley',
          lastName: 'Dobson',
          phone: '5553728112',
          email: 'youwish@gmail.com',
        },
        {
          firstName: 'Grace',
          lastName: 'Johnson',
          phone: '5552918382',
          email: 'oldmaid@caring.org',
        },
        {
          firstName: 'Trent',
          lastName: 'Washington',
          phone: '5558382833',
          email: 'justintime@ymail.net',
        },
      ],
    };
  },
};

</script>

<style scoped>


</style>