<template>
  <div class="vuestro-card" :class="[`width-${cols}`]">
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
}

.vuestro-card-heading {
  font-size: 22px;
  line-height: 22px;
  padding: 2px 8px 2px 0px;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  cursor: default;
}

.vuestro-card-subheading {
  font-size: 20px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  cursor: default;
}

.vuestro-card-description {
  font-size: 18px;
  padding: 4px 10px 10px 0px;
  display: flex;
  justify-content: space-between;
  cursor: default;
}

.vuestro-card.width-1 {
  flex: 0 0 8.33%;
  max-width: 16.67%;
}
.vuestro-card.width-2 {
  flex: 0 0 16.67%;
  max-width: 16.67%;
}
.vuestro-card.width-3 {
  flex: 0 0 25%;
  max-width: 25%;
}
.vuestro-card.width-4 {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}
.vuestro-card.width-5 {
  flex: 0 0 41.67%;
  max-width: 41.67%;
}
.vuestro-card.width-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
.vuestro-card.width-7 {
  flex: 0 0 58.33%;
  max-width: 58.33%;
}
.vuestro-card.width-8 {
  flex: 0 0 66.67%;
  max-width: 66.67%;
}
.vuestro-card.width-9 {
  flex: 0 0 75%;
  max-width: 75%;
}
.vuestro-card.width-10 {
  flex: 0 0 83.33%;
  max-width: 83.33%;
}
.vuestro-card.width-11 {
  flex: 0 0 91.67%;
  max-width: 91.67%;
}
.vuestro-card.width-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

</style>