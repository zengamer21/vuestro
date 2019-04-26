<template>
  <vuestro-card-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template slot="heading">Pickers</template>
      <template slot="description">
        Pickers are a necessary part of input to any Web application. Vuestro attempts to provide a comprehensive set of pickers for any need, from datetime pickers to color pickers.
      </template>
    </vuestro-card>


    <vuestro-color-picker v-model="color" :colors="colorOptions"></vuestro-color-picker>
    <p>The Vuestro Color Picker allows</p>
    <vuestro-color-picker v-model="color" :colors="colorOptions"></vuestro-color-picker>
    <p>The Vuestro Color Picker allows</p>
  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Pickers',
  data() {
    return {
      color: '#82832d',
      colorOptions: [
        '#ff8a80',
        '#ff80ab',
        '#ea80fc',
        '#b388ff',
        '#8c9eff',
        '#82b1ff',
        '#80d8ff',
        '#84ffff',
        '#a7ffeb',
        '#b9f6ca',
        '#ccff90',
        '#f4ff81',
        '#ffff8d',
        '#ffe57f',
        '#ffd180',
        '#ff9e80',
  		],
    };
  },
};

</script>