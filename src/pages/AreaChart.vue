<template>
  <vuestro-grid :layout.sync="layout">
    <vuestro-card slot-scope="{ item }" :color="item.color">
      <template slot="heading"><span class="drag">{{ item.title }}</span></template>
      <div class="frame">
        <vuestro-donut v-if="item.type == 'donut'" :title="item.value+'%'" :percentage="item.value" :width="14"></vuestro-donut>
        <vuestro-bar-chart v-if="item.type == 'bar'" :data="item.data" :options="item.options"></vuestro-bar-chart>
        <vuestro-area-chart v-if="item.type == 'area'" :data="item.data" :options="item.options"></vuestro-area-chart>
        <vuestro-sankey-chart v-if="item.type == 'sankey'" :data="item.data" :options="item.options"></vuestro-sankey-chart>
      </div>
    </vuestro-card>
  </vuestro-grid>
</template>

<script>

export default {
  name: 'Charts',
  data() {
    return {
      layout: [
        {
          id: 'w3',
          type: 'area',
          title: 'Area Chart',
          data: [
            {
              key: '2019-10-01T00:00:00Z',
              value1: 2,
              value2: 12,
              value3: 8,
            },
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
              value3: -2,
            },
            {
              key: '2019-10-01T06:00:00Z',
              value1: 32,
              value2: 13,
              value3: 2,
            },
          ],
          options: {
            valueKeys: ['value1', 'value2', 'value3'],
            timeSeries: true,
            // margin: {
            //   top: 20,
            //   bottom: 20,
            //   left: 20,
            //   right: 20,
            // },
            // showAxes: true,
          },
          position: {
            x: 0,
            y: 0,
            w: 12,
            h: 3,
          }
        },
      ],
    };
  },
};

</script>


<style scoped>

.frame {
  margin-top: 5px;
  flex-grow: 1;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.vuestro-dark .frame {
  border: 1px solid var(--vuestro-outline);
}

.drag {
  cursor: move;
}

</style>