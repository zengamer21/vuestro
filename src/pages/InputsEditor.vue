<template>
  <vuestro-container no-wrap column shrink>
    <vuestro-card cols="0" color="#f47633">
      <template #heading>Editor</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card cols="0" stretch>
      <template #description>
        <span>Simple default configuration with the buffer set as the <em>value</em> attribute</span>
      </template>
      <vuestro-panel stretch>
        <vuestro-editor :value="testValue"></vuestro-editor>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="0" stretch>
      <template #description>
        <span>Set the <em>lang</em> attribute to set the editor mode</span>
      </template>
      <vuestro-panel stretch>
        <vuestro-editor :value="JSON.stringify(testJson,null,2)" :lang="'json'" :options="editorOptions"></vuestro-editor>
      </vuestro-panel>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsEditor',
  data() {
    return {
      testValue: 'Ace Editor integration\n\nuse :value="<data>" to set the value of the buffer\n\n',
      testJson: {
        thisIs: 'JSON',
      },
      editorOptions: {
        useSoftTabs: true,
        tabSize: 2,
      },
    };
  },
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}

</style>