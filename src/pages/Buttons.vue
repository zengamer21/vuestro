<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Buttons</template>
      <template #description>
        Buttons come in all shapes and sizes. Vuestro attempts to provide a flexible implementation suitable for the most common applications in an attractive, easily-configurable component. Outline mode is the default look and feel, but Vue props allow many other options.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic flat, blocky button
      </template>
      <div class="example-flexbox">
        <vuestro-button>Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic button wrapping a VuestroIcon
      </template>
      <div class="example-flexbox">
        <vuestro-button>
          <vuestro-icon name="flag"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic button with VuestroIcon and label (make sure the labels is wrapped in a span/div for spacing in between)
      </template>
      <div class="example-flexbox">
        <vuestro-button>
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>Label in span</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Make it less pointy by setting the rounded property
      </template>
      <div class="example-flexbox">
        <vuestro-button rounded>
          <vuestro-icon name="snowflake"></vuestro-icon>
        </vuestro-button>
        <vuestro-button rounded>Rounded Button</vuestro-button>
        <vuestro-button rounded>
          <vuestro-icon name="fire"></vuestro-icon>
          <span>Rounded Button</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...make pills by setting the pill property
      </template>
      <div class="example-flexbox">
        <vuestro-button pill>
          <vuestro-icon name="capsules"></vuestro-icon>
        </vuestro-button>
        <vuestro-button pill>Pill-shaped Button</vuestro-button>
        <vuestro-button pill>
          <vuestro-icon name="capsules"></vuestro-icon>
          <span>Pill-shaped Button</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Add shadow by setting the <em>shadow</em> property</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button rounded shadow>
          <span>Shadow</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or go all the way by setting the round property
      </template>
      <div class="example-flexbox">
        <vuestro-button round size="sm">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="lg">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="xl">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="sm">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round>
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="lg">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="xl">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <em>size</em> property {'sm', 'md', 'lg', 'xl'} to affect the size of the button</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button size="sm"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="sm">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>sm Button</span>
        </vuestro-button>
        <vuestro-button size="md"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="md">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>md(default) Button</span>
        </vuestro-button>
        <vuestro-button size="lg"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="lg">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>lg Button</span>
        </vuestro-button>
        <vuestro-button size="xl"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="xl">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>xl Button</span>
        </vuestro-button>
      </div>
      <div class="example-flexbox">
        <vuestro-button round size="sm"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="sm">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>sm Button</span>
        </vuestro-button>
        <vuestro-button round size="md"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="md">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>md(default) Button</span>
        </vuestro-button>
        <vuestro-button round size="lg"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="lg">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>lg Button</span>
        </vuestro-button>
        <vuestro-button round size="xl"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="xl">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>xl Button</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Button variant can be changed by setting the variant property
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
      <div class="example-flexbox">
        <vuestro-button value variant="primary">primary</vuestro-button>
        <vuestro-button value variant="secondary">secondary</vuestro-button>
        <vuestro-button value variant="success">success</vuestro-button>
        <vuestro-button value variant="warning">warning</vuestro-button>
        <vuestro-button value variant="danger">danger</vuestro-button>
        <vuestro-button value variant="info">info</vuestro-button>
        <vuestro-button value variant="white">white</vuestro-button>
        <vuestro-button value variant="black">black</vuestro-button>
        <vuestro-button value variant="text">text</vuestro-button>
        <vuestro-button value variant="link">link</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Go buttons without borders by setting the no-border property
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
        <vuestro-button no-border round size="sm">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button no-border round size="sm">
          <vuestro-icon name="external-link-alt"></vuestro-icon>
        </vuestro-button>
        <vuestro-button no-border pill size="sm">
          <vuestro-icon name="download"></vuestro-icon>
          <span>Download</span>
        </vuestro-button>
        <vuestro-button no-border round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Enable checkbox mode by setting the <em>checkbox</em> property</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="info" size="md" checkbox v-model="exampleCheckbox">Slot content automatically renders beside it!</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Provide v-model without the checkbox property to enable toggle mode
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary" v-model="exampleCheckbox">I can toggle!</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or simply define the value prop for a simple colorized button
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary" value>Button</vuestro-button>
        <vuestro-button variant="success" value pill>Button</vuestro-button>
        <vuestro-button variant="warning" value round>
          <vuestro-icon name="bug"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Buttons will stretch to available space by setting the stretch property
      </template>
      <vuestro-button stretch>Button</vuestro-button>
      <vuestro-button pill stretch>Button</vuestro-button>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        <span>Disable the button by setting the <em>disabled</em> propery</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button disabled>Disabled Button</vuestro-button>
        <vuestro-button disabled rounded value>Disabled Button</vuestro-button>
        <vuestro-button disabled pill>Disabled Button</vuestro-button>
        <vuestro-button disabled variant="primary">Disabled Button</vuestro-button>
        <vuestro-button disabled pill no-border>Disabled Button</vuestro-button>
        <vuestro-button disabled round no-border>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        <span>Enable dense arrangements by setting the <em>no-margin</em> property</span>
      </template>
      <div class="example-calculator">
        <vuestro-button no-margin stretch variant="primary">7</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">8</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">9</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">4</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">5</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">6</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">1</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">2</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">3</vuestro-button>
      </div>
      <div class="example-calculator">
        <vuestro-button no-margin stretch variant="primary">0</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Get dark mode by setting the <em>dark</em> property</span>
      </template>
      <div class="example-flexbox dark">
        <vuestro-button dark>
          <vuestro-icon name="tractor"></vuestro-icon>
        </vuestro-button>
        <vuestro-button dark>Dark with Border</vuestro-button>
        <vuestro-button dark>
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>Dark with Border</span>
        </vuestro-button>
        <vuestro-button dark no-border pill variant="secondary">
          <vuestro-icon name="tractor"></vuestro-icon>
        </vuestro-button>
        <vuestro-button dark no-border pill variant="secondary">Dark Pill w/o Border</vuestro-button>
        <vuestro-button dark no-border pill variant="secondary">
          <vuestro-icon name="tractor"></vuestro-icon>
          <span>Dark Pill w/o Border</span>
        </vuestro-button>

        <vuestro-button dark checkbox v-model="exampleCheckbox"></vuestro-button>
      </div>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Buttons',
  components: {
    Icon,
  },
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
  flex-wrap: wrap;
}

.example-calculator {
  display: flex;
  flex-wrap: wrap;
  width: 100px;
}
.example-calculator .vuestro-button {
  min-width: 30px;
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