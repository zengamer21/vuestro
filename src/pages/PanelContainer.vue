<template>
  <div style="flex-grow:1;display:flex;flex-direction:column">
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-card-container :class="{ outlines }">
      <vuestro-card cols="6">
        <vuestro-panel>VuestroPanel - adds themeable background color and a pleasant drop shadow for dimension</vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel content-padding="sm">Set the content-padding to "sm"...</vuestro-panel>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-panel content-padding="md">..."md"...</vuestro-panel>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-panel content-padding="lg">..."lg" to add padding to VuestroPanel contents.</vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel content-padding="lg">
          <template slot="title">Vuestro Panel</template>
          <template slot="toolbar">
            <vuestro-button no-border pill><icon name="sync-alt"></icon><span>Refresh</span></vuestro-button>
            <vuestro-dropdown click-open>
              <template slot="button">
                <vuestro-button no-border pill>Options</vuestro-button>
              </template>
              <vuestro-list-button>Menu Item 1</vuestro-list-button>
              <vuestro-list-button>Menu Item 2</vuestro-list-button>
            </vuestro-dropdown>
            <vuestro-button no-border pill><icon name="times"></icon></vuestro-button>
          </template>
          <div>VuestroPanel has a title slot for a nice title, and a toolbar slot for adding controls such as VuestroButton</div>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel dark content-padding="lg">
          <template slot="title">Dark Vuestro Panel</template>
          <template slot="toolbar">
            <vuestro-button pill variant="white" no-border dark><icon name="sync-alt"></icon><span>Refresh</span></vuestro-button>
            <vuestro-button round size="sm" no-border dark><icon name="shopping-cart"></icon></vuestro-button>
            <vuestro-button round size="sm" variant="danger" no-border dark><icon name="times"></icon></vuestro-button>
          </template>
          <p>Set the dark property on VuestroPanel to turn the lights out.<br><br>Remember to set dark on VuestroButtons on the toolbar for a matching effect.</p>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel dark color="var(--vuestro-purple)" content-padding="lg">
          <template slot="title">Colorized Vuestro Panel Titlebar</template>
          <template slot="toolbar">
            <vuestro-button pill variant="white" no-border><icon name="sync-alt"></icon><span>Refresh</span></vuestro-button>
            <vuestro-button round size="sm" no-border><icon name="shopping-cart"></icon></vuestro-button>
            <vuestro-button round size="sm" variant="danger" no-border><icon name="times"></icon></vuestro-button>
          </template>
          <p>Colorize the panel background by setting the color property. If you choose a dark color, add the dark property as well for contrasting text.</p>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel collapsible>
          <template slot="title">Collapsible Panel</template>
          <vuestro-card-container>
            <vuestro-card>
              <template slot="description">VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
                <br><br>
                Even if the content is tall, the Vuestro containers will all adjust so that the content is shown and the footer is pushed down.
                <br><br>
              </template>
            </vuestro-card>
          </vuestro-card-container>
        </vuestro-panel>
        <vuestro-panel collapsible dark gutter="md">
          <template slot="title">Collapsible Panel</template>
          <vuestro-card-container>
            <vuestro-card>
              <template slot="description">VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
                <br><br>
                Even if the content is tall, the Vuestro containers will all adjust so that the content is shown and the footer is pushed down.
                <br><br>
              </template>
            </vuestro-card>
          </vuestro-card-container>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel spinner>
          <template slot="title">Vuestro Panel</template>
          <vuestro-card-container>
            <vuestro-card>
              <template slot="description">Set the spinner property to show a loading indicator if panel contents is async.</template>
            </vuestro-card>
          </vuestro-card-container>
        </vuestro-panel>
      </vuestro-card>


    </vuestro-card-container>
  </div>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Containers',
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

.vuestro-card-container.outlines {
  border: 1px dashed black;
  position: relative;
}
.vuestro-card-container.outlines:before {
  content: 'VuestroCardContainer';
  position: absolute;
  top: -18px;
  left: 0;
  background-color: var(--vuestro-gray);
}

.vuestro-card-container.outlines .vuestro-card {
  border: 1px dashed black;
  position: relative;
}

.vuestro-panel-title {
  /*font-size: 14px;*/
}

</style>