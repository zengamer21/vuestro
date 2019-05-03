<template>
  <vuestro-card-container>
    <vuestro-card cols="12" color="#f47633">
      <template slot="heading">Inputs</template>
      <template slot="description">
      </template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Regular Text Input
      </template>
      <vuestro-text-field placeholder="Regular Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field variant="outline" placeholder="Outline Text Field" v-model="exampleText"></vuestro-text-field>
      <vuestro-text-field placeholder="Existing Value" v-model="exampleEditableText"></vuestro-text-field>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Editable Text
      </template>
      <div class="example-flexbox">
        <vuestro-editable-text v-model="exampleEditableText"></vuestro-editable-text>
      </div>
    </vuestro-card>

  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Inputs',
  data() {
    return {
      exampleEditableText: 'edit me',
      exampleText: '',
    };
  },
};

</script>