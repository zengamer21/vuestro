<template>
  <vuestro-container>
    <vuestro-card color="#f47633">
      <template slot="heading">VuestroObjectBrowser</template>
      <template slot="description">
        VuestroObjectBrowser allows browsing of a generic JavaScript object. No restructuring is necessary, it can take any JavaScript Object as input.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        Basic VuestroObjectBrowser just set the 'data' property with the object.
      </template>
      <vuestro-panel>
        <vuestro-object-browser :data="testObject"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        <span>Set the <em>expand-all</em> property to expand all objects and arrays by default</span>
      </template>
      <vuestro-panel>
        <vuestro-object-browser expand-all :data="testObject"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">
        VuestroObjectBrowser also works for a top-level array
      </template>
      <vuestro-panel>
        <vuestro-object-browser expand-all :data="testArray"></vuestro-object-browser>
      </vuestro-panel>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'ObjectBrowser',
  data() {
    return {
      testObject: {
        subObject1: {
          subObjectKey1: 'subObjectValue1',
          subObjectKey2: 'subObjectValue2',
          subObjectKey3: {
            'subSubObjectKey1': 'subSubObjectVal1',
          },
        },
        subObject2: [
          'subObject2ArrayVal1',
          'subObject2ArrayVal2',
          'subObject2ArrayVal3',
          'subObject2ArrayVal4',
        ],
        booleanVal1: true,
        stringVal2: "hello world",
        dateVal1: new Date(),
        numberVal1: 324,
        numberVal2: 8.32,
      },
      testArray: [
        'stringVal',
        133.24,
        true,
        { x: 1 },
      ],
    };
  },
};

</script>

<style scoped>


</style>