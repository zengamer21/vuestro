<template>
  <div class="vuestro-table">
    <table class="vuestro-table-table">
      <thead v-if="!noHeader" class="vuestro-table-header-row">
        <th v-for="column in headers"
            class="vuestro-table-header"
            :class="[ column.align && `vuestro-table-align-${column.align}` ]"
            :style="column.padding !== undefined && `padding: ${column.padding}px`">
          <slot v-if="$scopedSlots.header" name="header" :item="column"></slot>
          <template v-else>
            {{ column.title }}
            <span v-if="column.sortable"
                  class="vuestro-table-header-sort"
                  :class="{ active: isSortActive(column), desc: isSortDescending(column) }"
                  @click="onSort(column)">
              <vuestro-icon name="arrow-up"></vuestro-icon>
            </span>
          </template>
        </th>
        <th v-if="$scopedSlots['row-buttons']" class="vuestro-table-header"></th>
      </thead>
      <tbody>
        <tr v-if="sortedFilteredData.length === 0" class="vuestro-table-row">
          <td :colspan="headers.length" align="center">
            <slot name="no-data"></slot>
          </td>
        </tr>
        <tr v-for="row in sortedFilteredData" class="vuestro-table-row">
          <slot v-if="$scopedSlots.row" name="row" :item="row"></slot>
          <td v-else v-for="column in headers"
              class="vuestro-table-cell"
              :class="[ `vuestro-table-align-${column.align}`, column.classes]"
              :style="`padding: ${column.padding}px`">
            <slot v-if="$scopedSlots.cell" name="cell" :item="{ column, row }"></slot>
            <component v-else-if="column.component" :is="column.component" v-model="row[column.field]"></component>
            <template v-else>
              {{ row[column.field] | cellFilterProxy(column.render, row) }}
            </template>
          </td>
          <td>
            <slot name="row-buttons"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroTable',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      sort: [],
      filter: [],
      columns: null,
      noHeader: false,
    };
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    if (this.columns) {
      // add any columns with default sort to sort array, only on mount
      this.columns.forEach((k) => {
        if (k.sort) {
          this.sort.push({
            field: k.field,
            direction: k.sort,
          });
        }
      });
    }
  },
  computed: {
    headers() {
      if (this.columns) {
        return this.columns;
      } else {
        // auto-create headers from keys of first data items (assumes data is homogenous)
        if (this.data.length > 0) {
          let headers = [];
          Object.keys(this.data[0]).forEach((k) => {
            headers.push({
              title: k,
              field: k,
              align: 'left',
            });
          });
          return headers;
        }
        return []; // no data...no headers
      }
    },
    sortedFilteredData() {
      if (this.sort.length === 0 && this.filter.length === 0) {
        return this.data;
      } else {
        return _.orderBy(this.data, _.flatMap(this.sort, 'field'), _.flatMap(this.sort, 'direction'));
      }
    },
  },
  methods: {
    isSortActive(c) {
      return _.find(this.sort, { field: c.field });
    },
    isSortDescending(c) {
      return _.find(this.sort, { field: c.field, direction: 'desc' });
    },
    onSort(c) {
      let o = _.find(this.sort, { field: c.field });
      if (o) {
        this.toggleSortDirection(o);
      } else {
        this.sort.push({
          field: c.field,
          direction: 'asc',
        });
      }
    },
    toggleSortDirection(o) {
      if (o.direction === 'asc') {
        o.direction = 'desc';
      } else {
        // remove sort definition
        let idx = _.findIndex(this.sort, { field: o.field });
        this.sort.splice(idx, 1);
      }
    }
  },
  filters: {
    cellFilterProxy(value, renderer, row) {
      if (renderer) {
        return renderer(value, row);
      } else {
        return value;
      }
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-table-header-bg: transparent;
  --vuestro-table-header-fg: var(--vuestro-text-color-muted);
  --vuestro-table-header-fg-active: var(--vuestro-text-color);
  --vuestro-table-alternate-bg: rgba(10,9,8,0.02);
  --vuestro-table-hover-bg: rgba(10,9,8,0.06);
}

</style>

<style scoped>

.vuestro-table {
  flex-grow: 1;
}

.vuestro-table-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

.vuestro-table-header-row {
  background-color: var(--vuestro-table-header-bg);
}

.vuestro-table-header {
  text-align: left;
  padding: 12px;
  color: var(--vuestro-table-header-fg);
  font-weight: 500;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
.vuestro-table-header:hover {
  color: var(--vuestro-table-header-fg-active);
}
.vuestro-table-header.vuestro-table-align-right {
  text-align: right;
}
.vuestro-table-header.vuestro-table-align-center {
  text-align: center;
}
.vuestro-table-header-sort {
  color: var(--vuestro-table-header-fg);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s;
}
.vuestro-table-header-sort svg {
  width: 10px;
  height: 10px;
  transition: transform 0.4s;
}
.vuestro-table-header:hover .vuestro-table-header-sort {
  opacity: 1;
}
.vuestro-table-header-sort.active {
  opacity: 1;
  color: var(--vuestro-table-header-fg-active);
}
.vuestro-table-header-sort.desc svg {
  transform: rotate(180deg);
}

.vuestro-table-row {
  height: 30px;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  background-color: var(--vuestro-table-alternate-bg);
}
.vuestro-table-row:nth-child(even) {
  background-color: transparent;
}
.vuestro-table-row:last-child {
  border-bottom: none;
}
.vuestro-table-row:hover {
  background-color: var(--vuestro-table-hover-bg);
}

.vuestro-table-cell {
  padding: 16px;
}
.vuestro-table-cell.vuestro-table-align-right {
  text-align: right;
}
.vuestro-table-cell.vuestro-table-align-center {
  text-align: center;
}


</style>