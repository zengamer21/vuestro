<template>
  <vuestro-grid :layout.sync="layout">
    <vuestro-card slot-scope="{ item }" :color="item.color">
      <template slot="heading"><span class="drag">{{ item.title }}</span></template>
      <div class="frame">
        <vuestro-donut :title="item.value+'%'" :percentage="item.value" :width="14"></vuestro-donut>
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
          id: 'w1',
          title: 'Donut Gauge',
          value: 73,
          color: '#4bbc79',
          position: {
            x: 0,
            y: 0,
            w: 4,
            h: 4,
          }
        },
        {
          id: 'w2',
          title: 'Total users for period',
          color: '#f47633',
          position: {
            x: 4,
            y: 0,
            w: 4,
            h: 4,
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