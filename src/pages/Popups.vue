<template>
  <vuestro-container>
    <vuestro-card>
      <template #heading>Popups</template>
      <template #description>Vuestro popups include drop-downs, tag selectors, and modals.</template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Drop Down Menu</template>
      <template #description>VuestroDropdown provides a dropdown menu suitable for use both in a menu-bar (i.e. text only) or as a button-style dropdown menu using VuestroButton, with all the associated style options. The drop down will be left-justified unless it would go off screen.</template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        Default is to open on hover
      </template>
      <div class="example-container">
        <vuestro-dropdown>
          <template #title>VuestroDropdown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown>
          <template #title><vuestro-icon name="tractor"></vuestro-icon></template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>
        Set the click-to-open property to open on click
      </template>
      <div class="example-container">
        <vuestro-dropdown click-to-open>
          <template #title>
            <vuestro-icon name="hand-pointer"></vuestro-icon>
            <span>Click-to-Open</span>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown click-to-open>
          <template #title><vuestro-icon name="tractor"></vuestro-icon></template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Set the dark property for a dark-theme compatible dropdown with a nice border for contrast.
      </template>
      <div class="example-container dark">
        <vuestro-dropdown dark click-to-open>
          <template #title>Dark DropDown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown dark click-to-open always-open>
          <template #title>Dark DropDown</template>
          <vuestro-list-button>Long Menu Item 1 which would go off screen automatically flips</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Set the "right" property to force right-justification
      </template>
      <div class="example-container-center">
        <vuestro-dropdown right>
          <template #title>Right-justified</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>stretch</em> property to fill container</span>
      </template>
      <div class="example-stretchy-container">
        <vuestro-dropdown stretch>
          <template #title>Stretchy</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        Or make it look like a button by using a VuestroButton in the "button" slot. VuestroDropdown will automatically wire it up!
      </template>
      <div class="example-vertical-container">
        <vuestro-dropdown>
          <template #button>
            <vuestro-button pill variant="info" size="lg">
              <vuestro-icon name="bullhorn"></vuestro-icon>
              <span>I'm a button!</span>
            </vuestro-button>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown click-to-open close-on-content-click>
          <template #button>
            <vuestro-button variant="info" size="lg">
              <vuestro-icon name="bullhorn"></vuestro-icon>
              <span>Click Me to open drop down</span>
            </vuestro-button>
          </template>
					<vuestro-pill dark clickable @click="onClick">
						<template #title>X</template>
						<template #value>Xylophone</template>
					</vuestro-pill>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Disable the dropdown function by setting the <em>disabled</em> property</span>
      </template>
      <div class="example-container">
        <vuestro-dropdown disabled>
          <template #title>Disabled Dropdown</template>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Speaking of buttons...add buttons to the bottom of a dropdown by adding spans to the <em>buttons</em> slot</span>
      </template>
      <div class="example-container">
        <vuestro-dropdown>
          <template #title>Dropdown w/ buttons</template>
          <template #buttons>
            <span>Button</span>
          </template>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #heading>Modal</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        VuestroModal default configuration with a VuestroButton as trigger
      </template>
      <vuestro-button @click="modalOpen1 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen1" no-scroll>
        <template #title>VuestroModal</template>
        <template #buttons></template>
        <vuestro-container no-grow>
          <vuestro-dropdown click-to-open>
            <template #button>
              <vuestro-button rounded>
                <vuestro-icon name="car"></vuestro-icon>
                <span>Make</span>
              </vuestro-button>
            </template>
            <vuestro-list-button>Acura</vuestro-list-button>
            <vuestro-list-button>Cadillac</vuestro-list-button>
            <vuestro-list-button>Chevy</vuestro-list-button>
            <vuestro-list-button>Dodge</vuestro-list-button>
            <vuestro-list-button>Ford</vuestro-list-button>
            <vuestro-list-button>Honda</vuestro-list-button>
            <vuestro-list-button>Infiniti</vuestro-list-button>
            <vuestro-list-button>Nissan</vuestro-list-button>
            <vuestro-list-button>Lexus</vuestro-list-button>
            <vuestro-list-button>Toyota</vuestro-list-button>
            <vuestro-list-button>Super-loooooooong-title</vuestro-list-button>
          </vuestro-dropdown>
          <vuestro-dropdown click-to-open>
            <template #button>
              <vuestro-button rounded>
                <vuestro-icon name="car"></vuestro-icon>
                <span>Model</span>
              </vuestro-button>
            </template>
            <vuestro-list-button>Suburban</vuestro-list-button>
            <vuestro-list-button>Ram</vuestro-list-button>
            <vuestro-list-button>Festiva</vuestro-list-button>
            <vuestro-list-button>Civic</vuestro-list-button>
            <vuestro-list-button>Camry</vuestro-list-button>
          </vuestro-dropdown>
        </vuestro-container>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Close modal when clicking outside by setting the close-on-blur property
      </template>
      <vuestro-button @click="modalOpen2 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen2" close-on-blur>
        <template #title>VuestroModal</template>
        <template #buttons></template>
        <vuestro-container column>
          <vuestro-button rounded>
            <vuestro-icon name="hospital"></vuestro-icon>
            <span>SOS</span>
          </vuestro-button>
        </vuestro-container>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        VuestroModal has a "toolbar" slot for adding VuestroButtons to the top right, and a "buttons" slot for adding VuestroButtons to the bottom right.
      </template>
      <vuestro-button @click="modalOpen3 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen3" close-on-blur close-text="Done">
        <template #title>VuestroModal</template>
        <template #toolbar>
          <vuestro-button pill no-border variant="info">
            <vuestro-icon name="sync-alt"></vuestro-icon>
            <span>Refresh</span>
          </vuestro-button>
        </template>
        <template #buttons>
          <vuestro-dropdown click-to-open close-on-content-click>
            <template #button>
              <vuestro-button variant="info">
                <template #icon>
                  <vuestro-icon name="list"></vuestro-icon>
                </template>
                Dropdown Button
              </vuestro-button>
            </template>
            <vuestro-list-button>Item 1</vuestro-list-button>
            <vuestro-list-button>Item 2</vuestro-list-button>
          </vuestro-dropdown>
          <vuestro-button variant="primary">
            <vuestro-icon name="download"></vuestro-icon>
            <span>Download</span>
          </vuestro-button>
          <vuestro-button variant="warning">
            <vuestro-icon name="times"></vuestro-icon>
            <span>Cancel</span>
          </vuestro-button>
          <vuestro-button variant="success">
            <vuestro-icon name="save"></vuestro-icon>
            <span>Save</span>
          </vuestro-button>
        </template>
        <p>Modal content</p>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template #heading>Tooltip</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        VuestroTooltip provides a fully template-able Vue tooltip.
      </template>

      <vuestro-container space-between>
        <vuestro-tooltip min-width="200">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">top</vuestro-button>
        </vuestro-tooltip>

        <vuestro-tooltip position="left" rounded min-width="200" no-wrap>
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">left</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="right" min-width="200">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">right</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="bottom" min-width="200">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">bottom</vuestro-button>
        </vuestro-tooltip>
      </vuestro-container>

    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip>
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip position="bottom">
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #description>Tooltip on icon</template>
      <div class="example-container">
        <vuestro-tooltip position="bottom" no-wrap rounded>
          <template #content>Download entire log as JSON</template>
          <vuestro-button round no-border>
            <vuestro-icon name="download"></vuestro-icon>
          </vuestro-button>
        </vuestro-tooltip>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Popups',
  components: {
    Icon,
  },
  data() {
    return {
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
    };
  },
	methods: {
		onClick() {
			console.log('click');
		},
	}
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container-center {
  display: flex;
  justify-content: center;
}
.example-container.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
.example-container.dark {
  padding: 30px 20px 80px 10px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
  justify-content: space-between;
}

.example-vertical-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>