<template>
  <vuestro-card-container>
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

    <vuestro-card cols="6">
      <vuestro-panel>VuestroPanel - adds themeable background color and a pleasant drop shadow for dimension</vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel>
        <vuestro-card-container>
          <vuestro-card cols="8">
            <template slot="heading">VuestroCard in VuestroPanel</template>
            <template slot="subheading">Nest them together</template>
            <template slot="description">...to subdivide a panel</template>
          </vuestro-card>
          <vuestro-card cols="4">
            <template slot="description">...into columns</template>
          </vuestro-card>
        </vuestro-card-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel>
        <template slot="title">Vuestro Panel</template>
        <template slot="toolbar">
          <vuestro-button no-border pill><icon name="sync-alt"></icon><span>Refresh</span></vuestro-button>
          <vuestro-button no-border pill><icon name="times"></icon></vuestro-button>
        </template>
        <vuestro-card-container>
          <vuestro-card>
            <template slot="description">VuestroPanel has a title slot for a nice title, and a toolbar slot for adding controls such as VuestroButton</template>
          </vuestro-card>
        </vuestro-card-container>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <vuestro-panel dark>
        <template slot="title">Dark Vuestro Panel</template>
        <template slot="toolbar">
          <vuestro-button no-border pill variant="white" no-spacing><icon name="sync-alt"></icon><span>Refresh</span></vuestro-button>
          <vuestro-button no-border pill variant="danger" no-spacing><icon name="times"></icon></vuestro-button>
        </template>
        <vuestro-card-container>
          <vuestro-card>
            <template slot="description">VuestroPanel has a title slot for a nice title, and a toolbar slot for adding controls such as VuestroButton</template>
          </vuestro-card>
        </vuestro-card-container>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-card-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Containers',
  components: {
    Icon,
  }
};

</script>

<style scoped>

.vuestro-card-container {
  border: 1px dashed black;
  position: relative;
}
.vuestro-card-container:before {
  content: 'VuestroCardContainer';
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--vuestro-gray);
}

.vuestro-card {
  border: 1px dashed black;
  position: relative;
}

</style>