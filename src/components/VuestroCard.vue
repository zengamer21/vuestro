<template>
  <div class="vuestro-card" :class="[`basis-${cols}`, { overflowHidden, stretch }]">
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
  },
  computed: {
    colorBarStyle() {
      if (this.color) {
        return {
          'border-left': `4px solid ${this.color}`,
          'padding-left': '8px',
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

<style scoped>

.vuestro-card {
  display: flex;
  flex-direction: column;
  padding: var(--vuestro-gutter); /* inherit from vuestro-container */
}

.vuestro-card.overflowHidden {
  overflow: hidden;
}

.vuestro-card-heading {
  font-size: 22px;
  padding: 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-subheading {
  font-size: 20px;
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card-description {
  font-size: 18px;
  padding: 2px 0px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.vuestro-card.basis-1 {
  flex: 0 0 8.33%;
}
.vuestro-card.basis-2 {
  flex: 0 0 16.67%;
}
.vuestro-card.basis-3 {
  flex: 0 0 25%;
}
.vuestro-card.basis-4 {
  flex: 0 0 33.33%;
}
.vuestro-card.basis-5 {
  flex: 0 0 41.67%;
}
.vuestro-card.basis-6 {
  flex: 0 0 50%;
}
.vuestro-card.basis-7 {
  flex: 0 0 58.33%;
}
.vuestro-card.basis-8 {
  flex: 0 0 66.67%;
}
.vuestro-card.basis-9 {
  flex: 0 0 75%;
}
.vuestro-card.basis-10 {
  flex: 0 0 83.33%;
}
.vuestro-card.basis-11 {
  flex: 0 0 91.67%;
}
.vuestro-card.basis-12 {
  flex: 0 0 100%;
}

.vuestro-card.stretch {
  flex-grow: 1;
}

</style>