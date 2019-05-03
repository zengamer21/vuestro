<template>
  <div class="vuestro-date-picker">
    <div class="vuestro-date-picker-month">
      <div class="month-name"></div>      
    </div>
  </div>
</template>

<script>

import moment from 'moment';

import 'vue-awesome/icons/chevron-up.js';
import 'vue-awesome/icons/chevron-down.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroDatePicker',
  components: {
    Icon,
  },
  props: {

  },
  computed: {

  },
};

</script>

<style scoped>

.vuestro-date-picker {
  display: flex;
}

.vuestro-date-picker-month > .month-name {
  
}

</style>