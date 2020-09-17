<template>
  <vuestro-container no-wrap>
    <vuestro-card color="var(--vuestro-cyan)" cols=6>
      <template #heading>Settings</template>
      <vuestro-panel stretch>
        <template #title>UI</template>
        <vuestro-container items-start column>
          <vuestro-button checkbox :value="isDarkUI" @click="toggleIsDarkUI">Dark UI</vuestro-button>
          <vuestro-button checkbox :value="isSidebarMini" @click="setSidebarMini(!isSidebarMini)">Mini Sidebar</vuestro-button>
        </vuestro-container>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

/* global Vuex */

export default {
  name: 'Settings',
  computed: {
    ...Vuex.mapGetters(['isDarkUI', 'isSidebarMini']),
  },
  methods: {
    ...Vuex.mapActions(['toggleIsDarkUI', 'setSidebarMini']),
  }
};

</script>