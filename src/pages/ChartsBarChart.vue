<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Bar Chart</span></template>
      <template #description>The Vuestro Bar Chart</template>
      <div class="chart-wrapper">
        <vuestro-bar-chart :data="data" :options="options"></vuestro-bar-chart>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'BarChart',
  data() {
    return {
      data: [
        {
          key: '2019-10-01T01:00:00Z',
          value1: 2,
          value2: 6,
          value3: 19,
        },
        {
          key: '2019-10-01T02:00:00Z',
          value1: 3,
          value2: 33,
          value3: 8,
        },
        {
          key: '2019-10-01T03:00:00Z',
          value1: 6,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T04:00:00Z',
          value1: 1,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T05:00:00Z',
          value1: 1,
          value2: 13,
          value3: 3,
        },
        {
          key: '2019-10-01T06:00:00Z',
          value1: 22,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T07:00:00Z',
          value1: 8,
          value2: 13,
          value3: 2,
        },
        {
          key: '2019-10-01T08:00:00Z',
          value1: 15,
          value2: 12,
          value3: 2,
        },
        {
          key: '2019-10-01T09:00:00Z',
          value1: 23,
          value2: 13,
          value3: 2,
          value4: 35,
        },
      ],
      options: {
        // showAxes: true,
        showYLabels: true,
        // showXLabels: true,
        showGrid: true,
        // stacked: true,
        axisYPadding: 30,
        axisXPadding: 20,
        valueAxis: {
          render(d) {
            return d.toFixed(2);
          }
        },
        series: [
          {
            title: 'Series 1',
            field: 'value1',
          },
          {
            title: 'Series 2',
            field: 'value2',
            render(d) {
              return d.toFixed(2);
            },
          },
          {
            title: 'Series 3',
            field: 'value3',
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
  background-color: var(--vuestro-panel-bg);
  flex-grow: 1;
  border-radius: 4px;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  height: 300px;
}

.vuestro-dark .frame {
  border: 1px solid var(--vuestro-outline);
}

</style>