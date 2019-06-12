<template>
  <span class="vuestro-pill"
       :class="{ clickable }"
       :style="style"
       @click="onClick">
    <div class="vuestro-pill-title"
         :style="color ? { 'background-color': color }:{}">
      {{ titleComputed }}
    </div>
    <div v-if="value" ref="theText" class="vuestro-pill-value">{{ value }}</div>
    <div v-if="closable" class="vuestro-pill-closer" @click="onClose">&times;</div>
  </span>
</template>

<script>

export default {
  name: 'VuestroPill',
  props: {
    title: { type: null },
    value: { type: null },
    color: { type: String, default: null },
    size: { type: String, default: '24px' },
    radius: { type: String, default: '999px' },
    closable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
  },
  computed: {
    style() {
      return {
        '--size': this.size,
        '--radius': this.radius,
      };
    },
    titleComputed() {
      if (this.title) {
        return this.title;
      } else {
        return this.value.slice(0, 1).toUpperCase();
      }
    },
  },
  methods: {
    onClose(e) {
      this.$emit('close', e);
    },
    onClick(e) {
      if (this.clickable) { // only if set
        this.$emit('click', e);
      }
    }
  }
};

</script>

<style scoped>

.vuestro-pill {
  background-color: var(--vuestro-widget-light-bg);
  line-height: var(--size);
  border-radius: var(--radius);
  flex: 0 1 auto;
  display: flex;
  margin: 2px;
  font-size: calc(var(--size)/2);
}

.vuestro-pill.clickable {
  cursor: pointer;
}

.vuestro-pill-title {
  min-width: var(--size);
  text-align: center;
  background-color: var(--vuestro-primary);
  color: var(--vuestro-light);
  border-radius: var(--radius);
  padding-left: calc(var(--size)/3);
  padding-right: calc(var(--size)/3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.vuestro-pill-value {
  padding-left: calc(var(--size)/6);
  padding-right: calc(var(--size)/3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
}

.vuestro-pill-closer {
  margin-left: calc(var(--size)/-6);
  padding-right: calc(var(--size)/3);
  cursor: pointer;
}

</style>