<template>
  <span class="vuestro-pill"
       :class="[ size, { clickable, closable, shadow, draggable, geopattern }]"
       @click="onClick">
    <div v-if="!$slots.title" class="vuestro-pill-title" :class="{ autoCapital }"
         :style="titleStyle">
      {{ titleComputed }}
    </div>
    <div v-if="$slots.title"
         class="vuestro-pill-title vuestro-pill-slot"
         :class="$slots['title-buttons'] ? ['vuestro-pill-title-no-right']:[]"
         :style="titleStyle">
      <div v-if="$slots.icon" class="vuestro-pill-icon-slot">
        <slot name="icon"></slot>
      </div>
      <slot name="title"></slot>
      <div v-if="$slots['title-buttons']" class="vuestro-pill-button-slot">
        <slot name="title-buttons"></slot>
      </div>
    </div>
    <div v-if="value" ref="theText" class="vuestro-pill-value">{{ value }}</div>
    <div v-if="$slots.value"
         class="vuestro-pill-value vuestro-pill-slot">
      <slot name="value"></slot>
    </div>
    <div v-if="closable">
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
    size: { type: String, default: 'md' },
    title: { type: null },
    value: { type: null },
    color: { type: String, default: null },
    closable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    draggable: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    geopattern: { type: Boolean, default: false },
  },
  data() {
    return {
      autoCapital: false,
    };
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
        this.autoCapital = true;
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
  --vuestro-pill-radius: 999px;
  --vuestro-pill-value-background: var(--vuestro-widget-light-bg);
}
.vuestro-dark {
  --vuestro-pill-value-background: var(--vuestro-gray-med);
}

</style>

<style scoped>

.vuestro-pill {
  background-color: var(--vuestro-pill-value-background);
  transition: background-color 0.4s;
  border-radius: var(--vuestro-pill-radius);
  flex: 0 1 auto;
  display: flex;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
}
.vuestro-pill.sm {
  line-height: var(--vuestro-control-sm-height);
  font-size: calc(var(--vuestro-control-sm-height)/1.7);
}
.vuestro-pill.md {
  line-height: var(--vuestro-control-md-height);
  font-size: calc(var(--vuestro-control-md-height)/1.8);
}
.vuestro-pill.lg {
  line-height: var(--vuestro-control-lg-height);
  font-size: calc(var(--vuestro-control-lg-height)/1.9);
}
.vuestro-pill.xl {
  line-height: var(--vuestro-control-xl-height);
  font-size: calc(var(--vuestro-control-xl-height)/2);
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
  min-width: var(--vuestro-control-sm-height);
}
.vuestro-pill.md .vuestro-pill-title {
  min-width: var(--vuestro-control-md-height);
}
.vuestro-pill.lg .vuestro-pill-title {
  min-width: var(--vuestro-control-lg-height);
}
.vuestro-pill.xl .vuestro-pill-title {
  min-width: var(--vuestro-control-xl-height);
}
.vuestro-pill-title {
  text-align: center;
  background-color: var(--vuestro-primary);
  color: var(--vuestro-text-color-inverse);
  border-radius: var(--vuestro-pill-radius);
  padding-left: 0.6em;
  padding-right: 0.6em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-pill-title.autoCapital {
  padding: 0;
}
.vuestro-pill-title-no-right {
  padding-right: 0;
}
/* add slight overlap for multiple buttons so they don't take up as much space */
.vuestro-pill-button-slot {
  display: flex;
}
.vuestro-pill-button-slot > .vuestro-button:not(:first-child) {
  margin-left: -0.3em;
}

.vuestro-pill-value {
  padding-left: 0.33em;
  padding-right: 0.5em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
	color: var(--vuestro-text-color);
}
.vuestro-pill.closable .vuestro-pill-value {
  padding-right: 0.33em;
}

.vuestro-pill-slot {
  display: flex;
  align-items: center;
}
.vuestro-pill-title.vuestro-pill-slot {
  justify-content: center;
}
.vuestro-pill-icon-slot {
  margin-right: 0.3em;
}

.vuestro-pill-value.vuestro-pill-slot {
  flex-grow: 1;
}

.vuestro-pill.geopattern .vuestro-pill-title {
  background-repeat: repeat;
}

</style>