<template>
  <vuestro-container no-wrap column shrink>
    <vuestro-card cols="0" color="#f47633">
      <template #heading>Editor</template>
      <template #description>
        <span>
          The VuestroEditor wraps Ace Editor (ace.c9.io) for a mature and feature-rich editor capable of being used for development.
        </span>
      </template>
    </vuestro-card>

    <vuestro-card cols="0" stretch>
      <template #description>
        <span>Simple default configuration with the buffer set as the <vuestro-code>value</vuestro-code> attribute</span>
      </template>
      <vuestro-panel stretch>
        <vuestro-editor :value="testValue"></vuestro-editor>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="0" stretch>
      <template #description>
        <span>Set the <vuestro-code>lang</vuestro-code> attribute to set the editor mode</span>
      </template>
      <vuestro-panel stretch>
        <vuestro-editor :value="JSON.stringify(testJson,null,2)" lang="json" :options="editorOptions"></vuestro-editor>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="0" stretch>
      <template #description>
        <span>Various options (documented <a href="https://github.com/ajaxorg/ace/wiki/Configuring-Ace">here</a>) may be set through the <vuestro-code>options</vuestro-code> attribute</span>
      </template>
      <vuestro-panel stretch>
        <vuestro-editor :value="JSON.stringify(testJson,null,2)" lang="json" :options="editorOptionsExample"></vuestro-editor>
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
      editorOptionsExample: {
        selectionStyle: 'line',
        highlightActiveLine: false,
        cursorStyle: 'wide',
        autoScrollEditorIntoView: true,
        maxLines: 100,
        highlightGutterLine: false,
        showInvisibles: true,
        showPrintMargin: false,
        showGutter: false,
        fontSize: 22,
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