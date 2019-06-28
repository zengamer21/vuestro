<template>
  <vuestro-panel stretch class="vuestro-stat-panel" :color="color">
    <div class="vuestro-stat-panel-title drag">{{ title }}</div>
    <icon class="vuestro-stat-panel-icon" v-if="icon" :name="icon"></icon>
    <div class="vuestro-stat-panel-value">{{ data[data.length-1].stat | vuestroCommas }}</div>
  </vuestro-panel>
</template>

<script>

/* globals _ */
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroStatPanel',
  components: {
    Icon,
  },
  props: {
    data: { type: Array, required: true }, // needs to contain object(s) with "stat" field
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      title: 'Default Title',
      color: 'var(--vuestro-primary)',
      icon: null,
    };
  },
  beforeMount() {
    _.merge(this, this.options);
  },
};

</script>

<style scoped>

.vuestro-stat-panel-title {
  color: var(--vuestro-white);
  font-size: 24px;
  padding-top: 5px;
  padding-left: 8px;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
  cursor: default;
}

.vuestro-stat-panel-value {
  position: absolute;
  right: 0px;
  bottom: 4px;
  color: var(--vuestro-white);
  padding-right: 15px;
  font-size: 36px;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
  cursor: default;
}

.vuestro-stat-panel-icon {
  color: var(--vuestro-white);
  position: absolute;
  left: 15px;
  bottom: 12px;
  width: 36px;
  height: 36px;
}

</style>