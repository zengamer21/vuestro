<template>
  <vuestro-button v-if="day"
                  class="vuestro-date-picker-day"
                  :class="{ isToday, isSelected }"
                  no-border
                  stretch
                  no-margin
                  no-padding
                  :variant="isToday ? 'info':'text'"
                  @click="onClick">
    {{ day }}
  </vuestro-button>
  <div v-else class="vuestro-date-picker-day"></div>
</template>

<script>

import moment from 'moment';

export default {
  name: 'VuestroDatePickerDay',
  props: ['date', 'value'],
  computed: {
    isToday() {
      return this.date && moment(this.date).isSame(moment(), 'day');
    },
    isSelected() {
      if (this.value) {
        if (this.value.length === 1) {
          if (moment(this.date).isSame(moment(this.value[0]).startOf('day'))) {
            return true;
          }
        } else {
          if (moment(this.date).isSameOrAfter(this.value[0]) &&
              moment(this.date).isSameOrBefore(this.value[1])) {
                return true;
          }
        }
      }
      return false;
    },
    day() {
      if (this.date) {
        return this.date.date();
      }
      return '';
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.date.toDate());
    },
  },
};

</script>

<style scoped>


.vuestro-date-picker-day {
  height: 20px;
}
/* override color when inside a dropdown automatically */
.vuestro-dropdown .vuestro-date-picker-day >>> .vuestro-button-content {
  color: var(--vuestro-light);
}

.vuestro-date-picker-day.isToday {
  font-weight: 700;
}
.vuestro-date-picker-day.isSelected {
  background-color: var(--vuestro-primary);
}
.vuestro-date-picker-day.isSelected >>> .vuestro-button-content {
  color: var(--vuestro-light);
}

</style>