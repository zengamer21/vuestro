<template>
  <div class="vuestro-panel"
       :class="[ gutter, { dark, stretch, scroll }]"
       :style="color ? { 'background-color': color }:{}">
    <!--TOOLBAR-->
    <div v-if="$slots.title || $slots.toolbar || collapsible" class="vuestro-panel-title-toolbar">
      <vuestro-caret v-if="collapsible"
                     :collapsed="isCollapsed"
                     @click="toggleCollapse">
      </vuestro-caret>
      <vuestro-title class="vuestro-panel-title"
                     :spinner="spinner"
                     :clickable="collapsible"
                     @click="toggleCollapse">
        <slot name="title"></slot>
      </vuestro-title>
      <div v-if="$slots.toolbar" class="vuestro-panel-toolbar">
        <slot name="toolbar"></slot>
      </div>
    </div>
    <div ref="contents" v-show="!isCollapsed" class="vuestro-panel-contents" :class="[contentPadding]" @scroll="updateScroll">
      <slot></slot>
    </div>
    <div v-if="canScroll" class="vuestro-panel-scroll-arrow">
      <vuestro-icon name="arrow-down"></vuestro-icon>
    </div>
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
    stretch: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: false },
    collapsed: { type: Boolean, default: false },
    contentPadding: { type: String, default: '' },
    scroll: { type: Boolean, default: false },
  },
  data() {
    return {
      isCollapsed: this.collapsed,
      canScroll: false,
    };
  },
  watch: {
    collapsed(newVal) {
      this.isCollapsed = newVal;
    },
  },
  updated() {
    this.updateScroll();
  },
  methods: {
    updateScroll() {
      this.canScroll = this.scroll && this.$refs.contents && (this.$refs.contents.scrollHeight - this.$refs.contents.scrollTop > this.$refs.contents.clientHeight);
    },
    toggleCollapse() {
      if (this.collapsible) {
        this.isCollapsed = !this.isCollapsed;
        this.$emit('toggle');
      }
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-panel-toolbar-bg: inherit;
  --vuestro-panel-toolbar-fg: inherit;
  --vuestro-panel-toolbar-border: none;
}

</style>

<style scoped>

.vuestro-panel.lg {
  --gutter-size: 30px;
}
.vuestro-panel.md {
  --gutter-size: 16px;
}
.vuestro-panel.sm {
  --gutter-size: 8px;
}
.vuestro-panel.none {
  --gutter-size: 0px;
}

.vuestro-panel {
  background-color: var(--vuestro-panel-bg);
  border-radius: 2px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
}
.vuestro-panel.stretch {
  flex-grow: 1;
}
.vuestro-panel:not(:first-child) {
  margin-top: var(--gutter-size);
}
.vuestro-panel.scroll {
  overflow: hidden;
}

/* border only for dark ui, whether it's forced through a prop, or global */
.vuestro-panel.dark,
.vuestro-dark .vuestro-panel {
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
  min-height: 30px;
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
  background-color: var(--vuestro-panel-toolbar-bg);
  color: var(--vuestro-panel-toolbar-fg);
}

.vuestro-panel-contents {
  display: flex;
  flex-direction: column;
}
.vuestro-panel.stretch > .vuestro-panel-contents {
  flex-grow: 1;
}
.vuestro-panel.scroll > .vuestro-panel-contents {
  overflow: auto;
}
.vuestro-panel-contents.sm {
  padding: 2px;
}
.vuestro-panel-contents.md {
  padding: 5px;
}
.vuestro-panel-contents.lg {
  padding: 10px;
}
/* reset top padding when toolbar is present */
.vuestro-panel-contents:not(:only-child) {
  padding-top: 0;
}

.vuestro-panel-scroll-arrow {
  color: var(--vuestro-text-color-muted);
  position: absolute;
  right: 8px;
  bottom: 6px;
}

</style>