<template>
  <vuestro-table :options="tableOptions" :data="data">
    <template #thead>
      <draggable tag="thead"
                 draggable=".vuestro-dynamic-table-header"
                 v-model="columns"
                 :options="{group:'vuestro-dynamic-table'}">
          <th v-for="item in columns" :key="item.id" class="vuestro-dynamic-table-header">
            <div class="vuestro-dynamic-table-pill-wrapper">
              <vuestro-pill draggable>
                <template #title>
                  {{ item.field }}
                </template>
                <template #title-buttons>
                  <vuestro-button round no-border variant="white" @click="removeColumn(item)">
                    <vuestro-icon name="times"></vuestro-icon>
                  </vuestro-button>
                </template>
              </vuestro-pill>
            </div>
          </th>
          <!--spacer for detail toggler caret-->
          <th slot="header"></th>
      </draggable>
    </template>
    <template #row="{ item }">
      <template v-for="c of checkColumn(item)">
        <td>{{ c }}</td>
      </template>
    </template>
    <template #detail="{ item }">
      <draggable class="vuestro-dynamic-table-pill-tray"
                 :value="Object.keys(item)"
                 :options="{ group: {
                               name: 'vuestro-dynamic-table',
                               pull: 'clone',
                               put: false
                             }
                           }"
                 :sort="false"
                 :clone="getHeader">
        <div class="vuestro-dynamic-table-pill-wrapper" v-for="(v, k) of item" :key="k+v">
          <vuestro-pill draggable>
            <template #title>{{ k }}</template>
            <template #value>{{ v }}</template>
          </vuestro-pill>
        </div>
      </draggable>
    </template>
  </vuestro-table>
</template>

<script>

/* global _ */
import draggable from 'vuedraggable';

export default {
  name: 'VuestroDynamicTable',
  components: {
    draggable,
  },
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({
      columns: [],
    })},
  },
  data() {
    return {
      columns: [],
      tableOptions: {
        transparentHeader: true,
      },
      numDefaultColumns: 5,
    };
  },
  watch: {
    data(newVal) {
      this.checkDefaultColumns();
    },
  },
  mounted() {
    this.checkDefaultColumns();
  },
  methods: {
    checkDefaultColumns() {
      // add some default columns if none were specified
      if (this.data && this.data.length > 0 &&
          this.options.columns && this.options.columns.length == 0) {
        let keys = Object.keys(this.data[0]);
        for (let i=0; i<this.numDefaultColumns; i++) {
          this.columns.push({
            field: keys[i],
            padding: 0,
            id: _.uniqueId(Date.now()),
          });
        }
      }
    },
    checkColumn(item) {
      let row = [];
      for (let c of this.columns) {
        row.push(item[c.field]);
      }
      return row;
    },
    removeColumn(item) {
      let idx = _.findIndex(this.columns, { field: item.field });
      this.columns.splice(idx, 1);
    },
    getHeader(d) {
      return {
        field: d,
        padding: 0,
        id: _.uniqueId(Date.now()),
      };
    },
  },
};

</script>

<style>

.vuestro-app {
}

</style>

<style scoped>

.vuestro-dynamic-table-pill-tray {
  display: flex;
  flex-wrap: wrap;
}

.vuestro-dynamic-table-pill-wrapper {
  display: flex;
  align-items: center;
}

.vuestro-table thead > .sortable-ghost {
  margin: 2px;
}
.vuestro-table thead > .sortable-ghost >>> .vuestro-pill-title {
  background-color: var(--vuestro-orange);
}
.vuestro-table thead > .sortable-ghost >>> .vuestro-pill-value {
  display: none;
}

</style>