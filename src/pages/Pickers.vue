<template>
  <vuestro-card-container>
    <vuestro-card color="var(--vuestro-purple)">
      <template slot="heading">Pickers</template>
      <template slot="description">
        Pickers are a necessary part of input to any Web application. Vuestro attempts to provide a comprehensive set of pickers for any need, from datetime pickers to color pickers.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">Vuestro Color Picker</template>
      <template slot="description">
        Simple drop-down color picker to choose within a pre-defined palette.
      </template>
      <vuestro-color-picker v-model="color" :colors="colorOptions"></vuestro-color-picker>
    </vuestro-card>

    <vuestro-card>
      <template slot="subheading">Vuestro Time Picker</template>
    </vuestro-card>
    
    <vuestro-card cols="6">
      <template slot="description">
        Select time by using spinner controls or typing in each field.
      </template>
      <vuestro-time-picker v-model="exampleTime"></vuestro-time-picker>
    </vuestro-card>

    <vuestro-card cols="6">
      <template slot="description">
        ...include seconds by setting the seconds property
      </template>
      <vuestro-time-picker v-model="exampleTime" seconds></vuestro-time-picker>
    </vuestro-card>

  </vuestro-card-container>
</template>

<script>

export default {
  name: 'Pickers',
  data() {
    return {
      color: '#ff80ab',
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
  		exampleTime: new Date(),
    };
  },
};

</script>