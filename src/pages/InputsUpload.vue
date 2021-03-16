<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-gold)">
      <template #heading>File Upload</template>
      <template #description>The VuestroFileUpload component builds upon the standard browser html element to provide a reliable upload mechanism which still looks at home in a Vuestro app.</template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #subheading>
        Default Properties
      </template>
      <template #description>
        <span>VuestroUpload emits a <vuestro-code>files</vuestro-code> events with the browser File objects. </span>
      </template>
      <vuestro-container>
        <vuestro-upload @files="onFiles"></vuestro-upload>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        Multiple files
      </template>
      <vuestro-panel>
        <vuestro-container>
          <vuestro-upload ref="theUpload"
                          multiple
                          stretch
                          accept="image/jpeg"
                          @files="onFiles">
          </vuestro-upload>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'InputsUpload',
  data() {
    return {
      fileData: [],
    };
  },
  methods: {
    onFiles(f) {
      this.fileData = f;
      console.log(this.fileData, this.$refs.theUpload.fileData);
    },
  },
};

</script>

<style scoped>

</style>