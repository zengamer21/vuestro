<template>
  <div class="vuestro-time-picker">
    <!--HOURS-->
    <div class="vuestro-time-picker-column">
      <div class="arrow" @click="increaseHours">
        <vuestro-icon name="chevron-up"></vuestro-icon>
      </div>
      <vuestro-editable-text :value="momentObj.format('HH')"
                             :validator="validateHours"
                             @input="setHours">
      </vuestro-editable-text>
      <div class="arrow" @click="decreaseHours">
        <vuestro-icon name="chevron-down"></vuestro-icon>
      </div>
    </div>

    <!--:-->
    <div class="vuestro-time-picker-colon">:</div>

    <!--MINUTES-->
    <div class="vuestro-time-picker-column">
      <div class="arrow" @click="increaseMinutes">
        <vuestro-icon name="chevron-up"></vuestro-icon>
      </div>
      <vuestro-editable-text :value="momentObj.format('mm')"
                             :validator="validateMinutesSeconds"
                             @input="setMinutes">
      </vuestro-editable-text>
      <div class="arrow" @click="decreaseMinutes">
        <vuestro-icon name="chevron-down"></vuestro-icon>
      </div>
    </div>

    <template v-if="seconds">
      <!--:-->
      <div class="vuestro-time-picker-colon">:</div>

      <!--SECONDS-->
      <div class="vuestro-time-picker-column">
        <div class="arrow" @click="increaseSeconds">
          <vuestro-icon name="chevron-up"></vuestro-icon>
        </div>
        <vuestro-editable-text :value="momentObj.format('ss')"
                               :validator="validateMinutesSeconds"
                               @input="setSeconds"></vuestro-editable-text>
        <div class="arrow" @click="decreaseSeconds">
          <vuestro-icon name="chevron-down"></vuestro-icon>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import moment from 'moment';

export default {
  name: 'VuestroTimePicker',
  props: {
    value: { type: Date, required: true },
    seconds: { type: Boolean, default: false },
    utc: { type: Boolean, default: false },
  },
  computed: {
    momentObj() {
      return this.utc ? moment.utc(this.value) : moment(this.value);
    }
  },
  methods: {
    onChange(newVal) {
      this.$emit('input', newVal);
    },
    increaseHours() {
      this.onChange(this.momentObj.add(1, 'hour').toDate());
    },
    decreaseHours() {
      this.onChange(this.momentObj.subtract(1, 'hour').toDate());
    },
    increaseMinutes() {
      this.onChange(this.momentObj.add(1, 'minute').toDate());
    },
    decreaseMinutes() {
      this.onChange(this.momentObj.subtract(1, 'minute').toDate());
    },
    increaseSeconds() {
      this.onChange(this.momentObj.add(1, 'seconds').toDate());
    },
    decreaseSeconds() {
      this.onChange(this.momentObj.subtract(1, 'seconds').toDate());
    },
    validateHours(d) {
      return !isNaN(parseInt(d, 10)) && (d >= 0 && d < 24);
    },
    validateMinutesSeconds(d) {
      return !isNaN(parseInt(d, 10)) && (d >= 0 && d < 59);
    },
    setHours(d) {
      this.onChange(this.momentObj.hour(d).toDate());
    },
    setMinutes(d) {
      this.onChange(this.momentObj.minute(d).toDate());
    },
    setSeconds(d) {
      this.onChange(this.momentObj.second(d).toDate());
    },
  },
};

</script>

<style scoped>

.vuestro-time-picker {
  display: flex;
}

.vuestro-time-picker-column {
  width: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
}

.vuestro-time-picker-colon {
  font-size: 32px;
  align-self: center;
  margin: 0 2px 4px 2px;
  pointer-events: none;
}

.arrow {
  cursor: pointer;
}

</style>