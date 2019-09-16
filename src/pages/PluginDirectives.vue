<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-blue)">
      <template #heading>Directives</template>
    </vuestro-card>

    <vuestro-card stretch>
      <template #subheading>vuestro-blur</template>
      <template #description>Calls provided method when body catches click outside the current element.</template>
      <vuestro-panel stretch>
        <vuestro-editor lang="html" :value="vuestroBlurExample" :options="editorOptions"></vuestro-editor>
      </vuestro-panel>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'PluginDirectives',
  data() {
    return {
      editorOptions: {
        maxLines: Infinity
      },
      vuestroBlurExample: `<template>
  <my-component v-vuestro-blur="onBlur"></my-component>
</template>

<script>

export default {
  ...
  methods: {
    onBlur() {
    },
  },
};

<\/script>`,

    };
  },
};

</script>