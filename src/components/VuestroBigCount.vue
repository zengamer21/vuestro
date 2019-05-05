<template>
  <vuestro-panel :color="color">
    <div class="vuestro-big-count-title">{{ title }}</div>
    <icon class="vuestro-big-count-icon" v-if="icon" :name="icon"></icon>
    <div class="vuestro-big-count-value">{{ data[0] | vuestroCommas }}</div>
  </vuestro-panel>
</template>

<script>

/* globals _ */
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroBigCount',
  components: {
    Icon,
  },
  props: {
    data: { type: Array, default: 0 },
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

.vuestro-big-count-title {
  color: var(--vuestro-white);
  font-size: 24px;
  padding-top: 5px;
  padding-left: 8px;
  font-weight: 300;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
}

.vuestro-big-count-value {
  position: absolute;
  right: 0px;
  bottom: 12px;
  color: var(--vuestro-white);
  padding-right: 15px;
  font-size: 36px;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
}

.vuestro-big-count-icon {
  color: var(--vuestro-white);
  position: absolute;
  left: 15px;
  bottom: 12px;
  width: 36px;
  height: 36px;
}

</style>