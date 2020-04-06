<template>
  <div class="vuestro-panel"
       :class="[ gutter, { dark, stretch, noBorder, hasTitlebar }]"
       :style="color ? { 'background-color': color }:{}">
    <!--TOOLBAR-->
    <div v-if="hasTitlebar" class="vuestro-panel-title-toolbar">
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
    <div class="vuestro-panel-contents-wrapper" :class="[contentPadding, { isCollapsed, scroll, frame, overflowHidden }]">
      <template v-if="!deferContent">
        <div ref="contents" v-show="!isCollapsed" class="vuestro-panel-contents" @scroll="updateScroll">
          <slot></slot>
        </div>
      </template>
      <template v-else>
        <div ref="contents" v-if="!isCollapsed" class="vuestro-panel-contents" @scroll="updateScroll">
          <slot></slot>
        </div>
      </template>
      <div v-if="canScroll" class="vuestro-panel-scroll-arrow">
        <vuestro-icon name="arrow-down"></vuestro-icon>
      </div>
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
    collapsible: { type: Boolean, default: false },
    deferContent: { type: Boolean, default: false },   // defer loading/rendering of content until expanded
    collapsed: { type: Boolean, default: false },
    contentPadding: { type: String, default: '' },
    scroll: { type: Boolean, default: false },
    frame: { type: Boolean, default: false },
    noBorder: { type: Boolean, default: false },
    stretch: { type: Boolean, default: true },
    overflowHidden: { type: Boolean, default: false },
  },
  computed: {
    hasTitlebar() {
      return this.$slots.title || this.$slots.toolbar || this.collapsible;
    },
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
  created() {
    window.addEventListener('resize', this.updateScroll);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateScroll);
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

/* border only for dark ui, whether it's forced through a prop, or global */
.vuestro-panel.dark,
.vuestro-dark .vuestro-panel {
  background-color: var(--vuestro-panel-dark-bg);
  color: var(--vuestro-text-color-inverse);
  border: 1px solid var(--vuestro-outline);
}
.vuestro-panel.noBorder {
  box-shadow: none;
  border: none;
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
  background-color: var(--vuestro-panel-toolbar-bg);
}
.vuestro-panel-title {
  color: var(--vuestro-panel-toolbar-fg);
}
.vuestro-panel.dark .vuestro-panel-title {
  color: var(--vuestro-text-color-inverse);
}
.vuestro-panel-toolbar {
  display: flex;
  align-items: center;
  margin-left: auto;
  color: var(--vuestro-panel-toolbar-fg);
}

.vuestro-panel-contents-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
}
.vuestro-panel-contents {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.vuestro-panel-contents-wrapper.sm {
  margin: 2px;
}
.vuestro-panel-contents-wrapper.md {
  margin: 5px;
}
.vuestro-panel-contents-wrapper.lg {
  margin: 10px;
}
.vuestro-panel.hasTitlebar .vuestro-panel-contents-wrapper {
  margin-top: 0px;
}
.vuestro-panel-contents-wrapper.isCollapsed {
  margin: 0;
}
.vuestro-panel-contents-wrapper.scroll > .vuestro-panel-contents,
.vuestro-panel-contents-wrapper.frame > .vuestro-panel-contents {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.vuestro-panel-contents-wrapper.scroll > .vuestro-panel-contents {
  overflow: auto;
}
.vuestro-panel-contents-wrapper.overflowHidden > .vuestro-panel-contents {
  overflow: hidden;
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