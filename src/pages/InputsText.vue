<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Text Inputs</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Regular Text Fields
      </template>
      <vuestro-text-field placeholder="Regular Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" placeholder="Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field placeholder="Existing Value" v-model="exampleEditableText"></vuestro-text-field>
      <vuestro-text-field placeholder="With Hint" hint="go on, type something..." v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field placeholder="With Clear Button" hint="go on, type something..." v-model="exampleText" clearable></vuestro-text-field>
      <vuestro-text-field placeholder="Centered Cursor" hint="centered hint, too!" center v-model="exampleText"></vuestro-text-field>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field with presets
      </template>
      <div class="example-flexbox">
        <vuestro-text-field placeholder="With Presets Dropdown" :presets="examplePresets" v-model="exampleText"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field with Save/Cancel buttons
      </template>
      <div class="example-flexbox">
        <vuestro-text-field variant="outline" v-model="exampleEditableText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Set the dark property for a dark-theme compatible text field.
      </template>
      <div class="example-container dark">
        <vuestro-text-field dark placeholder="Regular Text Field" v-model="exampleText" clearable></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Editable Text
      </template>
      <div class="example-flexbox">
        <vuestro-editable-text v-model="exampleEditableText"></vuestro-editable-text>
      </div>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'TextInputs',
  data() {
    return {
      exampleEditableText: 'edit me',
      exampleText: '',
      examplePresets: [
        'preset1',
        'preset2',
        'preset3',
        'preset4',
      ]
    };
  },
  methods: {
    onSaveButton(v) {
      console.log('new val', v);
    },
    onCancelButton() {
      console.log('cancelled');
    },
  }
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