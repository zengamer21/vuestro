<template>
  <div class="vuestro-dropdown"
       :class="{ disabled, stretch }"
       v-vuestro-blur="onBlur"
       :style="{ 'z-index': active ? 200:100 }">
    <div class="vuestro-dropdown-inner"
         @mouseleave="onLeave"
         :class="{ dark, active, noSpacing, noScroll, bottom, clickToOpen, stretch, button: !!$slots.button }">
      <div v-if="$slots.title" class="vuestro-dropdown-title" @mouseover="onHover" @click="onClick">
        &#8203;<slot name="title"></slot>&#8203;
      </div>
      <div class="vuestro-dropdown-button" v-else-if="$slots.button">
        <slot name="button"></slot>
      </div>
      <div ref="content"
           class="vuestro-dropdown-menu"
           :style="{ visibility: active ? 'visible':'hidden', 'max-height': maxHeight }"
           :class="{ left, bottom }">
        <div v-if="active" class="vuestro-dropdown-menu-content" @click="onContentClick">
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
    clickToOpen: { type: Boolean, default: false },
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
      holdOpen: false, // for programmatic open
      left: true,      // left justified
      bottom: true,    // default to bottom position
      active: false,   // open/close state
      maxHeight: '100vh', // default to full screen height
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
  },
  methods: {
    // the programmatic open method
    open() {
      this.holdOpen = true;
      this.activate();
    },
    openForMs(ms) {
      this.open();
      setTimeout(this.close, ms);
    },
    release() {
      this.holdOpen = false;
    },
    // the programmatic close method
    close() {
      this.holdOpen = false;
      this.deactivate();
    },
    // this is the internal activation method
    activate() {
      // set max height based on available vertical space
      let bcr = this.$refs.content.getBoundingClientRect();
      this.maxHeight = `${window.innerHeight - bcr.top}px`;
      // see if menu would go offscreen so we can flip it horizontally
      if (window.innerWidth - bcr.left < bcr.width*1.5) {
        this.left = false;
      }
      // see if right-justify was specified
      if (this.right) {
        this.left = false;
      }
      this.active = true;
    },
    deactivate() {
      this.active = false;
      this.$emit('leave');
    },
    onHover() {
      if (!this.clickToOpen) {
        this.activate();
      }
      this.$emit('hover');
    },
    onLeave() {
      if (!this.clickToOpen) {
        this.deactivate();
      }
    },
    onClick() {
      if (this.clickToOpen) {
        if (this.active) {
          this.deactivate();
        } else {
          this.activate();
        }
      }
    },
    onBlur() {
      if (!this.holdOpen && this.clickToOpen) {
        this.deactivate();
      }
    },
    onContentClick() {
      if (this.closeOnContentClick) {
        this.deactivate();
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
  border: var(--vuestro-control-border-width) solid transparent;
  border-top-left-radius: var(--vuestro-control-border-radius);
  border-top-right-radius: var(--vuestro-control-border-radius);
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
  border-top: var(--vuestro-control-border-width) solid transparent;
  border-bottom: none;
}
.vuestro-dropdown-inner.noSpacing .vuestro-dropdown-title {
  padding: 0;
}
.vuestro-dropdown-inner.stretch,
.vuestro-dropdown-inner.stretch .vuestro-dropdown-title {
  flex-grow: 1;
}

.vuestro-dropdown-inner.active .vuestro-dropdown-title,
.vuestro-dropdown-inner:hover .vuestro-dropdown-title {
  color: var(--vuestro-dropdown-title-fg);
}
.vuestro-dropdown-inner.active .vuestro-dropdown-title {
  background-color: var(--vuestro-dropdown-title-bg);
  border-color: var(--vuestro-dropdown-outline);
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
  max-height: 90vh;
  border: var(--vuestro-control-border-width) solid var(--vuestro-dropdown-outline);
  border-bottom-left-radius: var(--vuestro-control-border-radius);
  border-bottom-right-radius: var(--vuestro-control-border-radius);
  border-top-left-radius: var(--vuestro-control-border-radius);
  z-index: -1;
}
.vuestro-dropdown-inner.noScroll .vuestro-dropdown-menu {
  overflow: visible;
}
.vuestro-dropdown-inner.stretch .vuestro-dropdown-menu {
  right: 0;
  left: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.vuestro-dropdown-inner.button .vuestro-dropdown-menu {
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-dropdown-menu.left {
  left: 0px;
  right: initial;
  border-top-left-radius: 0;
  border-top-right-radius: var(--vuestro-control-border-radius);
}
.vuestro-dropdown-menu.bottom {
  bottom: initial;
  top: calc(100% - 1px);
}

.vuestro-dropdown-menu-content {
  padding: 0.4em;
}

.vuestro-dropdown-menu-buttons {
  border-top: 1px solid var(--vuestro-dropdown-outline);
  overflow: hidden;
  display: flex;
  cursor: pointer;
}
.vuestro-dropdown-inner.rounded .vuestro-dropdown-menu-buttons {
  border-bottom-left-radius: var(--vuestro-control-border-radius);
  border-bottom-right-radius: var(--vuestro-control-border-radius);
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