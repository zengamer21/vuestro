<template>
  <div class="vuestro-tray"
       :class="[`vuestro-tray-${variant}`, size, { noBorder }]">
    <div v-if="$slots.title" class="vuestro-tray-title flex-align-self-center">
      <slot name="title"></slot>
    </div>
    <vuestro-title v-else-if="title" class="vuestro-tray-title flex-align-self-center">{{ title }}</vuestro-title>
    <slot></slot>
  </div>
</template>

<script>


export default {
  name: 'VuestroTray',
  props: {
    title: { type: String, required: false },
    noBorder: { type: Boolean, default: false },
    variant: { type: String, default: 'regular' },
    size: { type: String, default: 'md' },
  },
};

</script>

<style scoped>

.vuestro-tray {
  display: flex;
  position: relative;
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
}
.vuestro-tray.sm {
  min-height: var(--vuestro-control-sm-height);
}
.vuestro-tray.md {
  min-height: var(--vuestro-control-md-height);
}
.vuestro-tray.lg {
  min-height: var(--vuestro-control-lg-height);
}
.vuestro-tray.xl {
  min-height: var(--vuestro-control-xl-height);
}

.vuestro-tray-outline {
  border-radius: var(--vuestro-rounded-border-radius);
  border: var(--vuestro-rounded-border-width) solid var(--vuestro-outline);
}
.vuestro-tray-regular {
  border-bottom: var(--vuestro-rounded-border-width) solid var(--vuestro-outline);
}

.vuestro-tray-shaded {
  border: none;
  background-color: var(--vuestro-light-med);
}
.vuestro-tray-shaded.dark {
  background-color: var(--vuestro-darker);
}

.vuestro-tray-title {
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: 500;
  margin-left: 0.4em;
  margin-right: 0.5em;
  align-self: center;
}

</style>