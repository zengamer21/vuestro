<template>
  <vuestro-button class="vuestro-date-picker-year"
                  :class="{ isThisYear }"
                  no-border
                  stretch
                  no-margin
                  no-padding
                  :variant="isThisYear ? 'info':'text'"
                  @click="onClick">
    {{ year }}
  </vuestro-button>
</template>

<script>

import moment from 'moment';

export default {
  name: 'VuestroDatePickerYear',
  props: ['year'],
  computed: {
    isThisYear() {
      return moment().year(this.year).isSame(moment(), 'year');
    },
  },
  methods: {
    onClick() {
      this.$emit('click', moment().year(this.year).startOf('year'));
    },
  },
};

</script>

<style scoped>

.vuestro-date-picker-year {
  height: 35px;
}
/* override color when inside a dropdown automatically */
.vuestro-dropdown .vuestro-date-picker-year >>> .vuestro-button-content {
  color: var(--vuestro-light);
}

.vuestro-date-picker-month.isThisYear {
  font-weight: 700;
}

</style>