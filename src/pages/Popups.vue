<template>
  <vuestro-container>
    <vuestro-card>
      <template slot="heading">Popups</template>
      <template slot="description">Vuestro popups include drop-downs, tag selectors, and modals.</template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">Drop Down Menu</template>
      <template slot="description">VuestroDropdown provides a dropdown menu suitable for use both in a menu-bar (i.e. text only) or as a button-style dropdown menu using VuestroButton, with all the associated style options. The drop down will be left-justified unless it would go off screen.</template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template slot="description">
        Default is to open on hover
      </template>
      <div class="example-container">
        <vuestro-dropdown>
          <template slot="title">VuestroDropdown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown>
          <template slot="title"><icon name="tractor"></icon></template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card cols="6">
      <template slot="description">
        Set the click-to-open property to open on click
      </template>
      <div class="example-container">
        <vuestro-dropdown click-to-open>
          <template slot="title">
            <icon name="hand-pointer"></icon>
            <span>Click-to-Open</span>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown click-to-open>
          <template slot="title"><icon name="tractor"></icon></template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Set the dark property for a dark-theme compatible dropdown with a nice border for contrast.
      </template>
      <div class="example-container dark">
        <vuestro-dropdown dark click-to-open>
          <template slot="title">Dark DropDown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown dark click-to-open always-open>
          <template slot="title">Dark DropDown</template>
          <vuestro-list-button>Long Menu Item 1 which would go off screen</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Set the "right" property to force right-justification
      </template>
      <div class="example-container-center">
        <vuestro-dropdown right>
          <template slot="title">Right-justified</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        VuestroDropdown automatically stretches to fill its container
      </template>
      <vuestro-dropdown>
        <template slot="title">Stretchy</template>
        <vuestro-list-button>Menu Item 1</vuestro-list-button>
        <vuestro-list-button>Menu Item 2</vuestro-list-button>
      </vuestro-dropdown>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Or make it look like a button by using a VuestroButton in the "button" slot. VuestroDropdown will automatically wire it up!
      </template>
      <div class="example-container">
        <vuestro-dropdown>
          <template slot="button">
            <vuestro-button pill variant="info" size="lg">
              <icon name="bullhorn"></icon>
              <span>I'm a button!</span>
            </vuestro-button>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-dropdown click-to-open>
          <template slot="button">
            <vuestro-button variant="info" size="lg">
              <icon name="bullhorn"></icon>
              <span>Click Me to open drop down</span>
            </vuestro-button>
          </template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-dropdown>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="heading">Modal</template>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        VuestroModal default configuration with a VuestroButton as trigger
      </template>
      <vuestro-button @click="modalOpen1 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen1">
        <template slot="title">VuestroModal</template>
        <template slot="buttons"></template>
        <p>Modal content</p>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Close modal when clicking outside by setting the close-on-blur property
      </template>
      <vuestro-button @click="modalOpen2 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen2" close-on-blur>
        <template slot="title">VuestroModal</template>
        <template slot="buttons"></template>
        <p>Modal content</p>
      </vuestro-modal>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        VuestroModal has a "buttons" slot for adding VuestroButtons
      </template>
      <vuestro-button @click="modalOpen3 = true">Open Modal</vuestro-button>
      <vuestro-modal :active.sync="modalOpen3" close-on-blur>
        <template slot="title">VuestroModal</template>
        <template slot="buttons">
          <vuestro-button variant="info">
            <icon name="sync-alt"></icon>
            <span>Refresh</span>
          </vuestro-button>
        </template>
        <p>Modal content</p>
      </vuestro-modal>
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

</style>