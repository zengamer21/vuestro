<template>
  <div class="vuestro-object-browser-item">
    <div v-for="(v, k) in data" :key="k">
      <div class="vuestro-object-browser-item-gutter">
        <vuestro-caret v-if="isObject(v) || isArray(v)" :collapsed="isCollapsed(k)" @click="toggleCollapse(k)"></vuestro-caret>
      </div>
      <div class="vuestro-object-browser-item-kv">
        <div class="vuestro-object-browser-item-key-title">{{ k }}:</div>
        <template v-if="isObject(v) || isArray(v)">
          <span v-if="isArray(v)">Array[{{ v.length }}]</span>
          <span v-else>Object[{{ Object.keys(v).length }}]</span>
          <div v-if="expanded.indexOf(k) >= 0" class="vuestro-object-browser-item-sub">
            <vuestro-object-browser-item :data="v"></vuestro-object-browser-item>
          </div>
        </template>
        <template v-else>
          <span v-if="isString(v)" class="vuestro-object-browser-item-string">{{ JSON.stringify(v) }}</span>
          <span v-if="isBoolean(v)" class="vuestro-object-browser-item-bool">{{ v }}</span>
          <span v-if="isDate(v)" class="vuestro-object-browser-item-date">{{ v.toISOString() }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroObjectBrowserItem',
  props: {
    data: { required: true },
  },
  data() {
    return {
      expanded: [],
    };
  },
  methods: {
    isCollapsed(d) {
      return this.expanded.indexOf(d) < 0;
    },
    isObject(d) {
      return _.isPlainObject(d);
    },
    isArray(d) {
      return _.isArray(d);
    },
    isBoolean(d) {
      return _.isBoolean(d);
    },
    isDate(d) {
      return _.isDate(d);
    },
    isString(d) {
      return _.isString(d);
    },
    toggleCollapse(d) {
      let idx = this.expanded.indexOf(d);
      if (idx < 0) {
        // add to expanded
        this.expanded.push(d);
      } else {
        // remove from expanded
        this.expanded.splice(idx, 1);
      }
    },
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-object-browser-key-fg: var(--vuestro-purple);
  --vuestro-object-browser-string-fg: var(--vuestro-orange);
  --vuestro-object-browser-bool-fg: var(--vuestro-blue);
  --vuestro-object-browser-date-fg: var(--vuestro-green);
}

</style>

<style scoped>

.vuestro-object-browser-item {
  padding: 4px;
}

.vuestro-object-browser-item > div {
  display: flex;
}

.vuestro-object-browser-item-gutter {
  width: 20px;
  padding-top: 2px;
}

.vuestro-object-browser-item-kv {
  padding-top: 2px;
  padding-bottom: 2px;
}

.vuestro-object-browser-item-key {
  display: flex;
}
.vuestro-object-browser-item-key-title {
  font-weight: 500;
  text-align: right;
  display: inline-block;
  min-width: 10px;
  color: var(--vuestro-object-browser-key-fg);
}

.vuestro-object-browser-item-string {
  color: var(--vuestro-object-browser-string-fg);
}

.vuestro-object-browser-item-bool {
  color: var(--vuestro-object-browser-bool-fg);
}

.vuestro-object-browser-item-date {
  color: var(--vuestro-object-browser-date-fg);
}

</style>