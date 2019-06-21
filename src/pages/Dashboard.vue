<template>
  <vuestro-grid :layout.sync="layout">
    <component slot-scope="{ item }" :is="item.type" :data="item.data" :options="item.options"></component>
  </vuestro-grid>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      exampleData: [{
        stat: 0,
      }],
      layout: [],
    };
  },
  mounted() {
    this.loadDefaultLayout();
    setInterval(() => {
      this.exampleData[0].stat++;
    }, 1000);
  },
  methods: {
    loadDefaultLayout() {
      this.layout = [
        {
          id: 'w0',
          type: 'vuestro-stat-tile',
          data: this.exampleData,
          options: {
            title: 'Users',
            color: 'var(--vuestro-primary)',
            icon: 'users',
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
          type: 'vuestro-stat-tile',
          data: [{ stat: 13328}],
          options: {
            title: 'Sales',
            color: 'var(--vuestro-purple)',
            icon: 'cash-register',
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
          type: 'vuestro-stat-tile',
          data: [{ stat: 2373}],
          options: {
            title: 'Logs',
            color: 'var(--vuestro-cyan)',
            icon: 'warehouse',
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
          type: 'vuestro-stat-tile',
          data: [{ stat: 'running'}],
          options: {
            title: 'Status',
            color: 'var(--vuestro-danger)',
            icon: 'exclamation'
          },
          position: {
            x: 9,
            y: 0,
            w: 3,
            h: 1,
          }
        },
      ];
    },
  }
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