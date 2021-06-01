<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Parameter List</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading>Example</template>
      <vuestro-parameter-list v-model="liveObject"
                              :parameters="parameters">
      </vuestro-parameter-list>

      <vuestro-panel>
        <template #title>Values</template>
        <vuestro-object-browser :data="liveObject">

        </vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading><span>
        <vuestro-code>parameters</vuestro-code> prop
      </span></template>
      <vuestro-editor :options="editorOptions"
                      lang="json"
                      :value="JSON.stringify(parameters,null,2)">
      </vuestro-editor>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

/* global _ */

export default {
  name: 'InputsParameterList',
  data() {
    return {
      liveObject: {},
      parameters: [
        {
          title: 'Hostname',
          description: 'The hostname of the server',
          field: 'host',
          type: 'string',
        },
        {
          title: 'Port',
          description: 'The port of the server',
          field: 'port',
          type: 'number',
        },
        {
          title: 'Protocol',
          description: 'Example of option select',
          field: 'proto',
          type: 'option',
          options: ['tcp', 'http', 'https'],
        },
        {
          title: 'Enabled',
          description: 'Example of boolean',
          field: 'enabled',
          type: 'boolean',
        },
      ],
      editorOptions: {
        autoScrollEditorIntoView: true,
        minLines: 4,
        maxLines: 1000,
      },
    };
  },
};

</script>