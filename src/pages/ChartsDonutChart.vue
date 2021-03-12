<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template #heading><span class="drag">Donut Chart</span></template>
      <template #description>
        <span>The VuestroDonutChart component can render one series. The data item to use as the categore is specified by <em>categoryField</em> and the value is pulled from <em>valueField</em>. An optional <em>valueTitle</em> key can be used to render a title field for each piece.
        </span>
      </template>
      <vuestro-container gutter="none">
        <vuestro-card cols="4">
          <template #subheading>Basic</template>
          <vuestro-panel class="chart-wrapper">
            <vuestro-donut-chart :data="data" :options="options"></vuestro-donut-chart>
          </vuestro-panel>
        </vuestro-card>
        <vuestro-card  cols="4">
          <template #subheading><span>With <em>text</em> slot for the center value</span></template>
          <vuestro-panel class="chart-wrapper">
            <vuestro-donut-chart :data="data" :options="options">
              <template #text>{{ total | vuestroHumanNum }}</template>
            </vuestro-donut-chart>
          </vuestro-panel>
        </vuestro-card>
        <vuestro-card  cols="4">
          <template #subheading><span>With <em>gaugeMode: true</em> option</span></template>
          <vuestro-panel class="chart-wrapper" style="height: 200px">
            <vuestro-donut-chart :data="data" :options="{ ...options, gaugeMode: true }">
              <template #text>{{ total | vuestroHumanNum }}</template>
            </vuestro-donut-chart>
          </vuestro-panel>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <vuestro-container gutter="none">
        <vuestro-card cols="4">
          <template #subheading>
            <span>With <em>title</em> slot</span>
          </template>
          <vuestro-panel class="chart-wrapper">
            <vuestro-donut-chart :data="data" :options="options">
              <template #text>{{ total | vuestroHumanNum }}</template>
              <template #title>Population</template>
            </vuestro-donut-chart>
          </vuestro-panel>
        </vuestro-card>
        <vuestro-card  cols="4">
          <template #subheading>
            <span>With <em>showLabels: true</em></span>
          </template>
          <vuestro-panel class="chart-wrapper">
            <vuestro-donut-chart :data="data" :options="{ ...options, showLabels: true }">
              <template #text>{{ total | vuestroHumanNum }}</template>
              <template #title>Population</template>
            </vuestro-donut-chart>
          </vuestro-panel>
        </vuestro-card>
      </vuestro-container>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

/* global _ */
export default {
  name: 'DonutChart',
  data() {
    return {
      data: [
        {
          state: 'California',
          pop: 23.1,
        },
        {
          state: 'New York',
          pop: 13.3,
        },
        {
          state: 'Texas',
          pop: 22.2,
        },
        {
          state: 'Nebraska',
          pop: 83.3,
        },
        {
          state: 'Alabama',
          pop: 3.3,
        },
      ],
      options: {
        categoryField: 'state',
        valueField: 'pop',
        valueTitle: 'Population',
      },
    };
  },
  computed: {
    total() {
      return _.sumBy(this.data, 'pop');
    },
  },
  mounted() {
  }
};

</script>


<style scoped>

.chart-wrapper {
  height: 250px;
  width: 300px;
}

</style>