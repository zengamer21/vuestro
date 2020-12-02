<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Pie Chart</span></template>
      <template #description>The Vuestro Pie Chart</template>
      <div class="chart-wrapper">
        <vuestro-pie-chart :data="data" :options="options"></vuestro-pie-chart>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

/* global Vue */
export default {
  name: 'PieChart',
  data() {
    return {
      data: [
        {
          key: 'California',
          value: 50.0,
        },
        {
          key: 'New York',
          value: 30.0,
        },
        {
          key: 'Texas',
          value: 20.0,
        },
      ],
      options: {
        enableToolTip: true,
        enableLabels: true,
        enableDonut: false,
        donutCenterRender() {
            return "Center Call";
        },        
        //donutCenterRender: "Center",
        donutRadius: 30,
        series: [
          {
            title: 'Value',
            field: 'value',
          },
        ],
      },
    };
  },
  mounted() {
  }
};

</script>


<style scoped>

.chart-wrapper {
  flex-grow: 1;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  height: 300px;
}

.vuestro-dark .frame {
  border: 1px solid var(--vuestro-outline);
}

</style>