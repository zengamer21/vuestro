<template>
  <vuestro-card-container>
    <vuestro-card>
      <template slot="heading">Popups</template>
      <template slot="description">Vuestro popups include drop-downs, tag selectors, and modals.</template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">Vuestro Drop Down</template>
    </vuestro-card>

    <vuestro-card cols="6">
      <template slot="description">
        Default is to open on hover
      </template>
      <div class="example-container">
        <vuestro-drop-down left>
          <template slot="title">VuestroDropDown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-drop-down>
      </div>
    </vuestro-card>

    <vuestro-card cols="6">
      <template slot="description">
        Set the click-open property to open on click
      </template>
      <div class="example-container">
        <vuestro-drop-down click-open left>
          <template slot="title">Click-to-Open</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-drop-down>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Set the dark property for a dark-theme compatible dropdown with a nice border for contrast.
      </template>
      <div class="example-container dark">
        <vuestro-drop-down dark click-open left>
          <template slot="title">Dark DropDown</template>
          <vuestro-list-button>Menu Item 1</vuestro-list-button>
          <vuestro-list-button>Menu Item 2</vuestro-list-button>
        </vuestro-drop-down>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        VuestroDropDown automatically stretches to fill its container
      </template>
      <vuestro-drop-down left>
        <template slot="title">Stretchy</template>
        <vuestro-list-button>Menu Item 1</vuestro-list-button>
        <vuestro-list-button>Menu Item 2</vuestro-list-button>
      </vuestro-drop-down>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">Vuestro Modal</template>
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


  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Popups',
  data() {
    return {
      modalOpen1: false,
      modalOpen2: false,
    };
  },
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}

</style>