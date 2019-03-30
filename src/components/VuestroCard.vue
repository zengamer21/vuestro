<template>
  <div class="vuestro-card" :class="[`width-${cols}`]">
    <!--SLOT FOR HEADER TEXT (only show if "heading" slot was provided)-->
    <div v-if="$slots.heading" class="vuestro-card-heading" :style="{ 'border-color': color }">
      <slot name="heading"></slot>
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
    color: { type: String },
  },
  methods: {
    resize() {
      this.$slots.default.resize && this.$slots.default.resize();
    }
  }
};

</script>

<style scoped>

.vuestro-card {
  display: flex;
  flex-direction: column;
}

.vuestro-card > .vuestro-card-heading {
  font-size: 22px;
  line-height: 22px;
  font-weight: 300;
  padding: 2px 8px;
  border-left: 4px solid var(--vuestro-text-color);
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