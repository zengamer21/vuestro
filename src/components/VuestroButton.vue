<template>
  <div class="vuestro-button"
       :class="[`vuestro-button-${variant}`, size, { dark, value, noBorder, noSpacing, round, pill, checkbox, disabled, stretch, rounded }]"
       @click="onClick"
       @mouseover="onHover">
    <div class="vuestro-button-content">
      <template v-if="checkbox && value">
        <icon v-if="checkbox && value" name="check"></icon>
      </template>
      <template v-else>
        &#8203;<slot></slot>&#8203; <!-- magic zero-width chars to make icon-only buttons size like icon+text -->
      </template>
    </div>
  </div>
</template>

<script>

import 'vue-awesome/icons/check.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroButton',
  components: {
    Icon,
  },
  props: {
    variant: { type: String, default: 'secondary' },
    noBorder: { type: Boolean, default: false },
    noSpacing: { type: Boolean, default: false },
    checkbox: { type: Boolean, required: false },
    value: { type: Boolean, default: false }, // for v-model support
    disabled: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    dark: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
      this.$emit('input', !this.value);
    },
    onHover(e) {
      this.$emit('hover', e);
    },
  }
};

</script>

<style scoped>

/* VARIANTS */
.vuestro-button-primary {
  --variant-color: var(--vuestro-primary);
}
.vuestro-button-secondary {
  --variant-color: var(--vuestro-secondary);
}
.vuestro-button-success {
  --variant-color: var(--vuestro-success);
}
.vuestro-button-warning {
  --variant-color: var(--vuestro-warning);
}
.vuestro-button-danger {
  --variant-color: var(--vuestro-danger);
}
.vuestro-button-info {
  --variant-color: var(--vuestro-info);
}
.vuestro-button-white {
  --variant-color: var(--vuestro-white);
  --variant-text-color: var(--vuestro-secondary);
}
.vuestro-button-black {
  --variant-color: var(--vuestro-black);
  --variant-text-color: var(--vuestro-black);
}
.vuestro-button-text {
  --variant-color: var(--vuestro-text-color);
  --variant-text-color: var(--vuestro-text-color);
}

.vuestro-button {
  min-height: 16px;
  align-self: center;
  text-transform: none;
  border: 1px solid var(--variant-color);
  margin: 2px;
  color: var(--variant-color);
  cursor: pointer;
  display: flex;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
/* ripple effect */
.vuestro-button:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10,10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
.vuestro-button:active:after {
  transform: scale(0,0);
  opacity: .2;
  transition: 0s;
}
.vuestro-button.noBorder {
  border: none;
}
.vuestro-button.noSpacing {
  margin: 0;
}
.vuestro-button.stretch {
  align-self: stretch;
}
.vuestro-button.rounded {
  border-radius: 3px;
}
.vuestro-button.sm {
  padding: 0px 2px;
}
.vuestro-button.md {
  padding: 2px 6px;
}
.vuestro-button.lg {
  padding: 6px 10px;
}
.vuestro-button.dark {
  background-color: var(--vuestro-widget-dark-bg);
}
.vuestro-button-content {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-evenly;
}
.vuestro-button.disabled {
  pointer-events: none;
  background-image: repeating-linear-gradient(-45deg, transparent, transparent 6px, var(--variant-color) 6px, var(--variant-color) 7px);
}
.vuestro-button.value,
.vuestro-button:hover {
  color: var(--vuestro-white);
  background-color: var(--variant-color);
}
.vuestro-button.value:hover {
  filter: brightness(110%);
}
.vuestro-button.vuestro-button-white.value,
.vuestro-button.vuestro-button-white:hover {
  color: var(--variant-text-color);
}
.vuestro-button.vuestro-button-black.value,
.vuestro-button.vuestro-button-black:hover {
  color: var(--vuestro-white);
}
.vuestro-button.vuestro-button-text:hover {
  color: var(--variant-text-color);
  filter: brightness(150%);
  background-color: transparent;
}
.vuestro-button.vuestro-button-link {
  color: var(--vuestro-primary);
  border-color: transparent;
}
.vuestro-button.vuestro-button-link.value,
.vuestro-button.vuestro-button-link:hover {
  filter: brightness(120%);
  background-color: transparent;
}
/* round mode (need padding to be same) */
.vuestro-button.round {
  border-radius: 50%;
}
.vuestro-button.round.sm {
  padding: 2px;
}
.vuestro-button.round.md {
  padding: 5px;
}
.vuestro-button.round.lg {
  padding: 8px;
}
/* pill mode */
.vuestro-button.pill {
  border-radius: 999px;
}
/* checkbox mode */
.vuestro-button.checkbox {
  width: 17px;
  height: 17px;
  line-height: 17px;
  padding: 0;
  border: 1px solid var(--vuestro-field-bg);
  background-color: var(--vuestro-field-bg);
  border-radius: 3px;
}
.vuestro-button.checkbox .fa-icon {
  width: 11px;
  height: 11px;
  margin-top: 0px;
}
.vuestro-button.checkbox:hover {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
}
.vuestro-button.checkbox.value {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
  color: var(--vuestro-white);
}

.vuestro-button-content >>> svg {
  align-self: center;
}
.vuestro-button-content >>> svg:not(:only-child) {
  margin-right: 4px;
}

</style>