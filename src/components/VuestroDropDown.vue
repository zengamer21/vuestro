<template>
  <div class="vuestro-drop-down" @mouseleave="onLeave" :class="{ active }">
    <div ref="title" class="vuestro-drop-down-title" @mouseover="onHover">
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
</template>

<script>

export default {
  name: 'VuestroDropDown',
  props: {
    left: { type: Boolean, default: false },
    alwaysOpen: { type: Boolean, default: false },
  },
  data() {
    return {
      active: this.alwaysOpen,
    };
  },
  methods: {
    onHover() {
      this.active = true;
      this.$emit('hover');
    },
    onLeave() {
      this.active = this.alwaysOpen;
      this.$emit('leave');
    },
  },
};

</script>

<style scoped>

.vuestro-drop-down {
  /* ensure dropdown is always visible, also make sure z-index of parent is set high enough */
  overflow: visible !important;
  position: relative;
  height: 100%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid transparent;
  border-bottom: none;
}

.vuestro-drop-down.active {
  background-color: var(--vuestro-popup-bg);
  border: 1px solid var(--vuestro-outline);
  border-bottom: none;
  color: var(--vuestro-popup-fg);
}

.vuestro-drop-down-title {
  z-index: 1001;
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
}
.vuestro-drop-down-title .fa-icon {
  margin-right: 2px;
}

.vuestro-drop-down-menu {
  background: var(--vuestro-popup-bg);
  color: var(--vuestro-popup-fg);
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.5);
  position: absolute;
  top: calc(100% - 1px);
  right: -1px;
  min-width: 160px;
  font-size: 14px;
  font-weight: 300;
  border: 1px solid var(--vuestro-outline);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: -1;
}

.vuestro-drop-down-menu.left {
  left: -1px;
}

.vuestro-drop-down-menu-content {
  padding: 8px;
}

.vuestro-drop-down-menu-buttons {
  border-top: 1px solid var(--vuestro-outline);
  overflow: hidden;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  cursor: pointer;
}

.vuestro-drop-down-menu-buttons > span {
  background-color: var(--primary);
  padding: 6px;
  flex-grow: 1;
  text-align: center;
}

.vuestro-drop-down-menu-buttons > span:not(:first-child) {
  border-left: 1px solid var(--vuestro-outline);
}

.vuestro-drop-down-menu-buttons > span:hover {
  background-color: var(--vuestro-primary);
}

</style>