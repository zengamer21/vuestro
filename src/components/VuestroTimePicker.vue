<template>
  <div class="vuestro-time-picker">
    <!--HOURS-->
    <div class="vuestro-time-picker-column">
      <div class="arrow" @click="increaseHours">
        <icon name="chevron-up"></icon>
      </div>
      <vuestro-editable-text :value="momentObj.format('HH')" 
                             :validator="validateHours" 
                             @input="setHours">
      </vuestro-editable-text>
      <div class="arrow" @click="decreaseHours">
        <icon name="chevron-down"></icon>
      </div>
    </div>
    
    <!--:-->
    <div class="vuestro-time-picker-colon">:</div>
    
    <!--MINUTES-->
    <div class="vuestro-time-picker-column">
      <div class="arrow" @click="increaseMinutes">
        <icon name="chevron-up"></icon>
      </div>
      <vuestro-editable-text :value="momentObj.format('mm')" 
                             :validator="validateMinutesSeconds" 
                             @input="setMinutes">
      </vuestro-editable-text>
      <div class="arrow" @click="decreaseMinutes">
        <icon name="chevron-down"></icon>
      </div>
    </div>
    
    <template v-if="seconds">
      <!--:-->
      <div class="vuestro-time-picker-colon">:</div>
      
      <!--SECONDS-->
      <div class="vuestro-time-picker-column">
        <div class="arrow" @click="increaseSeconds">
          <icon name="chevron-up"></icon>
        </div>
        <vuestro-editable-text :value="momentObj.format('ss')"
                               :validator="validateMinutesSeconds"
                               @input="setSeconds"></vuestro-editable-text>
        <div class="arrow" @click="decreaseSeconds">
          <icon name="chevron-down"></icon>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import moment from 'moment';

import 'vue-awesome/icons/chevron-up.js';
import 'vue-awesome/icons/chevron-down.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroTimePicker',
  components: {
    Icon,
  },
  props: {
    value: { type: Date, required: true },
    seconds: { type: Boolean, default: false },
  },
  computed: {
    momentObj() {
      return moment(this.value);
    }
  },
  methods: {
    onChange(newVal) {
      this.$emit('input', newVal);
    },
    increaseHours() {
      this.onChange(moment(this.value).add(1, 'hour').toDate());
    },
    decreaseHours() {
      this.onChange(moment(this.value).subtract(1, 'hour').toDate());
    },
    increaseMinutes() {
      this.onChange(moment(this.value).add(1, 'minute').toDate());
    },
    decreaseMinutes() {
      this.onChange(moment(this.value).subtract(1, 'minute').toDate());
    },
    increaseSeconds() {
      this.onChange(moment(this.value).add(1, 'seconds').toDate());
    },
    decreaseSeconds() {
      this.onChange(moment(this.value).subtract(1, 'seconds').toDate());
    },
    validateHours(d) {
      return !isNaN(parseInt(d, 10)) && (d >= 0 && d < 24);
    },
    validateMinutesSeconds(d) {
      return !isNaN(parseInt(d, 10)) && (d >= 0 && d < 59);
    },
    setHours(d) {
      this.onChange(moment(this.value).hour(d).toDate());
    },
    setMinutes(d) {
      this.onChange(moment(this.value).minute(d).toDate());
    },
    setSeconds(d) {
      this.onChange(moment(this.value).second(d).toDate());
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