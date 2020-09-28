<template>
  <div class="vuestro-dropdown"
       :class="{ disabled, stretch }"
       v-vuestro-blur="onBlur"
       :style="{ 'z-index': active ? 200:100 }">
    <div class="vuestro-dropdown-inner" @mouseleave="onLeave" :class="{ dark, active, noSpacing, noScroll, rounded, bottom, clickToOpen, stretch }">
      <div v-if="$slots.title" class="vuestro-dropdown-title" @mouseover="onHover" @click="onClick">
        &#8203;<slot name="title"></slot>&#8203;
      </div>
      <div class="vuestro-dropdown-button" v-else-if="$slots.button">
        <slot name="button"></slot>
      </div>
      <div ref="content"
           class="vuestro-dropdown-menu"
           :style="{ visibility: active ? 'visible':'hidden', opacity: active ? '1':'0' }"
           :class="{ left, bottom }">
        <div class="vuestro-dropdown-menu-content" @click="onContentClick">
          <slot></slot>
        </div>
        <div class="vuestro-dropdown-menu-buttons" v-if="$slots.buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroDropdown',
  props: {
    alwaysOpen: { type: Boolean, default: false },
    clickToOpen: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    right: { type: Boolean, default: false }, // force right justification
    noSpacing: { type: Boolean, default: false },
    noScroll: { type: Boolean, default: false },
    closeOnContentClick: { type: Boolean, default: false },
    stretch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      left: true, // left justified
      bottom: true, // default to bottom position
      active: this.alwaysOpen,
    };
  },
  mounted() {
    // if VuestroButton was used as activator, wire up its events
    this.$nextTick(() => {
      if (this.$slots.button) {
        this.$children[0].$on('click', () => {
          this.onClick();
        });
        this.$children[0].$on('hover', () => {
          this.onHover();
        });
      }
    });
    // see if menu would go offscreen so we can flip it horizontally
    if (this.$refs.content.getBoundingClientRect().right > window.innerWidth) {
      this.left = false;
    }
    // see if menu would go offscreen so we can flip it vertically
    if (this.$refs.content.getBoundingClientRect().bottom > window.scrollHeight) {
      this.bottom = false;
    }
    // see if right-justify was specified
    if (this.right) {
      this.left = false;
    }
  },
  methods: {
    onHover() {
      if (!this.clickToOpen) {
        this.active = true;
        this.$emit('hover');
      }
    },
    onLeave() {
      if (!this.clickToOpen) {
        this.active = this.alwaysOpen;
        this.$emit('leave');
      }
    },
    onClick() {
      if (this.clickToOpen) {
        if (this.active) {
          this.active = this.alwaysOpen;
          this.$emit('leave');
        } else {
          this.active = true;
          this.$emit('hover');
        }
      }
    },
    onBlur() {
      if (this.clickToOpen) {
        this.active = this.alwaysOpen;
        this.$emit('leave');
      }
    },
    onContentClick() {
      if (this.closeOnContentClick) {
        this.onBlur();
      }
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-dropdown-outline: transparent;
  --vuestro-dropdown-title-bg: var(--vuestro-popup-bg);
  --vuestro-dropdown-title-fg: var(--vuestro-popup-fg);
  --vuestro-dropdown-content-bg: var(--vuestro-popup-bg);
  --vuestro-dropdown-content-fg: var(--vuestro-popup-fg);
  --vuestro-dropdown-buttons-bg: var(--vuestro-primary);
  --vuestro-dropdown-buttons-fg: var(--vuestro-text-color-inverse);
}
.vuestro-dark {
  --vuestro-dropdown-outline: var(--vuestro-outline);
}

</style>

<style scoped>

.vuestro-dropdown {
  position: relative;
  cursor: default;
  display: flex;
  align-self: center;
}
.vuestro-dropdown.stretch {
  flex-grow: 1;
  align-self: stretch;
}
.vuestro-dropdown.disabled {
  pointer-events: none;
}
.vuestro-dropdown-inner {
  display: flex;
  height: 100%;
  /* ensure dropdown is always visible, also make sure z-index of parent is set high enough for overlap */
  overflow: visible !important;
  position: relative;
}

.vuestro-dropdown-inner.dark {
  --vuestro-dropdown-outline: var(--vuestro-outline)
}

.vuestro-dropdown-title {
  border: var(--vuestro-rounded-border-width) solid transparent;
  border-top: none;
  position: relative;
  padding: 2px 6px;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  user-select: none;
}
.vuestro-dropdown-inner.bottom .vuestro-dropdown-title {
  border-top: var(--vuestro-rounded-border-width) solid transparent;
  border-bottom: none;
}
.vuestro-dropdown-inner.noSpacing .vuestro-dropdown-title {
  padding: 0;
}
.vuestro-dropdown-inner.rounded .vuestro-dropdown-title {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.vuestro-dropdown-inner.stretch,
.vuestro-dropdown-inner.stretch .vuestro-dropdown-title {
  flex-grow: 1;
}

.vuestro-dropdown-inner.active .vuestro-dropdown-title {
  background-color: var(--vuestro-dropdown-title-bg);
  border-color: var(--vuestro-dropdown-outline);
  color: var(--vuestro-dropdown-title-fg);
}

.vuestro-dropdown-title >>> .vuestro-icon:not(:only-child) {
  margin-right: 4px;
}
.vuestro-dropdown-inner.clickToOpen .vuestro-dropdown-title {
  cursor: pointer;
}
.vuestro-dropdown-inner.dark .vuestro-dropdown-title {
  color: var(--vuestro-dropdown-title-fg);
}

.vuestro-dropdown-button {
  align-self: center;
  position: relative;
  flex-grow: 1;
}
.vuestro-dropdown-button >>> .vuestro-button-inner {
  flex-grow: 1;
}

.vuestro-dropdown-menu {
  background: var(--vuestro-dropdown-content-bg);
  color: var(--vuestro-dropdown-content-fg);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  position: absolute;
  bottom: calc(100% - 1px);
  right: 0px;
  min-width: 160px;
  overflow: auto;
  border: var(--vuestro-rounded-border-width) solid var(--vuestro-dropdown-outline);
  z-index: -1;
}
.vuestro-dropdown-inner.noScroll .vuestro-dropdown-menu {
  overflow: visible;
}
.vuestro-dropdown-inner.rounded .vuestro-dropdown-menu {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.vuestro-dropdown-menu.left {
  left: 0px;
  right: initial;
}
.vuestro-dropdown-menu.bottom {
  bottom: initial;
  top: calc(100% - 1px);
}

.vuestro-dropdown-menu-content {
  padding: 8px;
}

.vuestro-dropdown-menu-buttons {
  border-top: 1px solid var(--vuestro-dropdown-outline);
  overflow: hidden;
  display: flex;
  cursor: pointer;
}
.vuestro-dropdown-inner.rounded .vuestro-dropdown-menu-buttons {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.vuestro-dropdown-menu-buttons > span {
  background-color: var(--vuestro-dropdown-buttons-bg);
  color: var(--vuestro-dropdown-buttons-fg);
  padding: 6px;
  flex-grow: 1;
  text-align: center;
}

.vuestro-dropdown-menu-buttons > span:not(:first-child) {
  border-left: 1px solid var(--vuestro-dropdown-outline);
}

.vuestro-dropdown-menu-buttons > span:hover {
  background-color: var(--vuestro-primary);
}

</style>