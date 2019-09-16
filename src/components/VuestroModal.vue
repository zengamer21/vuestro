<template>
  <transition name="vuestro-modal" mode="out-in">
    <div class="vuestro-modal-outer" v-if="active" @click.exact="onBlur">
      <div class="vuestro-modal-inner">
        <div class="vuestro-modal-titlebar">
          <div class="vuestro-modal-title">
            <slot name="title"></slot>
          </div>
          <div class="vuestro-modal-toolbar-buttons">
            <slot name="toolbar"></slot>
            <vuestro-button class="close-button" @click="onClose">
              <template v-if="closeText.length > 0">
                {{ closeText }}
              </template>
              <template v-else>
                <vuestro-icon name="times"></vuestro-icon>
              </template>
            </vuestro-button>
          </div>
        </div>
        <div class="vuestro-modal-default-slot">
          <slot></slot>
        </div>
        <div v-if="$slots.buttons" class="vuestro-modal-buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'VuestroModal',
  props: {
    active: { type: Boolean, required: false },
    closeText: { type: String, default: '' },
    closeOnBlur: { type: Boolean, default: false },
  },
  methods: {
    onClose() {
      this.$emit('update:active', false);
      this.$emit('close');
    },
    onBlur(e) {
      if (this.closeOnBlur && e.target.classList.contains('vuestro-modal-outer')) {
        this.onClose();
      }
      return false;
    }
  },
};

</script>

<style>
/* override these css vars to set style */
.vuestro-app {
  --vuestro-modal-title-bg: var(--vuestro-dark);
  --vuestro-modal-title-fg: var(--vuestro-text-color-inverse);
  --vuestro-modal-content-bg: var(--vuestro-content-bg);
  --vuestro-modal-active-bg: rgba(0,0,0,0.5);
}

</style>

<style scoped>

.vuestro-modal-outer {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  z-index: 2000;
  background-color: var(--vuestro-modal-active-bg);
}

.vuestro-modal-inner {
  background-color: var(--vuestro-modal-content-bg);
  width: 600px;
  min-height: 200px;
  max-height: 80%;
  margin-top: 10vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: start;
}

.vuestro-modal-titlebar {
  padding: 0 2px 0 10px;
  background-color: var(--vuestro-modal-title-bg);
  color: var(--vuestro-modal-title-fg);
  height: 32px;
  flex: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.vuestro-modal-title {
  pointer-events: none;
}

.vuestro-modal-toolbar-buttons {
  display: flex;
  margin-left: auto;
  font-size: 12px;
}
.vuestro-modal-default-slot {
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.vuestro-modal-buttons {
  border-top: 1px solid rgba(0,0,0,0.2);
  display: flex;
  justify-content: flex-end;
  padding: 2px;
}

@media screen and (max-width: 768px) {
  .vuestro-modal-inner {
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin-top: 0;
  }
}

.vuestro-modal-enter-active, .vuestro-modal-leave-active {
  transition: opacity 0.2s;
}
.vuestro-modal-enter, .vuestro-modal-leave-to {
  opacity: 0;
}

</style>