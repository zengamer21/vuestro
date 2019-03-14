<template>
  <div class="vuestro-draggable-searchable-list-group">
    <vuestro-list-group-toggle :title="title" :expanded="expanded" @toggle="groupToggle"></vuestro-list-group-toggle>

    <div v-if="expanded" class="flex-flex flex-column">
      <div class="flex-flex">
        <vuestro-search-box ref="search" :placeholder="`Search...`" history v-model="searchTerm" @input="onSearch"></vuestro-search-box>
        <span class="spinner" v-if="loading">
          <icon name="spinner" pulse></icon>
        </span>
      </div>

      <div v-if="searchTerm.length > 0" class="list-container">
        <draggable v-model="searchResults" :options="{group: {name: groupName, pull:'clone', put:false}, sort:false}" :clone="getClone" @start="drag=true" @end="drag=false">
          <div class="list-item" v-for="item in searchResults" :key="JSON.stringify(item)">
            <slot :item="item"></slot>
          </div>
        </draggable>
      </div>
      <div v-else class="list-container">
        <draggable v-model="items" :options="{group: {name: groupName, pull:'clone', put:false}, sort:false}" :clone="getClone" @start="drag=true" @end="drag=false">
          <div class="list-item" v-for="item in items" :key="JSON.stringify(item)">
            <slot :item="item"></slot>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>

/* global _ */
import draggable from 'vuedraggable';
import VuestroListGroupToggle from './VuestroListGroupToggle.vue';

export default {
  name: 'DraggableSearchableListGroup',
  components: {
    draggable,
    VuestroListGroupToggle,
  },
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    searchResults: { type: Array, required: true },
    groupName: { type: String, default: 'items' }, // must match group name on other draggable list
    startExpanded: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  data() {
    return {
      expanded: this.startExpanded,
      searchTerm: '',
    };
  },
  methods: {
    groupToggle(newVal) {
      this.expanded = newVal;
      // emit event so app can resize if needed
      this.$emit('toggle');
    },
    getClone(e) {
      return _.cloneDeep(e);
    },
    onSearch() {
      this.$emit('search', this.searchTerm);
    }
  },
};

</script>

<style scoped>

.list-container {
  padding: 2px 0 2px 5px;
}

.list-item {
  padding: 2px 0 2px 5px;
  border-radius: 2px;
  font-size: 13px;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-item:hover {
  background-color: var(--primary);
  cursor: pointer;
  color: var(--light);
}

.spinner {
  align-self: center;
  width: 16px;
  height: 16px;
}

</style>