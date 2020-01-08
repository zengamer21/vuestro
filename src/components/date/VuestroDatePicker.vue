<template>
  <div class="vuestro-date-picker">
    <template v-for="m in monthOffsets">
      <div class="vuestro-date-picker-month">
        <div class="vuestro-date-picker-month-header">
          <vuestro-button class="month-back" v-if="m == monthOffsets[0]" round no-border @click="backMonth">
            <vuestro-icon name="angle-left"></vuestro-icon>
          </vuestro-button>
          <div class="month-name">{{ getMonthName(m) }}</div>
          <vuestro-button class="month-forward" v-if="m == monthOffsets[monthOffsets.length - 1]" round no-border @click="forwardMonth">
            <vuestro-icon name="angle-right"></vuestro-icon>
          </vuestro-button>
        </div>
        <div class="vuestro-date-picker-month-body">
          <table>
            <thead>
              <th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th>
            </thead>
            <tbody>
              <tr v-for="w in 6">
                <td v-for="d in 7">
                  <vuestro-date-picker-day :date="getDate(m, w, d)"
                                           :value="value"
                                           @click="onClickDay">
                  </vuestro-date-picker-day>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import moment from 'moment';
import VuestroDatePickerDay from './VuestroDatePickerDay';

export default {
  name: 'VuestroDatePicker',
  components: {
    VuestroDatePickerDay,
  },
  props: {
    value: { type: Array, required: true },
    range: { type: Boolean, default: false },
    utc: { type: Boolean, default: false },
  },
  data() {
    return {
      displayedMoment: moment().startOf('month'),
      dayRangeStart: null,
      dayRangeEnd: null,
      dayRangeState: 0, // 0=start date, 1=end date
    };
  },
  computed: {
    monthOffsets() {
      if (this.range) {
        return [-1, 0, 1];
      }
      return [0];
    }
  },
  mounted() {
    this.updateDisplay();
  },
  methods: {
    updateDisplay() {
      if (this.value && this.value.length > 0) {
        this.displayedMoment = moment(this.value[this.value.length - 1]).startOf('month');
      } else {
        // use now
        this.displayedMoment = moment().startOf('month');
      }
      if (this.utc) {
        this.displayedMoment.utc();
      }
    },
    getMonth(offset) {
      return moment(this.displayedMoment).add(offset, 'months');
    },
    getMonthName(offset) {
      return this.getMonth(offset).format('MMMM YYYY');
    },
    getDate(n, w, d) {
      let m = this.getMonth(n);
      let startDay = m.startOf('month').day();
      let maxDay = m.daysInMonth();
      if (w === 1 && d > startDay) {
        return m.add(d - startDay - 1, 'days');
      } else {
        let dayNum = (d - startDay - 1) + (w-1)*7;
        if (dayNum > 0 && dayNum < maxDay) {
          return m.add(dayNum, 'days');
        }
      }
      return null;
    },
    onClickDay(d) {
      if (this.range == false) {
        this.$emit('input', [d]);
      } else {
        if (this.dayRangeState == 0) {
          this.$emit('input', [d, d]);
          this.dayRangeState = 1;
        } else {
          if (moment(d).isSameOrAfter(this.value[0])) {
            this.$emit('input', [this.value[0], d]);
          } else {
            this.$emit('input', [d, this.value[0]]);
          }
          this.dayRangeState = 0;
        }
      }
    },
    backMonth() {
      this.displayedMoment.subtract(1, 'month');
      this.$forceUpdate();
    },
    forwardMonth() {
      this.displayedMoment.add(1, 'month');
      this.$forceUpdate();
    },
  }
};

</script>

<style scoped>

.vuestro-date-picker {
  display: flex;
  margin: 5px;
}

.vuestro-date-picker-month {
}
.vuestro-date-picker-month:not(:first-child) {
  margin-left: 10px;
}
.vuestro-date-picker-month-header > .month-name {
  font-weight: 500
}
.vuestro-date-picker-month-header {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 2px;
}
.vuestro-date-picker-month-header > .month-back {
  position: absolute;
  left: 0;
}
.vuestro-date-picker-month-header > .month-forward {
  position: absolute;
  right: 0;
}
.vuestro-date-picker-month-body > table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}
.vuestro-date-picker-month-body td {
  padding: 0;
}

</style>