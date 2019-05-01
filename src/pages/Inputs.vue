<template>
  <vuestro-card-container>
    <vuestro-card cols="12" color="#f47633">
      <template slot="heading">Inputs</template>
      <template slot="description">
      </template>
    </vuestro-card>
    
    
    <vuestro-card>
      <template slot="description">
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
    };
  },
};

</script>