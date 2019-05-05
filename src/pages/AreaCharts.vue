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
              title: 'Pizza',
              value1: 2,
              value2: 12,
              value3: 8,
            },
            {
              title: 'Tacos',
              value1: 2,
              value2: 6,
              value3: 19,
            },
            {
              title: 'Burgers',
              value1: 3,
              value2: 33,
              value3: 8,
            },
            {
              title: 'Ice Cream',
              value1: 6,
              value2: 13,
              value3: 2,
            },
          ],
          options: {
            smooth: true,
            valueKeys: ['value1', 'value2', 'value3'],
          },
          position: {
            x: 0,
            y: 0,
            w: 12,
            h: 5,
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
}

.vuestro-dark .frame {
  border: 1px solid var(--vuestro-outline);
}

.drag {
  cursor: move;
}

</style>