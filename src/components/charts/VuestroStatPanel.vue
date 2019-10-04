<template>
  <vuestro-panel class="vuestro-stat-panel" :color="color" frame>
    <div class="vuestro-stat-panel-title drag">{{ title }}</div>
    <vuestro-icon class="vuestro-stat-panel-icon" v-if="icon" :name="icon"></vuestro-icon>
    <div class="vuestro-stat-panel-value"
         :class="{ clickable: options.clickRoute }"
         @click="onClick">
      {{ data[data.length-1].stat | vuestroCommas }}
    </div>
  </vuestro-panel>
</template>

<script>

/* globals _ */

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
    };
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
.vuestro-stat-panel-value.clickable {
  cursor: pointer;
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