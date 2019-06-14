<template>
  <div style="flex-grow:1;display:flex;flex-direction:column">
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }" no-wrap>

      <vuestro-card cols="3">
        <template slot="heading">VuestroCard - cols="3"</template>
        <template slot="description">
          <span>
            Set the <strong>no-wrap</strong> property on the container to make cards full height, useful for dividing your layout into columns.
          </span>
        </template>
      </vuestro-card>
      <vuestro-card cols="9" color="var(--vuestro-green)">
        <template slot="description">The layout will stretch to contain the content without breaking the column layout.</template>
      </vuestro-card>

    </vuestro-container>
  </div>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'CardContainer',
  components: {
    Icon,
  },
  data() {
    return {
      outlines: true,
    };
  },
};

</script>

<style scoped>

.vuestro-container.outlines {
  border: 1px dashed black;
  position: relative;
}
.vuestro-container.outlines:before {
  content: 'VuestroContainer';
  position: absolute;
  top: -18px;
  left: 0;
  background-color: var(--vuestro-gray);
}

.vuestro-container.outlines .vuestro-card {
  border: 1px dashed black;
  position: relative;
}

</style>