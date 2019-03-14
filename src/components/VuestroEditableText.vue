<template>
  <span class="vuestro-editable-text"
        @focusout="change"
        @keypress.enter="onKeypress"
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
  },
  watch: {
    enabled(newVal) {
      if (newVal) {
        this.$el.setAttribute('tabindex', 1);
        this.$el.setAttribute('contenteditable', true);
        this.$el.focus();
      } else {
        this.$el.removeAttribute('tabindex');
        this.$el.removeAttribute('contenteditable');
      }
    },
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.textContent);
    },
    onKeypress(e) {
      this.change(e);
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
    }
  },
};

</script>

<style scoped>

.vuestro-editable-text {
  padding: 3px;
  overflow: hidden;
  white-space: nowrap;
}

</style>