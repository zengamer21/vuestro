<template>
  <div>
    <vuestro-container>
      <vuestro-button @click="onCancel">Cancel</vuestro-button>
      <vuestro-button variant="success" @click="onSave">Save</vuestro-button>
    </vuestro-container>
  </div>
</template>

<script>

export default {
  name: 'FileBrowser',
  props: ['data', 'options'],
  methods: {
    onCancel() {
      this.$emit('ascend');
    },
    onSave() {
      this.$emit('ascend', {
        callbackName: 'refresh',
      });
    }
  },
};

</script>