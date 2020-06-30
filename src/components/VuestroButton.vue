<template>
  <div class="vuestro-button"
       :class="{ stretch }"
       @click="onClick">
    <div class="vuestro-button-inner"
         :class="[`vuestro-button-${variant}`,
                  size,
                  { dark, value, noBorder, noMargin, noPadding, round, pill, checkbox, disabled, rounded, shadow }]"
         @mouseover="onHover">
      <template v-if="checkbox">
        <template v-if="value">
          <div class="vuestro-button-content">
            <vuestro-icon v-if="checkbox && value" name="check"></vuestro-icon>
          </div>
        </template>
        <template v-else>
          <div class="vuestro-button-content" :style="{ 'justify-content': justify }"></div>
        </template>
      </template>
      <template v-else>
        <div class="vuestro-button-content" :style="{ 'justify-content': justify }">
          <span v-if="$slots.placeholder" class="vuestro-button-placeholder">
            <slot name="placeholder"></slot>
          </span>
          <span v-if="$slots.icon" class="vuestro-button-icon">
            <slot name="icon"></slot>
          </span>
          <slot></slot>
        </div>
      </template>
    </div>
    <div v-if="checkbox" class="vuestro-button-checkbox-text" :class="[ size ]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroButton',
  props: {
    variant: { type: String, default: 'secondary' },
    noBorder: { type: Boolean, default: false },
    noMargin: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
    checkbox: { type: Boolean, required: false },
    value: { type: Boolean, default: false }, // for v-model support
    disabled: { type: Boolean, default: false }, // no hover, no click
    pill: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    dark: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
    justify: { type: String, default: 'space-evenly' },
  },
  methods: {
    onClick(e) {
      if (this.disabled === false) {
        this.$emit('click', e);
        this.$emit('input', !this.value);
      }
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
  align-self: center;
  display: flex;
  align-items: center;
}

.vuestro-button-inner {
  text-transform: none;
  border: 1px solid var(--variant-color);
  margin: 2px;
  color: var(--variant-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
/* ripple effect */
.vuestro-button-inner:after {
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
.vuestro-button-inner:active:after {
  transform: scale(0,0);
  opacity: .2;
  transition: 0s;
}
.vuestro-button.stretch {
  align-self: stretch;
  flex-grow: 1;
}
.vuestro-button.stretch > .vuestro-button-inner {
  align-self: stretch;
  flex-grow: 1;
}
.vuestro-button-inner.rounded {
  border-radius: 3px;
}
.vuestro-button-inner.sm {
  padding: 1px 4px;
  font-size: 10px;
}
.vuestro-button-inner.md {
  padding: 2px 6px;
  font-size: 12px;
}
.vuestro-button-inner.lg {
  padding: 4px 8px;
  font-size: 14px;
}
.vuestro-button-inner.xl {
  padding: 7px 10px;
  font-size: 16px;
}
.vuestro-button-inner.noBorder {
  border: none;
}
.vuestro-button-inner.noMargin {
  margin: 0;
}
.vuestro-button-inner.noPadding {
  padding: 0;
}
.vuestro-button-inner.dark {
  background-color: var(--vuestro-widget-dark-bg);
}
.vuestro-button-inner.shadow {
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
}
.vuestro-button-inner >>> svg {
  width: 14px;
  height: 14px;
}
.vuestro-button-content {
  flex: 1 1 auto;
  display: flex;
  line-height: 1em;
  justify-content: center;
}
.vuestro-button-inner.tall .vuestro-button-content {
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 4px;
  align-items: center;
}
.vuestro-button-inner.tall >>> svg {
  width: 22px;
  height: 22px;
  margin: 6px;
}
.vuestro-button-inner.value:not(.disabled),
.vuestro-button-inner:hover {
  color: var(--vuestro-white);
  background-color: var(--variant-color);
}
.vuestro-button-inner.value:hover {
  filter: brightness(110%);
}
.vuestro-button-inner.disabled {
  pointer-events: none;
  image-rendering: pixelated;
  background-image: linear-gradient(to right top, transparent 45%, var(--variant-color) 45%, var(--variant-color) 55%, transparent 55%);
  background-size: 4px 4px;
  background-repeat: repeat;
}
.vuestro-button-inner.vuestro-button-white.value,
.vuestro-button-inner.vuestro-button-white:hover {
  color: var(--variant-text-color);
}
.vuestro-button-inner.vuestro-button-black.value,
.vuestro-button-inner.vuestro-button-black:hover {
  color: var(--vuestro-white);
}
.vuestro-button-inner.vuestro-button-text:hover {
  background-color: var(--variant-text-color);
  /*filter: invert(100%);*/
}
.vuestro-button-inner.vuestro-button-link {
  color: var(--vuestro-primary);
  border-color: transparent;
}
.vuestro-button-inner.vuestro-button-link.value,
.vuestro-button-inner.vuestro-button-link:hover {
  filter: brightness(120%);
  background-color: transparent;
}

/* round mode */
.vuestro-button-inner.round {
  border-radius: 50%;
  padding: 0;
}
.vuestro-button-inner.round .vuestro-button-content {
  overflow: hidden; /* make sure it centers properly */
}
.vuestro-button-inner.round.sm {
  height: calc(1em + 4px);
  width: calc(1em + 4px);
}
.vuestro-button-inner.noBorder.round.sm {
  height: calc(1em + 2px);
  width: calc(1em + 2px);
}
.vuestro-button-inner.sm >>> svg { /* shrink svgs a little for size=sm */
  width: 8px;
  height: 8px;
}
.vuestro-button-inner.round.md {
  height: calc(1em + 6px);
  width: calc(1em + 6px);
}
.vuestro-button-inner.noBorder.round.md {
  height: calc(1em + 4px);
  width: calc(1em + 4px);
}
.vuestro-button-inner.md >>> svg { /* shrink svgs a little for size=md */
  width: 10px;
  height: 10px;
}
.vuestro-button-inner.round.lg {
  height: calc(1em + 10px);
  width: calc(1em + 10px);
}
.vuestro-button-inner.noBorder.round.lg {
  height: calc(1em + 8px);
  width: calc(1em + 8px);
}
.vuestro-button-inner.lg >>> svg { /* enlarge svgs a little for size=lg */
  width: 12px;
  height: 12px;
}
.vuestro-button-inner.round.xl {
  height: calc(1em + 16px);
  width: calc(1em + 16px);
}
.vuestro-button-inner.noBorder.round.xl {
  height: calc(1em + 14px);
  width: calc(1em + 14px);
}
.vuestro-button-inner.xl >>> svg { /* enlarge svgs a little for size=xl */
  width: 16px;
  height: 16px;
}

/* pill mode */
.vuestro-button-inner.pill {
  border-radius: 999px;
}

/* checkbox mode */
.vuestro-button-inner.checkbox {
  width: 17px;
  height: 17px;
  line-height: 17px;
  padding: 0;
  border: 1px solid var(--vuestro-field-bg);
  background-color: var(--vuestro-field-bg);
  border-radius: 3px;
}
.vuestro-button-inner.checkbox:hover {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
}
.vuestro-button-inner.checkbox.value {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
  color: var(--vuestro-white);
}

/* styling for the separate text slot next to checkbox button */
.vuestro-button-checkbox-text {
  margin-left: 4px;
  margin-right: 10px;
  cursor: pointer;
}
.vuestro-button-checkbox-text.sm {
  font-size: 10px;
}
.vuestro-button-checkbox-text.md {
  font-size: 12px;
}
.vuestro-button-checkbox-text.lg {
  font-size: 14px;
}
.vuestro-button-checkbox-text.xl {
  font-size: 16px;
}

/* add a right margin when icon is paired anything else */
.vuestro-button-content .vuestro-icon:not(:only-child) {
  margin-right: 4px;
}

.vuestro-button-placeholder {
  text-transform: uppercase;
  margin-left: -2px;
  margin-right: 6px;
  font-size: 0.7em;
  font-weight: 500;
}

.vuestro-button-icon {
  margin-right: 4px;
  align-self: center;
}

</style>