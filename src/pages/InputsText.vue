<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Text Inputs</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroTextField</template>
      <template #description>
        VuestroTextField is a very versatile component. It can function as a simple text field as well as an advanced multi-select by setting the appropriate properties.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Simple Text Fields
      </template>
      <vuestro-text-field placeholder="Regular Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" size="sm" placeholder="sm Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" size="md" placeholder="md Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" size="lg" placeholder="lg Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" size="xl" placeholder="xl Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="shaded" placeholder="Shaded Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field placeholder="Existing Value" v-model="exampleEditableText"></vuestro-text-field>
			<vuestro-text-field placeholder="Responsive Value" v-model="delayedText"></vuestro-text-field>
      <vuestro-text-field placeholder="With Hint" hint="go on, type something..." v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field placeholder="With Clear Button" hint="type something and the clear button will appear!" v-model="exampleText" clearable></vuestro-text-field>
      <vuestro-text-field placeholder="Centered Cursor" hint="centered hint, too!" center v-model="exampleText"></vuestro-text-field>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Non-String Text Fields
      </template>
      <div class="example-flexbox">
        <vuestro-text-field placeholder="Enter a number" v-model="exampleNumber" clearable></vuestro-text-field>
        <vuestro-text-field placeholder="Enter a number" v-model="exampleNumber" clearable>
          <template #unit>cm</template>
        </vuestro-text-field>
        <vuestro-text-field placeholder="Enter a date string" v-model="exampleDate" clearable></vuestro-text-field>
        <vuestro-text-field placeholder="Enter a boolean" v-model="exampleBoolean" :invalid="isBooleanString(exampleBoolean)" clearable></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field with array of presets
      </template>
      <div class="example-flexbox">
        <vuestro-text-field placeholder="With Presets Dropdown" :presets="examplePresets" v-model="exampleText"></vuestro-text-field>
        <vuestro-text-field variant="outline" placeholder="With Presets Dropdown" :presets="examplePresets" v-model="exampleText"></vuestro-text-field>
        <vuestro-text-field variant="shaded" placeholder="With Presets Dropdown" :presets="examplePresets" v-model="exampleText"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field providing dropdown template for options, useful for handling values by id
      </template>
      <div class="example-flexbox">
        <vuestro-text-field placeholder="With Templated Dropdown" :value="vuestroGetValueById({data: exampleDatasetWithIds, idField: 'id', idValue: selectedId, field: 'val', backupText: 'Select...'})">
          <template #dropdown>
            <vuestro-list-button v-for="d in exampleDatasetWithIds" :key="d.id" @click="selectedId = d.id">{{ d.val }}</vuestro-list-button>
          </template>
        </vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Text Field with Save/Cancel buttons
      </template>
      <div class="example-flexbox"  >
        <vuestro-text-field variant="outline" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
        <vuestro-text-field variant="shaded" clearable hint="filename" v-model="exampleText" editing-buttons @save="onSaveButton" @cancel="onCancelButton"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <em>readonly</em> property for a text field which ignores pointer events</span>
      </template>
      <div class="example-flexbox"  >
        <vuestro-text-field variant="outline" v-model="exampleEditableText" readonly></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>Set the <em>invalid</em> property to true or a string to provide validation feedback.</span>
      </template>
      <div class="example-flexbox">
        <vuestro-text-field variant="outline" v-model="exampleBoolean" editing-buttons clearable :validate="isBooleanString"></vuestro-text-field>
        <vuestro-text-field variant="outline" placeholder="Age" v-model="validateNumber" editing-buttons clearable :validate="isNumber"></vuestro-text-field>
        <vuestro-text-field variant="outline" placeholder="Email" size="lg" v-model="validateEmail" editing-buttons clearable :validate="isEmail"></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Set the dark property for a dark-theme compatible text field.
      </template>
      <div class="example-container dark">
        <vuestro-text-field dark placeholder="Regular Text Field" v-model="exampleText" clearable></vuestro-text-field>
        <vuestro-text-field dark variant="outline" placeholder="Outline Text Field" hint="with hint" v-model="exampleText" clearable></vuestro-text-field>
        <vuestro-text-field dark variant="shaded" placeholder="Shaded Text Field" hint="with hint" v-model="exampleText" clearable></vuestro-text-field>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Autocompletes
      </template>
      <div class="example-flexbox">
        <form>
          <vuestro-text-field type="password" v-model="exampleText" autocomplete="new-password"></vuestro-text-field>
          <vuestro-text-field type="email" v-model="exampleText" autocomplete="email"></vuestro-text-field>
        </form>
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
      exampleEditableText: '',
      exampleText: '',
      exampleNumber: '32.23',
      exampleDate: (new Date()).toISOString(),
      exampleBoolean: 'true',
			delayedText: '',
      examplePresets: [
        'preset1',
        'preset2',
        'preset3',
        'preset4',
      ],
      selectedId: null,
      exampleDatasetWithIds: [
        {
          id: 'id0',
          val: 'Value for id0',
        },
        {
          id: 'id1',
          val: 'Value for id1',
        },
        {
          id: 'id2',
          val: 'Value for id2',
        },
      ],
      validateNumber: '',
      validateEmail: '',
    };
  },
	mounted() {
		this.exampleEditableText = 'edit me';
		setTimeout(() => {
			this.delayedText = 'delayed  value';
		}, 1000);
	},
  methods: {
    onSaveButton(v) {
      this.exampleText = v;
    },
    onCancelButton() {
      console.log('cancelled');
    },
    isBooleanString(str) {
      return (str === 'true' || str === 'false') || 'should be a boolean';
    },
    isNumber(str) {
      return str.length > 0 && _.isFinite(_.toNumber(str)) || 'should be number';
    },
    isEmail(str) {
      return str.match(/\w+@\w+.\w+/) || 'should be valid email';
    },
  }
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
}
.example-container.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}

.example-flexbox > div {
  margin-top: 10px;
}

</style>