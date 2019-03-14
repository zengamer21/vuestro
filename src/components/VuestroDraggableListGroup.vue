<template>
  <div class="vuestro-draggable-list-group">
    <list-group-toggle :title="title"
                       :expanded="expanded"
                       @toggle="groupToggle">
    </list-group-toggle>

    <div class="list-container" v-if="expanded">
      <draggable v-model="localItems"
                 :options="{ group: {
                               name: groupName,
                               pull: 'clone',
                               put: false
                             },
                             sort: sortable,
                           }"
                 :clone="getClone">
        <div class="list-item"
             v-for="item in localItems" :key="item.id"
             :class="{ disabled: item.disabled || disabled }">
          <slot :item="item"></slot>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>

/* global _ */
import draggable from 'vuedraggable';
import VuestroListGroupToggle from './VuestroListGroupToggle.vue';

export default {
  name: 'VuestroDraggableListGroup',
  components: {
    draggable,
    VuestroListGroupToggle,
  },
  props: {
    id: { type: String, default: '' },
    title: { type: String, required: true },
    items: { type: Array, required: true },
    disabled: { type: Boolean, default: false },
    sortable: { type: Boolean, default: false },
    groupName: { type: String, default: 'items' }, // must match group name on other draggable list
    startExpanded: { type: Boolean, default: false },
  },
  computed: {
    localItems: {
      cache: false,
      get() {
        // apply preferred order if set
        if (this.order.length > 0) {
          let ret = _.sortBy(this.items, (item, index) => {
            let idxPreferred = this.order.indexOf(item.id);
            if (idxPreferred < 0) {
              return Infinity;
            }
            return idxPreferred;
          });
          return ret;
        } else {
          return this.items;
        }
      },
      set(newVal) {
        if (this.sortable) {
          this.order = _.flatMap(newVal, 'id');
          if (this.id.length == 0) {
            console.error('attempting to use sortable without id set');
            return;
          }
          // send new order to kvp store
          this.$store.dispatch('setKvp', {
            key: this.orderKey,
            value: this.order,
          });
        }
      }
    },
  },
  data() {
    return {
      orderKey: `${this.id}_${this.title}_order`, // kvp store key
      order: [], // default value

      expandedKey: `${this.id}_${this.title}_expanded`, // kvp store key
      expanded: this.startExpanded, // default value
    };
  },
  beforeMount() {
    this.loadState();
    // trigger reload of kvps when they are changed
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'kvpSet') {
        this.loadState();
      }
    });
  },
  methods: {
    loadState() {
      // load any existing kvp store values
      let expanded = this.$store.getters.getKvp(this.expandedKey);
      if (expanded !== undefined) {
        this.expanded = expanded;
      }
      let order = this.$store.getters.getKvp(this.orderKey);
      if (order !== undefined) {
        this.order = order;
      }
    },
    groupToggle(newVal) {
      this.expanded = newVal;
      // save to kvp store
      this.$store.dispatch('setKvp', {
        key: this.expandedKey,
        value: this.expanded,
      });

      // emit event so app can resize if needed
      this.$emit('toggle');
    },
    getClone(e) {
      return _.cloneDeep(e);
    },
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

.list-item:not(.disabled):hover {
  background-color: var(--primary);
  cursor: pointer;
  color: white;
}

.list-item.disabled {
  pointer-events: none;
  filter: brightness(120%);
}

</style>