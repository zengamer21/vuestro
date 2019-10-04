<template>
  <div style="flex-grow:1;display:flex;flex-direction:column">
    <vuestro-button size="lg" v-model="outlines">Toggle Outlines</vuestro-button>
    <vuestro-container :class="{ outlines }">
      <vuestro-card>
        <template #heading>VuestroContainer</template>
        <template #description>Use as a generic flexbox-based container to hold any other Vuestro component (or any HTML in general.)
        The default flexbox options are:</template>
        <pre>
flex: 1 0 auto;
flex-wrap: wrap;
flex-direction: row;
align-content: flex-start;
justify-content: flex-start;
        </pre>
        <vuestro-container :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #heading>Other flexbox options are set as properties:</template>
      </vuestro-card>
      
      <vuestro-card>
        <template #subheading><em>column</em></template>
        <vuestro-container column :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>no-wrap</em></template>
        <template #description>Use to have single-row/column of stretched divs</template>
        <vuestro-container no-wrap :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container no-wrap column :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>space-between</em></template>
        <vuestro-container space-between :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>space-evenly</em></template>
        <vuestro-container space-evenly :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>center</em></template>
        <vuestro-container center :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>

      <vuestro-card>
        <template #subheading><em>middle</em></template>
        <template #description><span>Has to be combined with <em>no-wrap</em> to work</span></template>
        <vuestro-container middle no-wrap :class="{ outlines }">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
        <vuestro-container column no-wrap middle :class="{ outlines }" style="height: 100px">
          <div>div</div>
          <div>div</div>
        </vuestro-container>
      </vuestro-card>


    </vuestro-container>
  </div>
</template>

<script>

export default {
  name: 'ContainersContainer',
  data() {
    return {
      outlines: true,
    };
  },
};

</script>

<style scoped>

.vuestro-container {
  flex-basis: 60px;
}

.vuestro-container.outlines {
  border: 1px dashed black;
  position: relative;
  margin-top: 10px;
}
.vuestro-container.outlines:before {
  content: 'VuestroContainer (60px height)';
  position: absolute;
  top: -18px;
  left: 0;
  background-color: var(--vuestro-gray);
}

.vuestro-container.outlines > div {
  border: 1px dashed black;
  position: relative;
}

</style>