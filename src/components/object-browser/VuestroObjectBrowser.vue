<template>
  <div class="vuestro-object-browser">
    <vuestro-object-browser-item :data="data"></vuestro-object-browser-item>
  </div>
</template>

<script>

import VuestroObjectBrowserItem from './VuestroObjectBrowserItem';

export default {
  name: 'VuestroObjectBrowser',
  components: {
    VuestroObjectBrowserItem,
  },
  props: {
    data: { type: Object, required: true },
  },
};

</script>

<style scoped>

.vuestro-object-browser {

}

</style>