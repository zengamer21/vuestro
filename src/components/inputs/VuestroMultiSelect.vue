<template>
  <vuestro-tray class="vuestro-multi-select"
                :class="{ stretch }"
                :variant="variant"
                :style="style">
    <draggable v-model="contents"
               group="vuestro-multi-select"
               @add="onDragAdd">
      <div class="vuestro-multi-select-pill-container">
        <vuestro-pill v-for="(c, idx) in contents" :key="c" closable @close="removeVal(idx)">
          <template #value>{{ c }}</template>
        </vuestro-pill>
      </div>
      <input slot="footer" class="input-el"
             :placeholder="placeholder"
             :value="newVal"
             @keyup.enter="onManualAdd">
      </input>
    </draggable>
  </vuestro-tray>
</template>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'VuestroMultiSelect',
  components: {
    draggable,
  },
  props: {
    value: { type: Array, default: () => []},
    variant: { type: String, default: 'outline' },
    minHeight: { type: String, default: '25px' },
    placeholder: { type: String },
    stretch: { type: Boolean, default: false },
  },
  data() {
    return {
      contents: [],
      newVal: '',
    };
  },
  computed: {
    style() {
      return {
        'min-height': this.minHeight,
      };
    },
  },
  methods: {
    onManualAdd(e) {
      this.contents.push(e.target.value);
      this.$emit('add', e.target.value);
    },
    onDragAdd(e) {
      this.$emit('add', e.item.innerText);
    },
    removeVal(idx) {
      this.$emit('remove', this.contents[idx]);
      this.contents.splice(idx, 1);
    },
  },
};

</script>

<style scoped>

.vuestro-multi-select {
  flex-direction: column;
  display: flex;
}

.vuestro-multi-select.stretch {
  align-self: stretch;
  flex-grow: 1;
}

.vuestro-multi-select > div {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.vuestro-multi-select-pill-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.vuestro-multi-select-pill-container >>> span.sortable-ghost {
  border: 1px dashed var(--vuestro-outline);
}

.input-el {
  margin-left: 2px;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--vuestro-text-color);
  font-size: 0.6em;
}

</style>