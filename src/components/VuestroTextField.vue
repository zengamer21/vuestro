<!-- Be sure to define CSS variable: --text-field-bg -->
<!-- to define bg color for proper overlap of outline mode -->
<template>
  <div class="vuestro-text-field" :class="[ variant, { focused }]">
    <div class="input-el-wrapper">
      <input ref="inputEl"
             class="input-el"
             :value="value"
             :type="showPassword ? 'text':type"
             @focus="onFocus"
             @focusout="onFocusOut"
             @input="updateValue"
             @keyup="onKeyUp">
      </input>
    </div>
    <span class="show-password" v-if="type === 'password'" @click="showPassword = !showPassword">
      <icon v-if="!showPassword" name="eye-slash"></icon>
      <icon v-if="showPassword" name="eye"></icon>
    </span>
    <div class="placeholder"
         :class="{ active: raisedPlaceholder }">
      {{ placeholder }}
    </div>
    <div v-if="hint && raisedPlaceholder && value.length === 0" class="hint">
      {{ hint }}
    </div>
  </div>
</template>

<script>

import 'vue-awesome/icons/eye.js';
import 'vue-awesome/icons/eye-slash.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroTextField',
  components: {
    Icon,
  },
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: null },
    variant: { type: String, default: 'regular' },
    type: { type: String, default: 'text' },
    dark: { type: Boolean, default: false },
    hint: { type: String, default: null },
  },
  data() {
    return {
      focused: false,
      raisedPlaceholder: false,
      showPassword: false,
    };
  },
  methods: {
    focus() { // proxy the focus() call
      this.$nextTick(() => {
        this.$refs.inputEl.focus();
      });
    },
    updateValue() {
      // fine-grained, called with every keystroke so parent
      // can update value prop according to v-model convention
      this.$emit('input', this.$refs.inputEl.value);
    },
    onKeyUp(e) { // passthrough for 'keyup.enter'-type binding
      this.$emit('keyup', e);
    },
    onFocus() {
      this.focused = true;
      this.raisedPlaceholder = true;
    },
    onFocusOut() {
      this.focused = false;
      // only lower placeholder if no text in value
      if (this.value.length == 0) {
        this.raisedPlaceholder = false;
      }
    },
  },

};

</script>

<style scoped>

.vuestro-text-field {
  padding: 10px;
  position: relative;
  margin-bottom: 12px;
  display: flex;
}

.vuestro-text-field.focused {
  border-color: var(--primary);
}

.vuestro-text-field.outline {
  border: 1px solid var(--outline);
  border-radius: 4px;
}
.vuestro-text-field.regular {
  border-bottom: 1px solid var(--outline);
}

.placeholder {
  top: 50%;
  left: 8px;
  transform: translate(0, -50%);
  transition: all 0.15s;
  font-size: 15px;
  position: absolute;
  background: var(--text-field-bg);
  color: var(--outline);
  pointer-events: none;
}

.placeholder.active {
  top: 0;
  transform: translate(0, -50%);
  font-size: 12px;
  padding-left: 3px;
  padding-right: 3px;
}

.input-el-wrapper {
  flex: 1 1 auto;
  overflow: hidden;
  margin-left: 2px;
}

.input-el {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--outline);
  font-size: 15px;
}

.show-password {
  color: var(--outline);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.hint {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translate(0, -50%);
  pointer-events: none;
  font-size: 12px;
  filter: brightness(140%);
}

</style>