<template>
  <vuestro-panel class="vuestro-stat-panel" :style="style" frame>
    <vuestro-container gutter="none" no-wrap>
      <div class="vuestro-stat-panel-title drag">{{ title }}</div>
      <div class="vuestro-stat-panel-buttons">
        <slot name="buttons"></slot>
      </div>
    </vuestro-container>
    <vuestro-container content="flex-end"
                       :class="{ 'vuestro-stat-panel-clickable': options.clickRoute }"
                       @click="onClick">
      <vuestro-icon class="vuestro-stat-panel-icon" v-if="icon" :name="icon"></vuestro-icon>
      <div class="vuestro-stat-panel-value">
        <template v-if="data.length > 0">
          {{ data[data.length-1][valuefield] | filterProxy(render) }}
        </template>
        <vuestro-icon v-else name="spinner" pulse scale="2"></vuestro-icon>
      </div>
    </vuestro-container>
  </vuestro-panel>
</template>

<script>

/* globals _, Vue */

export default {
  name: 'VuestroStatPanel',
  props: {
    data: { type: Array, required: true }, // needs to contain object(s) with "stat" field
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      title: 'Default Title',
      color: 'var(--vuestro-primary)',
      icon: null,
      render: Vue.filter('vuestroCommas'),
      showLoading: true,
      valuefield: 'stat',
    };
  },
  computed: {
    style() {
      return {
        '--vuestro-panel-bg': this.color,
      };
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  methods: {
    onClick() {
      if (this.options.clickRoute) {
        this.$router.push({ name: this.options.clickRoute });
      }
    },
  },
  filters: {
    filterProxy(value, renderer) {
      if (renderer) {
        return renderer(value);
      } else {
        return value;
      }
    }
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-stat-panel-fg: white;
  --vuestro-stat-panel-font-size: 24px;
  --vuestro-stat-panel-font-weight: 300;
  --vuestro-stat-panel-value-font-size: 36px;
}
.vuestro-app.mobile {
  --vuestro-stat-panel-font-size: 32px;
}

</style>
<style scoped>

.vuestro-stat-panel-title {
  color: var(--vuestro-stat-panel-fg);
  font-size: var(--vuestro-stat-panel-font-size);
  padding-top: 0.3em;
  padding-left: 0.4em;
  font-weight: var(--vuestro-stat-panel-font-weight);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
  cursor: default;
}
.vuestro-stat-panel-value {
  color: var(--vuestro-stat-panel-fg);
  margin-left: auto;
  font-size: var(--vuestro-stat-panel-value-font-size);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
}
.vuestro-stat-panel-clickable {
  cursor: pointer;
}

.vuestro-stat-panel-icon {
  color: var(--vuestro-stat-panel-fg);
  margin-left: 0.4em;
}
.vuestro-stat-panel-icon >>> svg {
  width: 2em;
  height: 2em;
}

.vuestro-stat-panel-buttons {
  margin-left: auto;
  display: flex;
  align-items: flex-start;
}

</style>