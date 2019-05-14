<template>
  <div class="vuestro-panel"
       :class="[ gutter, { dark }]"
       :style="color ? { 'background-color': color }:{}">
    <!--TOOLBAR-->
    <div v-if="$slots.title || $slots.toolbar || collapsible" class="vuestro-panel-title-toolbar">
      <vuestro-caret v-if="collapsible"
                     size="sm"
                     :dark="dark"
                     left
                     :collapsed="collapsed"
                     @click="collapsed = !collapsed" >
      </vuestro-caret>
      <vuestro-title class="vuestro-panel-title">
        <slot name="title"></slot>
      </vuestro-title>
      <div v-if="$slots.toolbar" class="vuestro-panel-toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>
    <slot v-if="!collapsed"></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroPanel',
  props: {
    dark: { type: Boolean, default: false },
    gutter: { type: String, default: 'md' },
    color: { type: String, default: null },
    spinner: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
  },
  data() {
    return {
      collapsed: false,
    };
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-panel-toolbar-border: none;
}

</style>

<style scoped>

.vuestro-panel.lg {
  --gutter-size: 15px;
}
.vuestro-panel.md {
  --gutter-size: 4px;
}
.vuestro-panel.sm {
  --gutter-size: 2px;
}
.vuestro-panel.none {
  --gutter-size: 0px;
}

.vuestro-panel {
  background-color: var(--vuestro-panel-bg);
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  margin-top: var(--gutter-size);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* border only for dark ui */
.vuestro-panel.dark {
  background-color: var(--vuestro-panel-dark-bg);
  color: var(--vuestro-text-color-inverse);
  border: 1px solid var(--vuestro-outline);
}

.vuestro-panel .vuestro-tray:not(:last-child) {
  border-bottom: 1px solid var(--vuestro-outline);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.vuestro-panel-title-toolbar {
  padding: 4px 4px 4px 8px;
  display: flex;
  align-items: center;
  border-bottom: var(--vuestro-panel-toolbar-border);
}
.vuestro-panel-title {
  color: var(--vuestro-text-color);
}
.vuestro-panel.dark .vuestro-panel-title {
  color: var(--vuestro-text-color-inverse);
}
.vuestro-panel-toolbar {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 12px;
}

</style>