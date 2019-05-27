<template>
  <div class="vuestro-list-group">
    <vuestro-list-group-toggle :title="title"
                               :expanded="expanded"
                               @toggle="groupToggle">
    </vuestro-list-group-toggle>

    <div class="vuestro-list-container" v-if="expanded">
      <div class="vuestro-list-item" v-for="item in items" :key="JSON.stringify(item)">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>

import VuestroListGroupToggle from './VuestroListGroupToggle.vue';

export default {
  name: 'VuestroListGroup',
  components: {
    VuestroListGroupToggle,
  },
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    startExpanded: { type: Boolean, default: false },
  },
  data() {
    return {
      expanded: this.startExpanded,
    };
  },
  methods: {
    groupToggle(newVal) {
      this.expanded = newVal;
    },
  },
};

</script>

<style scoped>

.vuestro-list-item {
  padding: 0;
  font-size: 13px;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>