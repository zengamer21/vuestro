<template>
  <span class="vuestro-pill"
       :class="[ size, { clickable, closable, shadow, draggable, geopattern }]"
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
    <div v-if="closable" class="vuestro-pill-closer">
      <vuestro-button no-margin :size="size" round no-border @click="onClose">
        <vuestro-icon name="times"></vuestro-icon>
      </vuestro-button>
    </div>
  </span>
</template>

<script>

/* global _ */
import GeoPattern from 'geopattern/geopattern.js';

export default {
  name: 'VuestroPill',
  props: {
    size: { type: String, default: 'lg' },
    title: { type: null },
    value: { type: null },
    color: { type: String, default: null },
    closable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    geopattern: { type: Boolean, default: false },
  },
  computed: {
    titleStyle() {
      if (this.geopattern) {
        let text = this.$slots.title[0].text || this.title;
        return {
          'background-image': GeoPattern.generate(text.trim()).toDataUrl(),
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
      } else {
        let v = this.value || this.$slots.value[0].text;
        if (v && _.isString(v)) {
          return v.trim().slice(0, 1).toUpperCase();
        } else {
          return '';
        }
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

<style>

.vuestro-app {
  --vuestro-pill-sm-height: 14px;
  --vuestro-pill-md-height: 18px;
  --vuestro-pill-lg-height: 24px;
  --vuestro-pill-xl-height: 32px;
  --vuestro-pill-radius: 999px;
}
.vuestro-app.mobile {
  --vuestro-pill-sm-height: 42px;
  --vuestro-pill-md-height: 50px;
  --vuestro-pill-lg-height: 64px;
  --vuestro-pill-xl-height: 74px;
}

</style>

<style scoped>

.vuestro-pill {
  background-color: var(--vuestro-widget-light-bg);
  border-radius: var(--vuestro-pill-radius);
  flex: 0 1 auto;
  display: flex;
  margin: 2px;
}
.vuestro-pill.sm {
  line-height: var(--vuestro-pill-sm-height);
  font-size: calc(var(--vuestro-pill-sm-height)/2);
}
.vuestro-pill.md {
  line-height: var(--vuestro-pill-md-height);
  font-size: calc(var(--vuestro-pill-md-height)/2);
}
.vuestro-pill.lg {
  line-height: var(--vuestro-pill-lg-height);
  font-size: calc(var(--vuestro-pill-lg-height)/2);
}
.vuestro-pill.xl {
  line-height: var(--vuestro-pill-xl-height);
  font-size: calc(var(--vuestro-pill-xl-height)/2);
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
.vuestro-pill.sm .vuestro-pill-title {
  min-width: var(--vuestro-pill-sm-height);
}
.vuestro-pill.md .vuestro-pill-title {
  min-width: var(--vuestro-pill-md-height);
}
.vuestro-pill.lg .vuestro-pill-title {
  min-width: var(--vuestro-pill-lg-height);
}
.vuestro-pill.xl .vuestro-pill-title {
  min-width: var(--vuestro-pill-xl-height);
}
.vuestro-pill-title {
  text-align: center;
  background-color: var(--vuestro-primary);
  color: var(--vuestro-light);
  border-radius: var(--vuestro-pill-radius);
  padding-left: calc(1em/3);
  padding-right: calc(1em/3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-pill-title-no-right {
  padding-right: 0;
}
/* add slight overlap for multiple buttons so they don't take up as much space */
.vuestro-pill-title > .vuestro-button:not(:first-child) {
  margin-left: -5px;
}

.vuestro-pill-value {
  padding-left: calc(1em/3);
  padding-right: calc(1em/2);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
	color: var(--vuestro-text-color);
}
.vuestro-pill.closable .vuestro-pill-value {
  padding-right: calc(1em/3);
}

.vuestro-pill-slot {
  display: flex;
  align-items: center;
}
.vuestro-pill-title.vuestro-pill-slot {
  justify-content: center;
}
.vuestro-pill-value.vuestro-pill-slot {
  flex-grow: 1;
}

.vuestro-pill.geopattern .vuestro-pill-title {
  background-repeat: repeat;
}

</style>