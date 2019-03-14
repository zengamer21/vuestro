<template>
  <transition name="vuestro-modal" mode="out-in">
    <div class="vuestro-modal-outer" v-if="active">
      <div class="vuestro-modal-inner">
        <div class="vuestro-modal-titlebar">
          <slot name="title"></slot>
          <div class="flex-flex ml-auto">
            <slot name="buttons"></slot>
            <vuestro-button class="close-button" @click="onClose">
              <template v-if="closeText.length > 0">
                {{ closeText }}
              </template>
              <template v-else>
                <icon name="times"></icon>
              </template>
            </vuestro-button>
          </div>
        </div>
        <div class="vuestro-modal-default-slot">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'VuestroModal',
  props: {
    active: { type: Boolean, required: true },
    closeText: { type: String, default: '' },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
  },
};

</script>

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
  background-color: rgba(0,0,0,0.6);
}
.darkui .modal-outer {
  background-color: rgba(255,255,255,0.2);
}

.vuestro-modal-inner {
  background-color: var(--white);
  width: 600px;
  min-height: 200px;
  max-height: 50%;
  margin-top: 10%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: start;
}

.vuestro-modal-inner >>> hr {
  margin: 2px;
  border-top: 1px solid rgba(0,0,0,0.2);
}

.vuestro-modal-titlebar {
  padding: 0 2px 0 10px;
  background-color: var(--dark-input-background);
  color: var(--dark-widget-text);
  height: 32px;
  flex: none;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.vuestro-modal-default-slot {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
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