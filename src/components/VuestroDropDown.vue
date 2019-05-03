<template>
  <div class="vuestro-drop-down">
    <div class="vuestro-drop-down-inner" @mouseleave="onLeave" :class="{ dark, active, rounded, clickOpen }">
      <div ref="title" class="vuestro-drop-down-title" @mouseover="onHover" @click="onClick">
        <slot name="title"></slot>
      </div>
      <div class="vuestro-drop-down-menu"
           :style="{ visibility: active ? 'visible':'hidden', opacity: active ? '1':'0' }"
           :class="{ left }">
        <div class="vuestro-drop-down-menu-content">
          <slot></slot>
        </div>
        <div class="vuestro-drop-down-menu-buttons" v-if="$slots.buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroDropDown',
  props: {
    left: { type: Boolean, default: false },
    alwaysOpen: { type: Boolean, default: false },
    clickOpen: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
  },
  data() {
    return {
      active: this.alwaysOpen,
    };
  },
  methods: {
    onHover() {
      if (!this.clickOpen) {
        this.active = true;
        this.$emit('hover');
      }
    },
    onLeave() {
      if (!this.clickOpen) {
        this.active = this.alwaysOpen;
        this.$emit('leave');
      }
    },
    onClick() {
      if (this.clickOpen) {
        if (this.active) {
          this.active = this.alwaysOpen;
          this.$emit('leave');
        } else {
          this.active = true;
          this.$emit('hover');
        }
      }
    }
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-drop-down-outline: transparent;
}
.vuestro-dark {
  --vuestro-drop-down-outline: var(--vuestro-outline)
}

</style>

<style scoped>

.vuestro-drop-down {
  z-index: 100;
  height: 100%;
  position: relative;
}
.vuestro-drop-down-inner {
  height: 100%;
  /* ensure dropdown is always visible, also make sure z-index of parent is set high enough for overlap */
  overflow: visible !important;
  border: 1px solid transparent;
  border-bottom: none;
  position: relative;
}
.vuestro-drop-down-inner.dark {
  --vuestro-drop-down-outline: var(--vuestro-outline)
}
.vuestro-drop-down-inner.rounded {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.vuestro-drop-down-inner.active {
  background-color: var(--vuestro-popup-bg);
  border-color: var(--vuestro-drop-down-outline);
  color: var(--vuestro-popup-fg);
}

.vuestro-drop-down-title {
  position: relative;
  padding-left: 6px;
  padding-right: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  user-select: none;
  z-index: 101;
}
.vuestro-drop-down-title .fa-icon {
  margin-right: 2px;
}
.vuestro-drop-down-inner.clickOpen .vuestro-drop-down-title {
  cursor: pointer;
}
.vuestro-drop-down-inner.dark .vuestro-drop-down-title {
  color: var(--vuestro-popup-fg);
}

.vuestro-drop-down-menu {
  background: var(--vuestro-popup-bg);
  color: var(--vuestro-popup-fg);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: calc(100% - 1px);
  right: -1px;
  min-width: 160px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid var(--vuestro-drop-down-outline);
  z-index: -1;
}
.vuestro-drop-down-inner.rounded .vuestro-drop-down-menu {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.vuestro-drop-down-menu.left {
  left: -1px;
}

.vuestro-drop-down-menu-content {
  padding: 8px;
}

.vuestro-drop-down-menu-buttons {
  border-top: 1px solid var(--vuestro-drop-down-outline);
  overflow: hidden;
  display: flex;
  cursor: pointer;
}
.vuestro-drop-down-inner.rounded .vuestro-drop-down-menu-buttons {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.vuestro-drop-down-menu-buttons > span {
  background-color: var(--primary);
  padding: 6px;
  flex-grow: 1;
  text-align: center;
}

.vuestro-drop-down-menu-buttons > span:not(:first-child) {
  border-left: 1px solid var(--vuestro-drop-down-outline);
}

.vuestro-drop-down-menu-buttons > span:hover {
  background-color: var(--vuestro-primary);
}

</style>