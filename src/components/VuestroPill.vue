<template>
  <span class="vuestro-pill"
       :class="{ clickable, shadow, draggable, geopattern }"
       :style="style"
       @click="onClick">
    <div v-if="!$slots.title" class="vuestro-pill-title"
         :style="titleStyle">
      {{ titleComputed }}
    </div>
    <div v-if="$slots.title"
         class="vuestro-pill-title vuestro-pill-slot"
         :class="$slots['title-buttons'] ? ['vuestro-pill-title-no-right']:[]"
         :style="titleStyle">
      <slot name="title"></slot>
      <slot name="title-buttons"></slot>
    </div>
    <div v-if="value" ref="theText" class="vuestro-pill-value">{{ value }}</div>
    <div v-if="$slots.value"
         class="vuestro-pill-value vuestro-pill-slot">
      <slot name="value"></slot>
    </div>
    <div v-if="closable" class="vuestro-pill-closer" @click="onClose">&times;</div>
  </span>
</template>

<script>

import GeoPattern from 'geopattern/geopattern.js';

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
    draggable: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    geopattern: { type: Boolean, default: false },
  },
  computed: {
    style() {
      return {
        '--size': this.size,
        '--radius': this.radius,
      };
    },
    titleStyle() {
      if (this.geopattern) {
        let text = this.$slots.title[0].text || this.title;
        return {
          'background-image': GeoPattern.generate(text).toDataUrl(),
        };
      }
      if (this.color) {
        return {
          'background-color': this.color,
        };
      }
    },
    titleComputed() {
      if (this.title) {
        return this.title;
      } else if (this.value) {
        return this.value.slice(0, 1).toUpperCase();
      } else {
        return '';
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
    },
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
.vuestro-pill.draggable {
  cursor: move;
}
.vuestro-pill.shadow {
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
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
.vuestro-pill-title-no-right {
  padding-right: 0;
}

.vuestro-pill-value {
  padding-left: calc(var(--size)/6);
  padding-right: calc(var(--size)/3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
	color: var(--vuestro-text-color);
}

.vuestro-pill-closer {
  margin-left: calc(var(--size)/-6);
  padding-right: calc(var(--size)/3);
  cursor: pointer;
}

.vuestro-pill-slot {
  display: flex;
  align-items: center;
}

.vuestro-pill.geopattern .vuestro-pill-title {
  background-repeat: repeat;
}

</style>