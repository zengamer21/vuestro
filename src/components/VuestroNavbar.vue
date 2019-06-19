<template>
  <div class="vuestro-navbar">
    <div v-if="title" class="vuestro-title-text">{{ title }}</div>
    <div class="v-separator"></div>
    <div class="vuestro-navbar-slot">
      <slot>
        <vuestro-search-box placeholder="Search"
                            v-model="search"
                            history>
        </vuestro-search-box>
      </slot>
    </div>
  </div>
</template>

<script>

import VuestroSearchBox from './VuestroSearchBox.vue';
import VuestroButton from './VuestroButton.vue';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroNavbar',
  components: {
    VuestroSearchBox,
    VuestroButton,
    Icon,
  },
  props: {
    title: { type: String, default: '' }, // app title
  },
  data() {
    return {
      search: '',
    };
  },
};

</script>

<style>
/* override these global css vars to set syle */
.vuestro-app {
  --vuestro-navbar-height: 60px;
  --vuestro-navbar-bg: var(--vuestro-content-bg);
  --vuestro-navbar-fg: #eee;
  --vuestro-navbar-border: transparent;
}
</style>

<style scoped>

.vuestro-navbar {
  width: 100%;
  height: var(--vuestro-navbar-height);
  background-color: var(--vuestro-navbar-bg);
  border-bottom: 1px solid var(--vuestro-navbar-border);
  flex: none; /* don't let flexbox reduce our size */
  display: flex;
  align-items: center;
  padding-right: 5px;
  z-index: 1000;
}

.vuestro-title-text {
  font-size: 34px;
  padding: 0px 15px;
  font-weight: 300;
}

.v-separator {
  border-right: 1px solid var(--vuestro-outline);
  height: 20px;
  margin-right: 10px;
}

.vuestro-navbar-slot {
  display: flex;
  flex-grow: 1;
}

</style>