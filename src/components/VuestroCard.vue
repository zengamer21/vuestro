<template>
  <div class="vuestro-card" :class="[`basis-${cols}`, { overflowHidden, stretch, row }]">
    <!--SLOT FOR HEADER TEXT (only show if "heading" slot was provided)-->
    <div v-if="$slots.heading"
         class="vuestro-card-heading"
         :style="colorBarStyle">
      <slot name="heading"></slot>
    </div>
    <div v-if="$slots.subheading"
         class="vuestro-card-subheading">
      <slot name="subheading"></slot>
    </div>
    <!--SLOT FOR DESCRIPTION (only show if "description" slot was provided)-->
    <div v-if="$slots.description"
         class="vuestro-card-description">
      <slot name="description"></slot>
    </div>
    <!--DEFAULT SLOT-->
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroCard',
  props: {
    cols: { default: 12 },
    color: { type: String, default: null },
    overflowHidden: { type: Boolean, default: null },
    stretch: { type: Boolean, default: false },
    row: { type: Boolean, default: false },
  },
  computed: {
    colorBarStyle() {
      let borderWidth = '2px';
      if (this.$root.mobile) {
        borderWidth = '4px';
      }
      if (this.color) {
        return {
          'border-left': `${borderWidth} solid ${this.color}`,
          'padding-left': this.$root.mobile ? '14px':'6px',
        };
      }
    },
  },
  methods: {
    resize() {
      this.$slots.default.resize && this.$slots.default.resize();
    },
  },
};

</script>

<style>
.vuestro-app {
  --vuestro-card-heading-font-size: 1.6em;
  --vuestro-card-heading-font-weight: 300;
  --vuestro-card-subheading-font-size: 1.4em;
  --vuestro-card-subheading-font-weight: 300;
  --vuestro-card-description-font-size: 1.1em;
  --vuestro-card-description-font-weight: 300;
}
</style>

<style scoped>

.vuestro-card {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  padding: var(--vuestro-gutter); /* inherit from vuestro-container */
}
.vuestro-card.stretch {
  flex-grow: 1;
}
.vuestro-card.row {
  flex-direction: row;
}
.vuestro-card.overflowHidden {
  overflow: hidden;
}

.vuestro-card-heading {
  font-size: var(--vuestro-card-heading-font-size);
  font-weight: var(--vuestro-card-heading-font-weight);
  padding: 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-subheading {
  font-size: var(--vuestro-card-subheading-font-size);
  font-weight: var(--vuestro-card-subheading-font-weight);
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-description {
  font-size: var(--vuestro-card-description-font-size);
  font-weight: var(--vuestro-card-description-font-weight);
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card.basis-0 {
  flex-basis: auto;
}
.vuestro-card.basis-1 {
  flex-basis: 8.33%;
}
.vuestro-card.basis-2 {
  flex-basis: 16.67%;
}
.vuestro-card.basis-3 {
  flex-basis: 25%;
}
.vuestro-card.basis-4 {
  flex-basis: 33.33%;
}
.vuestro-card.basis-5 {
  flex-basis: 41.67%;
}
.vuestro-card.basis-6 {
  flex-basis: 50%;
}
.vuestro-card.basis-7 {
  flex-basis: 58.33%;
}
.vuestro-card.basis-8 {
  flex-basis: 66.67%;
}
.vuestro-card.basis-9 {
  flex-basis: 75%;
}
.vuestro-card.basis-10 {
  flex-basis: 83.33%;
}
.vuestro-card.basis-11 {
  flex-basis: 91.67%;
}
.vuestro-card.basis-12 {
  flex-basis: 100%;
}


</style>