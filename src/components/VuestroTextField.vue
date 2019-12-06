<!-- Be sure to define CSS variable: --vuestro-text-field-bg -->
<!-- to define bg color for proper overlap of outline mode -->
<template>
  <div class="vuestro-text-field" :class="[ `vuestro-text-field-${variant}`, size, { dark, focused, center, noMargin }]">
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
    <div v-if="editingButtons" class="vuestro-text-field-editing-buttons">
      <vuestro-button round no-border size="sm" variant="success" @click="onSaveButton">
        <vuestro-icon name="save"></vuestro-icon>
      </vuestro-button>
      <vuestro-button round no-border size="sm" variant="danger" @click="onCancelButton">
        <vuestro-icon name="times"></vuestro-icon>
      </vuestro-button>
    </div>
    <div v-if="presets.length > 0">
      <vuestro-dropdown right click-to-open close-on-content-click>
        <template #button>
          <vuestro-button no-border round>
            <vuestro-icon name="chevron-down"></vuestro-icon>
          </vuestro-button>
        </template>
        <vuestro-list-button v-for="p in presets" :key="p" @click="onPreset(p)">{{ p }}</vuestro-list-button>
      </vuestro-dropdown>
    </div>
    <vuestro-button v-if="clearable && value.length > 0" no-border round @click.stop="onClear">
      <vuestro-icon name="times"></vuestro-icon>
    </vuestro-button>
    <span class="show-password" v-if="type === 'password'" @click="showPassword = !showPassword">
      <vuestro-icon v-if="!showPassword" name="eye-slash"></vuestro-icon>
      <vuestro-icon v-if="showPassword" name="eye"></vuestro-icon>
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

/* global _ */
export default {
  name: 'VuestroTextField',
  props: {
    value: { type: null, required: true },
    placeholder: { type: String, default: null },
    variant: { type: String, default: 'regular' },
    type: { type: String, default: 'text' },
    dark: { type: Boolean, default: false },
    hint: { type: String, default: null },
    center: { type: Boolean, default: false },
    noMargin: { type: Boolean, default: false },
    presets: { type: Array, default: () => [] },
    clearable: { type: Boolean, default: false },
    size: { type: String, default: 'md' },
    editingButtons: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  data() {
    return {
      focused: false,
      raisedPlaceholder: false,
      showPassword: false,
      editingButtonsBuffer: this.value,
    };
  },
  watch: {
    value(newVal) {
      if (newVal.length > 0 || this.focused) {
        this.raisedPlaceholder = true;
      } else {
        this.raisedPlaceholder = false;
      }
    }
  },
  mounted() {
    // move placeholder for initial value
    if (this.value.length > 0) {
      this.raisedPlaceholder = true;
    }
    // special sauce to see if browser autofilled in this text field, if so,
    // move the placeholder out of the way
    setTimeout(this.checkPlaceholder, 300);
    setTimeout(this.checkPlaceholder, 600);
    setTimeout(this.checkPlaceholder, 900);
    setTimeout(this.checkPlaceholder, 1200);
    if (this.selected) {
      this.$nextTick(() => {
        this.$refs.inputEl.focus();
        this.$refs.inputEl.setSelectionRange(0, 999);
      });
    }
  },
  methods: {
    checkPlaceholder() {
      if (this.$refs.inputEl && window.getComputedStyle(this.$refs.inputEl).content === `"${String.fromCharCode(0xFEFF)}"`) {
        this.raisedPlaceholder = true;
      }
    },
    focus() { // proxy the focus() call
      this.$nextTick(() => {
        this.$refs.inputEl.focus();
      });
    },
    updateValue() {
      // fine-grained, called with every keystroke so parent
      // can update value prop according to v-model convention
      this.$emit('input', this.$refs.inputEl.value);
      this.editingButtonsBuffer = this.$refs.inputEl.value;
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
    onSaveButton() {
      let retVal = null;
      if (_.isBoolean(this.value)) {
        retVal = this.editingButtonsBuffer === 'true';
      } else if (_.isNumber(this.value)) {
        retVal = parseFloat(this.editingButtonsBuffer);
      } else if (_.isDate(this.value)) {
        retVal = new Date(this.editingButtonsBuffer);
      } else {
        retVal = this.editingButtonsBuffer;
      }
      this.$emit('save', retVal);
    },
    onCancelButton() {
      this.$emit('cancel');
    },
    onClear() {
      this.$emit('input', '');
      this.focus();
    },
    onPreset(p) {
      this.$emit('input', p);
      this.$emit('preset', p);
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-text-field-bg: var(--vuestro-content-bg);
}

</style>

<style scoped>

.vuestro-text-field {
  position: relative;
  margin-bottom: 12px;
  display: flex;
}
.vuestro-text-field.sm {
  padding: 2px;
}
.vuestro-text-field.md {
  padding: 5px;
}
.vuestro-text-field.lg {
  padding: 8px;
}
.vuestro-text-field.noMargin {
  margin: 0;
}
.vuestro-text-field.dark .input-el {
  color: var(--vuestro-text-color-inverse);
}
.vuestro-text-field.focused {
  border-color: var(--vuestro-primary);
}

.vuestro-text-field-outline {
  border: 1px solid var(--vuestro-outline);
  border-radius: 4px;
}
.vuestro-text-field-regular {
  border-bottom: 1px solid var(--vuestro-outline);
}

.placeholder {
  top: 50%;
  left: 8px;
  transform: translate(0, -50%);
  transition: all 0.15s;
  font-size: 15px;
  position: absolute;
  color: var(--vuestro-text-color-muted);
  pointer-events: none;
}
.vuestro-text-field.center .placeholder {
  left: 50%;
  transform: translate(-50%, -50%);
}
.vuestro-text-field-outline .placeholder.active {
  /* only for outline mode */
  background-color: var(--vuestro-text-field-bg);
}

.placeholder.active {
  top: -2px;
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
  color: var(--vuestro-text-color);
}
.vuestro-text-field.center .input-el {
  text-align: center;
}
.vuestro-text-field.sm .input-el {
  font-size: 12px;
}
.vuestro-text-field.md .input-el {
  font-size: 15px;
}
.vuestro-text-field.lg .input-el {
  font-size: 18px;
}

.show-password {
  margin-left: 4px;
  color: var(--vuestro-outline);
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
.vuestro-text-field.center .hint {
  left: 50%;
  transform: translate(-50%, -50%);
}
.input-el-wrapper > input:-webkit-autofill,
.input-el-wrapper > input:-webkit-autofill:hover,
.input-el-wrapper > input:-webkit-autofill:focus {
  content: "\feff"; /* magic value to detect browser autofill */
  border: 1px solid var(--vuestro-gray);
  -webkit-text-fill-color: var(--vuestro-black);
  -webkit-box-shadow: 0 0 0px 1000px var(--vuestro-gray) inset;
}

.vuestro-text-field-editing-buttons {
  display: flex;
}

</style>