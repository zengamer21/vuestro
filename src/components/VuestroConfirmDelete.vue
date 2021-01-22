<template>
  <vuestro-tooltip class="vuestro-confirm-delete" position="left">
    <template #default>
      <vuestro-button :size="size" no-margin round no-border variant="danger">
        <vuestro-icon name="trash"></vuestro-icon>
      </vuestro-button>
    </template>
    <template #content>
      <div class="vuestro-confirm-delete-are-you-sure">
        Are you sure?&nbsp;<vuestro-button pill variant="danger" @click="onConfirm" value>Yes</vuestro-button>
      </div>
    </template>
  </vuestro-tooltip>
</template>

<script>

export default {
  name: 'VuestroConfirmDelete',
  props: {
    size: { type: String, default: 'md'},
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
  },
};

</script>

<style scoped>

.vuestro-confirm-delete-are-you-sure {
  display: flex;
  white-space: nowrap;
  align-items: center;
  position: relative;
}

</style>