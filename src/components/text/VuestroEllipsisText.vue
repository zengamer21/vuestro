<template>
  <div class="vuestro-ellipsis-text">
    <div ref="theText" class="the-text" v-html="text" :class="{ truncated }"></div>
    <span class="show-all" v-if="showButton && truncated" @click="truncated = false"></span>
  </div>
</template>

<script>

export default {
  name: 'VuestroEllipsisText',
  props: {
    text: { type: String, default: '' },
  },
  data() {
    return {
      truncated: true,
      showButton: false,
    };
  },
  mounted() {
    if (this.$refs.theText.offsetWidth < this.$refs.theText.scrollWidth) {
      this.showButton = true;
    }
  }
};

</script>

<style scoped>

.vuestro-ellipsis-text {
  position: relative;
}

.the-text {
  word-wrap: break-word;
}

.truncated {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.show-all {
  position: absolute;
  top: 0;
  right: 5px;
  height: 100%;
  width: 13px;
  cursor: pointer;
}

</style>