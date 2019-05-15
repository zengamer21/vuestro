<template>
  <div class="vuestro-dropdown" v-vuestro-blur="onBlur">
    <div class="vuestro-dropdown-inner" @mouseleave="onLeave" :class="{ dark, active, rounded, clickToOpen }">
      <div v-if="$slots.title" class="vuestro-dropdown-title" @mouseover="onHover" @click="onClick">
        &#8203;<slot name="title"></slot>&#8203;
      </div>
      <div class="vuestro-dropdown-button" v-else-if="$slots.button">
        <slot name="button"></slot>
      </div>
      <div ref="content"
           class="vuestro-dropdown-menu"
           :style="{ visibility: active ? 'visible':'hidden', opacity: active ? '1':'0' }"
           :class="{ left }">
        <div class="vuestro-dropdown-menu-content">
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
  },
  data() {
    return {
      left: true, // left justified
      active: this.alwaysOpen,
    };
  },
  mounted() {
    // if VuestroButton was used as activator, wire up it's events
    if (this.$slots.button) {
      this.$slots.button[0].componentInstance.$on('click', () => {
        this.onClick();
      });
      this.$slots.button[0].componentInstance.$on('hover', () => {
        this.onHover();
      });
    }
    // see if menu would go offscreen so we can flip it to right justified
    if (this.$refs.content.getBoundingClientRect().right > window.innerWidth) {
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
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-dropdown-outline: transparent;
}
.vuestro-dark {
  --vuestro-dropdown-outline: var(--vuestro-outline)
}

</style>

<style scoped>

.vuestro-dropdown {
  z-index: 100;
  height: 100%;
  position: relative;
  cursor: default;
}
.vuestro-dropdown-inner {
  height: 100%;
  /* ensure dropdown is always visible, also make sure z-index of parent is set high enough for overlap */
  overflow: visible !important;
  position: relative;
}

.vuestro-dropdown-inner.dark {
  --vuestro-dropdown-outline: var(--vuestro-outline)
}

.vuestro-dropdown-title {
  border: 1px solid transparent;
  border-bottom: none;
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
.vuestro-dropdown-inner.rounded .vuestro-dropdown-title {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.vuestro-dropdown-inner.active .vuestro-dropdown-title {
  background-color: var(--vuestro-popup-bg);
  border-color: var(--vuestro-dropdown-outline);
  color: var(--vuestro-popup-fg);
}

.vuestro-dropdown-title >>> svg:not(:only-child) {
  margin-right: 4px;
}
.vuestro-dropdown-inner.clickToOpen .vuestro-dropdown-title {
  cursor: pointer;
}
.vuestro-dropdown-inner.dark .vuestro-dropdown-title {
  color: var(--vuestro-popup-fg);
}

.vuestro-dropdown-button {
  position: relative;
}

.vuestro-dropdown-menu {
  background: var(--vuestro-popup-bg);
  color: var(--vuestro-popup-fg);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: calc(100% - 1px);
  right: 0px;
  min-width: 160px;
  border: 1px solid var(--vuestro-dropdown-outline);
  z-index: -1;
}
.vuestro-dropdown-inner.rounded .vuestro-dropdown-menu {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.vuestro-dropdown-menu.left {
  left: 0px;
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
  background-color: var(--primary);
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