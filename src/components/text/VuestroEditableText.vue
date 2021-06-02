<template>
  <span class="vuestro-editable-text"
        :class="{ invalid }"
        @focusout="onFocusOut"
        @keyup="onKeyUp"
        @keypress.enter="onEnterKey"
        @focus="onFocus">
    {{ resolvedValue }}
  </span>
</template>

<script>

export default {
  name: 'VuestroEditableText',
  props: {
    value: { type: null, default: '' },
    enabled: { type: Boolean, default: true },
    validator: { type: Function, default: () => true },
    render: { type: Function, default: (d) => d },
    autoFocus: { type: Boolean, default: false },
  },
  data() {
    return {
      invalid: false,
      focused: false,
    };
  },
  computed: {
    resolvedValue() {
      if (this.focused) {
        return this.value;
      }
      return this.render(this.value);
    },
  },
  watch: {
    enabled(newVal) {
      this.updateEnable();
      this.$el.focus();
    },
    value() {
      this.$el.innerHTML = this.resolvedValue;
    },
  },
  mounted() {
    this.updateEnable();
    if (this.autoFocus) {
      this.$nextTick(() => {
        this.onFocus();
      });
    }
  },
  methods: {
    updateEnable() {
      if (this.enabled) {
        this.$el.setAttribute('tabindex', 1);
        this.$el.setAttribute('contenteditable', true);
      } else {
        this.$el.removeAttribute('tabindex');
        this.$el.removeAttribute('contenteditable');
      }
    },
    change(e) {
      if (!this.invalid) {
        this.$emit('input', e.target.textContent);
      }
    },
    onFocusOut(e) {
      this.focused = false;
      this.change(e);
      this.$nextTick(() => {
        this.$el.innerHTML = this.resolvedValue;
      });
    },
    onEnterKey(e) {
      this.focused = false;
      this.$el.blur();
      // prevent enter key from adding /n
      e.preventDefault();
      e.stopPropagation();
    },
    onFocus() {
      this.focused = true;
      this.$el.innerHTML = this.resolvedValue;
      this.$emit('focus');
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(this.$el);
      selection.removeAllRanges();
      selection.addRange(range);
    },
    onKeyUp(e) {
      this.invalid = !this.validator(e.target.textContent);
      return !this.invalid;
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-editable-text-padding: 0.2em;
}

</style>

<style scoped>

.vuestro-editable-text {
  padding: var(--vuestro-editable-text-padding);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 1px;
}

.vuestro-editable-text:focus {
  outline: 1px solid var(--vuestro-outline);
}

.vuestro-editable-text.invalid:focus {
  outline: 1px solid var(--vuestro-danger);
}


</style>