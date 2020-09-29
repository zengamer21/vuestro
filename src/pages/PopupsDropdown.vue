<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-green)">
      <template #heading>Dropdowns</template>
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
        <vuestro-dropdown click-to-open close-on-content-click>
          <template #button>
            <vuestro-button variant="info" size="lg">
              <template #placeholder>PLACEHOLDER</template>
              {{ vuestroGetValueById({
                  data: exampleDatasetWithIds,
                  idField: 'id',
                  idValue: selectedId,
                  field: 'val',
                  backupText: 'Click to Select'
                })
              }}
            </vuestro-button>
          </template>
          <vuestro-list-button v-for="d in exampleDatasetWithIds" @click="selectedId = d.id">{{ d.val }}</vuestro-list-button>
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

  </vuestro-container>
</template>

<script>

export default {
  name: 'PopupsDropdown',
  data() {
    return {
      selectedId: null,
      exampleDatasetWithIds: [
        {
          id: 'id0',
          val: 'Value for id0',
        },
        {
          id: 'id1',
          val: 'Value for id1',
        },
        {
          id: 'id2',
          val: 'Value for id2',
        },
      ],
    };
  },
	methods: {
		onClick() {
			console.log('click');
		},
		onAfterOpen() {
		  console.log('opened');
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