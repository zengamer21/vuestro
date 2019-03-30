<template>
  <div class="vuestro-button"
       :class="[variant, { active, noBorder, noSpacing, pill, checkbox, disabled }]"
       @click="onClick">
    <div class="vuestro-button-content">
      <slot>
        <icon v-if="checkbox && active" name="check"></icon>
      </slot>
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
    active: { type: Boolean, default: false },
    checkbox: { type: Boolean, required: false },
    disabled: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    }
  }
};

</script>

<style scoped>

/* VARIANTS */
.vuestro-button.primary {
  --variant-color: var(--vuestro-primary);
}
.vuestro-button.secondary {
  --variant-color: var(--vuestro-secondary);
}
.vuestro-button.success {
  --variant-color: var(--vuestro-success);
}
.vuestro-button.warning {
  --variant-color: var(--vuestro-warning);
}
.vuestro-button.danger {
  --variant-color: var(--vuestro-danger);
}
.vuestro-button.info {
  --variant-color: var(--vuestro-info);
}
.vuestro-button.white {
  --variant-color: var(--vuestro-white);
  --variant-text-color: var(--vuestro-secondary);
}
.vuestro-button.black {
  --variant-color: var(--vuestro-black);
  --variant-text-color: var(--vuestro-black);
}
.vuestro-button.text {
  --variant-color: var(--vuestro-text-color);
  --variant-text-color: var(--vuestro-text-color);
}

.vuestro-button {
  font-weight: 600;
  text-transform: none;
  border: 1px solid var(--variant-color);
  padding: 2px 6px;
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
.vuestro-button-content {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.vuestro-button-content .fa-icon:not(:only-child) {
  margin-right: 3px;
}
.vuestro-button.disabled {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAABBJREFUCB1jYECA/zAmJgMANfEC/rnVBF8AAAAASUVORK5CYII="); background-repeat: repeat;
  pointer-events: none;
}
.vuestro-button.active,
.vuestro-button:hover {
  color: var(--vuestro-white);
  background-color: var(--variant-color);
}
.vuestro-button.white.active,
.vuestro-button.white:hover {
  color: var(--variant-text-color);
}
.vuestro-button.black.active,
.vuestro-button.black:hover {
  color: var(--vuestro-white);
}
.vuestro-button.text:hover {
  color: var(--variant-text-color);
  filter: brightness(150%);
  background-color: transparent;
}
.vuestro-button.link {
  color: var(--vuestro-primary);
  border-color: transparent;
}
.vuestro-button.link.active,
.vuestro-button.link:hover {
  filter: brightness(110%);
  background-color: transparent;
}

/* pill mode */
.vuestro-button.pill {
  min-width: 30px;
  margin: 0 2px;
  height: 17px;
  line-height: 17px;
  font-size: 11px;
  border-radius: 10px;
}
/* checkbox mode */
.vuestro-button.checkbox {
  width: 17px;
  height: 17px;
  line-height: 17px;
  padding: 0;
  border: 1px solid var(--vuestro-light);
  background-color: var(--vuestro-light);
  border-radius: 3px;
}
.vuestro-button.checkbox .fa-icon {
  width: 12px;
  height: 12px;
  margin-top: 1px;
}
.vuestro-button.checkbox:hover {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
}
.vuestro-button.checkbox.active {
  border-color: var(--variant-color);
  background-color: var(--variant-color);
  color: var(--vuestro-white);
}

</style>