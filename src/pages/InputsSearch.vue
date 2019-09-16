<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Search Input</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Basic Search Box
      </template>
      <template #description>
        Provide v-model to bind to a local var
      </template>
      <vuestro-search-box v-model="exampleText" placeholder="Basic Search Box"></vuestro-search-box>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        Search Box with History
      </template>
      <template #description>
        Add the history property to enable a dropdown which automatically tracks history
      </template>
      <vuestro-search-box v-model="exampleText" history placeholder="Search Box with History"></vuestro-search-box>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

export default {
  name: 'SearchInput',
  data() {
    return {
      exampleText: '',
    };
  },
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}

</style>