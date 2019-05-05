<template>
  <vuestro-grid :layout.sync="layout">
    <vuestro-card slot-scope="{ item }" :color="item.color">
      <template v-if="item.title" slot="heading"><span class="drag">{{ item.title }}</span></template>
      <div class="frame">
        <vuestro-big-count v-if="item.type == 'counter'" :data="item.data" :options="item.options"></vuestro-big-count>
        <vuestro-donut v-else-if="item.type == 'donut'" :title="item.value+'%'" :percentage="item.value" :width="14"></vuestro-donut>
      </div>
    </vuestro-card>
  </vuestro-grid>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      cnt: 0,
      layout: [
        {
          id: 'w0',
          type: 'counter',
          data: 344,
          options: {
            title: 'Users',
            color: 'var(--vuestro-primary)',
          },
          position: {
            x: 0,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w1',
          type: 'counter',
          data: 13328,
          options: {
            title: 'Sales',
            color: 'var(--vuestro-purple)',
          },
          position: {
            x: 3,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w2',
          type: 'counter',
          data: 73,
          options: {
            title: 'Errors',
            color: 'var(--vuestro-danger)',
          },
          position: {
            x: 6,
            y: 0,
            w: 3,
            h: 1,
          }
        },
        {
          id: 'w3',
          type: 'counter',
          data: 1324,
          options: {
            title: 'Logs',
            color: 'var(--vuestro-cyan)',
          },
          position: {
            x: 9,
            y: 0,
            w: 3,
            h: 1,
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