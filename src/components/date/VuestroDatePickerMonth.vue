<template>
  <vuestro-button class="vuestro-date-picker-month"
                  :class="{ isThisMonth }"
                  no-border
                  stretch
                  no-margin
                  no-padding
                  :variant="isThisMonth ? 'info':'text'"
                  @click.stop="onClick">{{ month }}</vuestro-button>
</template>

<script>

import moment from 'moment';

export default {
  name: 'VuestroDatePickerMonth',
  props: ['year', 'month'],
  computed: {
    isThisMonth() {
      return moment().year(this.year).month(this.month).isSame(moment(), 'month');
    },
  },
  methods: {
    onClick() {
      this.$emit('click', moment().year(this.year).month(this.month).startOf('month'));
    },
  },
};

</script>

<style scoped>


.vuestro-date-picker-month {
  height: 35px;
}
/* override color when inside a dropdown automatically */
.vuestro-dropdown .vuestro-date-picker-month >>> .vuestro-button-content {
  color: var(--vuestro-light);
}

.vuestro-date-picker-month.isThisMonth {
  font-weight: 700;
}

</style>