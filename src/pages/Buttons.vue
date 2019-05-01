<template>
  <vuestro-card-container>
    <vuestro-card cols="12" color="#f47633">
      <template slot="heading">Buttons</template>
      <template slot="description">
        Buttons come in all shapes and sizes. Vuestro attempts to provide a flexible implementation suitable for the most common applications in an attractive, easy-to-use component.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Basic button
      </template>
      <div class="example-flexbox">
        <vuestro-button>Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Make it less pointy by setting the rounded property
      </template>
      <div class="example-flexbox">
        <vuestro-button rounded>Rounded Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        ...or go all the way by setting the pill property
      </template>
      <div class="example-flexbox">
        <vuestro-button pill>Pill-shaped Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Font size is inherited, but the size {'sm', 'md', 'lg'} property modifies inner padding
      </template>
      <div class="example-flexbox bigger-font">
        <vuestro-button>Large Text Button</vuestro-button>
        <vuestro-button size="sm">sm Button</vuestro-button>
        <vuestro-button size="md">md(default) Button</vuestro-button>
        <vuestro-button size="lg">lg Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Checkbox mode
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="info" checkbox v-model="exampleCheckbox"></vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Provide v-model without the checkbox property to enable toggle mode
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary" v-model="exampleCheckbox">I can toggle!</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Buttons will stretch to available space by setting the stretch property.
      </template>
      <vuestro-button stretch>Button</vuestro-button>
      <vuestro-button pill stretch>Button</vuestro-button>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Button variant can be changed by setting the variant property.
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary">primary</vuestro-button>
        <vuestro-button variant="secondary">secondary</vuestro-button>
        <vuestro-button variant="success">success</vuestro-button>
        <vuestro-button variant="warning">warning</vuestro-button>
        <vuestro-button variant="danger">danger</vuestro-button>
        <vuestro-button variant="info">info</vuestro-button>
        <vuestro-button variant="white">white</vuestro-button>
        <vuestro-button variant="black">black</vuestro-button>
        <vuestro-button variant="text">text</vuestro-button>
        <vuestro-button variant="link">link</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Go buttons without borders by setting the no-border property.
      </template>
      <div class="example-flexbox">
        <vuestro-button no-border variant="primary">primary</vuestro-button>
        <vuestro-button no-border variant="secondary">secondary</vuestro-button>
        <vuestro-button no-border variant="success">success</vuestro-button>
        <vuestro-button no-border variant="warning">warning</vuestro-button>
        <vuestro-button no-border variant="danger">danger</vuestro-button>
        <vuestro-button no-border variant="info">info</vuestro-button>
        <vuestro-button no-border variant="white">white</vuestro-button>
        <vuestro-button no-border variant="black">black</vuestro-button>
        <vuestro-button no-border variant="text">text</vuestro-button>
        <vuestro-button no-border variant="link">link</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Disable the button by setting the disabled propery
      </template>
      <div class="example-flexbox">
        <vuestro-button disabled>Disabled Button</vuestro-button>
        <vuestro-button disabled rounded>Disabled Button</vuestro-button>
        <vuestro-button disabled pill>Disabled Button</vuestro-button>
        <vuestro-button disabled variant="primary">Disabled Button</vuestro-button>
      </div>
    </vuestro-card>


    <vuestro-card>
      <template slot="description">
        Enable dense arrangements by setting the no-spacing property
      </template>
      <div class="example-calculator">
        <vuestro-button no-spacing variant="primary">7</vuestro-button>
        <vuestro-button no-spacing variant="primary">8</vuestro-button>
        <vuestro-button no-spacing variant="primary">9</vuestro-button>
        <vuestro-button no-spacing variant="primary">4</vuestro-button>
        <vuestro-button no-spacing variant="primary">5</vuestro-button>
        <vuestro-button no-spacing variant="primary">6</vuestro-button>
        <vuestro-button no-spacing variant="primary">1</vuestro-button>
        <vuestro-button no-spacing variant="primary">2</vuestro-button>
        <vuestro-button no-spacing variant="primary">3</vuestro-button>
        <vuestro-button no-spacing variant="primary">0</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template slot="description">
        Get dark mode by setting the dark property
      </template>
      <div class="example-flexbox dark">
        <vuestro-button dark no-border pill variant="secondary" size="lg">Dark Button</vuestro-button>
      </div>
    </vuestro-card>

  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Buttons',
  data() {
    return {
      exampleCheckbox: true,
    };
  },
};

</script>

<style scoped>

.example-flexbox {
  display: flex;
  align-items: flex-start;
}

.example-calculator {
  display: flex;
  flex-wrap: wrap;
  width: 250px;
}
.example-calculator .vuestro-button {
  flex-grow: 1;
  min-width: 80px;
}
.bigger-font {
  font-size: 18px;
}
.example-flexbox.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}
.example-flexbox.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}

</style>