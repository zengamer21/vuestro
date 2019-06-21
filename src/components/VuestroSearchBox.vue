<template>
  <div class="vuestro-search-box">
    <!--HISTORY-->
    <div v-if="history" class="history-dropdown">
      <vuestro-dropdown left rounded no-spacing>
        <template #title>
          <icon name="search"></icon>
          <icon class="down-caret" name="caret-down"></icon>
        </template>
        <div v-if="historyArray.length === 0">No Search History</div>
        <vuestro-list-button v-for="h in historyArray" :key="h" @click="loadFromHistory(h)">
          {{ h }}
        </vuestro-list-button>
        <template #buttons v-if="historyArray.length > 0">
          <span class="clear-history" @click="historyArray = []">Clear History</span>
        </template>
      </vuestro-dropdown>
    </div>
    <!--INPUT-->
    <div class="input-el-wrapper">
      <input class="input-el" ref="editBox" :placeholder="placeholder" :value="value" @input="updateValue" @keyup.enter="onChange" @keyup="onKeyUp"></input>
    </div>
    <!--CLEAR-->
    <span class="clear-button" @click="clearValue()">
      <icon name="times"></icon>
    </span>
  </div>
</template>

<script>

/* global _ */
import VuestroDropdown from './VuestroDropdown.vue';
import VuestroListButton from './list/VuestroListButton.vue';

import 'vue-awesome/icons/search.js';
import 'vue-awesome/icons/caret-down.js';
import 'vue-awesome/icons/times.js';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroSearchBox',
  components: {
    VuestroDropdown,
    VuestroListButton,
    Icon,
  },
  props: {
    placeholder: { type: String, default: null },
    value: { type: String, default: '' },
    history: { type: Boolean, default: false },
    historyLimit: { type: Number, default: 10 },
  },
  data() {
    return {
      historyArray: [],
    };
  },
  methods: {
    focus() { // proxy the focus() call
      this.$nextTick(() => {
        this.$refs.editBox.focus();
      });
    },
    updateValue() {
      // fine-grained, called with every keystroke so parent
      // can update value prop according to v-model convention
      this.$emit('input', this.$refs.editBox.value);
    },
    clearValue() {
      if (this.value.length > 0) {
        this.addOrMoveToFront(this.value);
      }
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear', '');
    },
    onChange(e) {
      if (e.target.value.length > 0) {
        this.addOrMoveToFront(e.target.value);
      }
      this.$emit('change', e.target.value);
    },
    addOrMoveToFront(h) {
      this.historyArray.unshift(h);
      this.historyArray = _.uniq(this.historyArray);
    },
    loadFromHistory(h) {
      this.addOrMoveToFront(h);
      this.$emit('input', h);
      this.$emit('change', h);
    },
    onKeyUp(e) { // passthrough for 'keyup.enter'-type binding
      this.$emit('keyup', e);
    }
  }
};

</script>

<style scoped>

.vuestro-search-box {
  background-color: var(--vuestro-field-bg);
  color: var(--vuestro-text-color);
  border-radius: 20px;
  margin: 5px;
  padding: 4px 8px 4px 8px;
  overflow: visible !important; /* so dropdown menu will show */
  z-index: 100;
  display: flex;
  flex: 1 1 auto;
}

.vuestro-search-box .history-dropdown {
  display: flex;
}
.vuestro-search-box .history-dropdown >>> .drop-down-title {
  padding: 0;
}

.input-el-wrapper {
  flex: 1 1 auto;
  overflow: hidden;
  margin-left: 2px;
  display: flex;
  align-items: center;
}

.input-el {
  width: 100%;
  background-color: transparent;
  font-size: 13px;
  border: none;
  outline: none;
  color: var(--vuestro-text-color);
}

.input-el::placeholder {
  color: var(--vuestro-text-color);
  opacity: 0.5;
}

.clickable {
  line-height: 0;
  opacity: 0.5;
}

.fa-icon {
  height: 10px;
}

.down-caret {
  margin-left: -5px;
}

.clear-button {
  cursor: pointer;
  align-self: center;
}

</style>