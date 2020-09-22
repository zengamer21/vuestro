<template>
	<div class="vuestro-color-picker" :class="{ disabled, open }">
    <div class="vuestro-color-picker-selected" :style="getBackgroundColor(value)" @click="open = !open">
      <vuestro-icon class="down-arrow" name="angle-down"></vuestro-icon>
    </div>
    <transition name="vuestro-color-options" mode="out-in">
      <div v-if="open" class="vuestro-color-picker-options">
        <div v-for="c in colors" :key="c"
             class="vuestro-color-picker-option"
             :style="getBackgroundColor(c)"
             @click="onSelectColor(c)">

        </div>
      </div>
    </transition>
	</div>
</template>

<script>

export default {
	name: 'VuestroColorPicker',
	props: {
	  value: { type: String, required: true },
	  colors: { type: Array, default: () => [] },
	  disabled: { type: Boolean, default: false },
	},
	data() {
	  return {
	    open: false,
	  };
	},
	methods: {
	  getBackgroundColor(c) {
	    return {
	      'background-color': c,
	    };
	  },
	  onSelectColor(c) {
	    this.open = false;
	    this.$emit('input', c);
	  }
	}
};

</script>

<style scoped>

.vuestro-color-picker {
  width: 28px;
  height: 28px;
  margin: var(--vuestro-control-margin-v);
	display: flex;
	flex-direction: column;
	position: relative;
	cursor: pointer;
}
.vuestro-color-picker .vuestro-color-picker-selected {
  width: 100%;
  height: 100%;
	display: flex;
	justify-content: center;
	z-index: 999;
	padding: 2px;
	border-radius: 50%;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
  transition: all 0.6s;
}
.vuestro-color-picker .vuestro-color-picker-selected .down-arrow {
  color: white;
  align-self: flex-end;
}

.vuestro-color-picker.disabled {
  pointer-events: none;
  filter: brightness(80%);
}

.vuestro-color-picker .vuestro-color-picker-options {
  position: absolute;
  width: 28px;
  top: 50%;
  left: 0px;
  padding: 18px 2px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--vuestro-widget-light-bg);
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
  transform-origin: top;
  z-index: 998;
}

.vuestro-color-picker-option {
	height: 18px;
	width: 18px;
	border-radius: 50%;
	margin-bottom: 2px;
}

.vuestro-color-options-enter-active, .vuestro-color-options-leave-active {
  transition: transform 0.4s;
}
.vuestro-color-options-enter, .vuestro-color-options-leave-to {
  transform: scaleY(0);
}

</style>