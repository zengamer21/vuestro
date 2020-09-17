<template>
  <vuestro-app title="vuestro">
    <template #logo>
    </template>

    <template #navbar></template>
    <template #sidebar>
      <vuestro-sidebar :user="user"
                       :user-img="userImg"
                       :role="role"
                       :mini="isSidebarMini"
                       @update:mini="onSetSidebar">
      </vuestro-sidebar>
    </template>
    <template #sidebar-footer></template>

    <template #footer>
      <p class="default-footer">Vuestro ❤ Vue</p>
    </template>

  </vuestro-app>
</template>

<script>

/* global __VERSION__, Vuex*/

export default {
  name: 'app',
  data() {
    return {
      version: __VERSION__,
      user: 'A Vue User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
  computed: {
    ...Vuex.mapGetters(['isSidebarMini']),
  },
  methods: {
    onSetSidebar(d) {
      this.$store.dispatch('setSidebarMini', d);
    },
  }
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.default-footer {
  text-align: center;
}

</style>
