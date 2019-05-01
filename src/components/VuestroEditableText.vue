<template>
  <span class="vuestro-editable-text"
        :class="{ invalid }"
        @focusout="onFocusOut"
        @keyup="onKeyUp"
        @keypress.enter="onEnterKey"
        @focus="onFocus">
    {{ value }}
  </span>
</template>

<script>

export default {
  name: 'VuestroEditableText',
  props: {
    value: { type: String, default: '' },
    enabled: { type: Boolean, default: true },
    validator: { type: Function, default: () => true },
  },
  data() {
    return {
      invalid: false,  
    };
  },
  watch: {
    enabled(newVal) {
      this.updateEnable();
      this.$el.focus();
    },
  },
  mounted() {
    this.updateEnable();
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
      this.change(e);
      this.$nextTick(() => {
        this.$el.innerHTML = this.value;
      });
    },
    onEnterKey(e) {
      this.$el.blur();
      // prevent enter key from adding /n
      e.preventDefault();
      e.stopPropagation();
    },
    onFocus() {
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

<style scoped>

.vuestro-editable-text {
  padding: 3px;
  overflow: hidden;
  white-space: nowrap;
}

.vuestro-editable-text:focus {
  outline: 1px solid var(--vuestro-outline);
}

.vuestro-editable-text.invalid:focus {
  outline: 1px solid var(--vuestro-danger);
}


</style>