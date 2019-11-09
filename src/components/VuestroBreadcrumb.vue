<template>
  <div class="vuestro-breadcrumb">
    <div class="vuestro-breadcrumb-root">
      Root
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuestroBreadcrumb',
  props: {
    root: { type: null },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-breadcrumb-height: 30px;
  --vuestro-breadcrumb-root-bg: var(--vuestro-indigo);
}

</style>

<style scoped>

.vuestro-breadcrumb {
  width: 100%;
  flex: none;
  height: var(--vuestro-breadcrumb-height);
  border: 1px solid var(--vuestro-outline);
  display: flex;
}

.vuestro-breadcrumb > div {
  height: var(--vuestro-breadcrumb-height);
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.vuestro-breadcrumb > div:after {
  padding-left: 10px;
  content: '';
  width: 0;
  height: 0;
  border-top: calc(var(--vuestro-breadcrumb-height) / 2) solid transparent;
  border-bottom: calc(var(--vuestro-breadcrumb-height) / 2) solid transparent;
  border-left: 10px solid var(--vuestro-breadcrumb-bg);
}

.vuestro-breadcrumb-root {
  background-color: var(--vuestro-breadcrumb-root-bg);
  color: var(--vuestro-text-color-inverse);
}

</style>
