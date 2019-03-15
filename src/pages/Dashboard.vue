<template>
  <div>hello
  
    <vuestro-text-field hint="thehint" placeholder="name" v-model="testval"></vuestro-text-field>
  
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      testval: '',
    };
  },
};
  
</script>
  
  
<style scoped>
</style>