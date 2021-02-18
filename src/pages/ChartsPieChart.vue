<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template #heading><span class="drag">Pie Chart</span></template>
      <template #description>The Vuestro Pie Chart</template>
      <div class="chart-wrapper">
        <vuestro-pie-chart :data="data" :options="options"></vuestro-pie-chart>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'PieChart',
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
        // enableLegend: true,
        enableToolTip: true,
        // enableLabels: true,
        // enableDonut: true,
        donutTextRender() {
          return "13M";
        },
        donutRadius: 70,
      },
    };
  },
  mounted() {
  }
};

</script>


<style scoped>

.chart-wrapper {
  background-color: var(--vuestro-gray-dark);
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
  display: flex;
  height: 300px;
  width: 300px;
}

.vuestro-dark .frame {
  border: 1px solid var(--vuestro-outline);
}

</style>