<template>
  <vuestro-container column>
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }">
      <vuestro-card cols="6">
        <vuestro-panel>VuestroPanel - adds themeable background color and a pleasant drop shadow for dimension</vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel :stretch="false" content-padding="sm">Set the content-padding to "sm"...</vuestro-panel>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-panel :stretch="false" content-padding="md">..."md"...</vuestro-panel>
      </vuestro-card>
      <vuestro-card cols="6">
        <vuestro-panel content-padding="lg">..."lg" to add padding to VuestroPanel contents.</vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel content-padding="lg">
          <template #title>Vuestro Panel</template>
          <template #toolbar>
            <vuestro-button size="sm" no-border pill><vuestro-icon name="sync-alt"></vuestro-icon><span>Refresh</span></vuestro-button>
            <vuestro-dropdown click-open>
              <template #button>
                <vuestro-button size="sm" no-border pill>Options</vuestro-button>
              </template>
              <vuestro-list-button>Menu Item 1</vuestro-list-button>
              <vuestro-list-button>Menu Item 2</vuestro-list-button>
            </vuestro-dropdown>
            <vuestro-button size="sm" no-border round><vuestro-icon name="times"></vuestro-icon></vuestro-button>
          </template>
          <div>VuestroPanel has a title slot for a nice title, and a toolbar slot for adding controls such as VuestroButton</div>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel dark content-padding="lg">
          <template #title>Dark Vuestro Panel</template>
          <template #toolbar>
            <vuestro-button size="sm" pill variant="white" no-border dark><vuestro-icon name="sync-alt"></vuestro-icon><span>Refresh</span></vuestro-button>
            <vuestro-button size="sm" round no-border dark><vuestro-icon name="at"></vuestro-icon></vuestro-button>
            <vuestro-button size="sm" round variant="danger" no-border dark><vuestro-icon name="times"></vuestro-icon></vuestro-button>
          </template>
          <p>Set the dark property on VuestroPanel to turn the lights out.<br><br>Remember to set dark on VuestroButtons on the toolbar for a matching effect.</p>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel dark color="var(--vuestro-purple)" :stretch="false" content-padding="lg">
          <template #title>Colorized Vuestro Panel Titlebar</template>
          <template #toolbar>
            <vuestro-button size="sm" no-border pill variant="white"><vuestro-icon name="sync-alt"></vuestro-icon><span>Refresh</span></vuestro-button>
            <vuestro-button size="sm" no-border round><vuestro-icon name="at"></vuestro-icon></vuestro-button>
            <vuestro-button size="sm" no-border round variant="danger"><vuestro-icon name="times"></vuestro-icon></vuestro-button>
          </template>
          <p>Colorize the panel background by setting the color property. If you choose a dark color, add the dark property as well for contrasting text.</p>
          <p>Set the stretch property to false to prevent the panel from stretching to available vertical space.</p>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel collapsible content-padding="lg">
          <template #title>Collapsible Panel</template>
          <vuestro-container>
            <vuestro-card>
              <template #description>VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
                <br><br>
                Even if the content is tall, the Vuestro containers will all adjust so that the content is shown and the footer is pushed down.
                <br><br>
              </template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
        <vuestro-panel collapsible collapsed>
          <template #title>Collapsed by default</template>
          <vuestro-container>
            <vuestro-card>
              <template #description>Set the collapsed property to have the panel be collapsed by default.
                <br><br>
              </template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
        <vuestro-panel collapsible defer-content>
          <template #title>Collapsible Panel with deferred content rendering</template>
          <vuestro-container>
            <vuestro-card>
              <template #description>
              </template>
              <span>
                VuestroPanel can collapse it's content into the titlebar when the collapsible property is set.
                <br><br>
                Defer the rendering of the contents until the panel is expanded by setting the <em>defer-content</em> property.
                <br><br>
              </span>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel spinner>
          <template #title>Vuestro Panel</template>
          <vuestro-container>
            <vuestro-card>
              <template #description>Set the spinner property to show a loading indicator if panel contents is async.</template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel class="dark-toolbar">
          <template #title>Vuestro Panel</template>
          <template #toolbar>
            <vuestro-button size="sm" pill variant="white" no-border><vuestro-icon name="sync-alt"></vuestro-icon><span>Refresh</span></vuestro-button>
          </template>
          <vuestro-container>
            <vuestro-card>
              <template #description>CSS themed panel title bar (--vuestro-panel-toolbar-bg and --vuestro-panel-toolbar-fg)</template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>

      <vuestro-card cols="6">
        <vuestro-panel no-border>
          <template #title>Vuestro Panel with no border</template>
          <vuestro-container>
            <vuestro-card>
              <template #description>
                <span>Set the <em>no-border</em> property to remove the default shadow/border.</span>
              </template>
            </vuestro-card>
          </vuestro-container>
        </vuestro-panel>
      </vuestro-card>

    </vuestro-container>
  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'ContainersPanel',
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

.dark-toolbar {
  --vuestro-panel-toolbar-bg: var(--vuestro-dark);
  --vuestro-panel-toolbar-fg: white;
}

</style>