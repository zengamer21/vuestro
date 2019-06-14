<template>
  <div style="flex-grow:1;display:flex;flex-direction:column">
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }">

      <vuestro-card>
        <template slot="heading">VuestroCard - heading slot</template>
        <template slot="subheading">VuestroCard - subheading slot</template>
        <template slot="description">VuestroCard - description slot</template>
        <div>Default slot used for content. If any of the heading slots are not used, they will not appear and will not take up space.</div>
      </vuestro-card>
      <vuestro-card cols="6">
        <template slot="heading">VuestroCard - cols="6"</template>
        <template slot="description">Use the cols property with values from 1 to 12 to create Bootstrap-like columns</template>
      </vuestro-card>
      <vuestro-card cols="6" color="var(--vuestro-green)">
        <template slot="heading">VuestroCard with color cue</template>
        <template slot="description">Set the color property on the VuestroCard to add a nice touch of color.</template>
      </vuestro-card>

      <vuestro-card stretch>
        <vuestro-panel>
          <vuestro-container>
            <vuestro-card cols="8">
              <template slot="heading">VuestroCard in VuestroPanel</template>
              <template slot="subheading">Nest them together</template>
              <template slot="description">...to subdivide a panel</template>
            </vuestro-card>
            <vuestro-card cols="4">
              <template slot="description">...into columns</template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
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