<template>
  <div class="vuestro-grid">
    <slot name="header"></slot>
    <div ref="grid" class="vuestro-grid-inner" :style="style">
      <vuestro-grid-box v-for="item in localLayout"
                        :key="item.id"
                        :boxId="item.id"
                        :locked="lock">
        <slot :item="item"></slot>
      </vuestro-grid-box>
      <vuestro-grid-box class="vuestro-grid-placeholder" boxId="::placeholder::"></vuestro-grid-box>
      <!--default slot for any extras-->
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>

/* global localStorage */
import VuestroGridBox from './VuestroGridBox.vue';

export default {
  name: 'VuestroGrid',
  components: {
    VuestroGridBox
  },
  props: {
    layout: { type: Array },
    margin: { type: Number, default: 14 },   // margin/gutter
    cellSize: { type: Object, default() { return { w: 100, h: 100 }; }}, // default cell size
    defaultSize: { type: Object, default() { return { w: 2, h: 2 }; }},  // default grid box size
    lock: { type: Boolean, default: false }, // lock everything in place
    localStorageKey: { type: String, default: null }, // if set, enable local storage for layout using provided key
  },
  beforeUpdate() {
    this.cellSize.w = ((this.$refs.grid.clientWidth - this.margin) / this.columns) - this.margin;
  },
  created() {
    window.addEventListener('resize', this.resize);
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  watch: {
    layout(newLayout) {
      this.localLayout = newLayout;
      this.refresh();
    },
    '$route'() {
      this.$nextTick(() => {
        this.resize();
      });
    },
  },
  data() {
    return {
      columns: 12, // default, will be changed to adapt to mobile
      localLayout: [],
      isDragging: false,
      isResizing: false,
      placeholder: {
        hidden: true,
        position: {
            x: 0,
            y: 0,
            w: 1,
            h: 1
        }
      },
      dragging: {
        boxLayout: null,
        offset: {
            x: 0,
            y: 0
        }
      },
      resizing: {
        boxLayout: null,
        offset: {
            x: 0,
            y: 0
        }
      },
      isMounted: false
    };
  },
  computed: {
    style() {
      var layoutSize = this.getLayoutSize(this.localLayout);
      return {
        minHeight: ((layoutSize.h * this.cellSize.h) + ((layoutSize.h - 1) * this.margin) + 2*this.margin) + 'px'
      };
    }
  },
  mounted() {
    if (this.localStorageKey) {
      this.localLayout = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (!this.localLayout || this.localLayout && this.localLayout.length === 0) {
        this.localLayout = this.layout;
      }
    } else {
      this.localLayout = this.layout;
    }

    this.isMounted = true;
    this.calculateCellSizeWidth();
    let boxIds = this.$children.map(box => box.$props.boxId);
    this.createBoxLayout(...boxIds);
  },
  methods: {
    refresh() {
      let boxIds = this.$children.map(box => box.$props.boxId);
      this.createBoxLayout(...boxIds);
      if (this.layoutHasCollisions(this.localLayout)) {
        this.updateLayout(this.fixLayout(this.localLayout));
      }
    },
    resize() {
      this.calculateCellSizeWidth();
      this.fixLayout(this.localLayout);
    },
    calculateCellSizeWidth() {
      if (this.$root.mobile) {
        this.cellSize.w = ((this.$refs.grid.clientWidth - this.margin) / (this.columns / 2)) - this.margin;
        let propHeight = this.$refs.grid.clientHeight / 8;
        if (propHeight > this.cellSize.h) {
          this.cellSize.h = propHeight;
        }
      } else {
        this.cellSize.w = ((this.$refs.grid.clientWidth - this.margin) / this.columns) - this.margin;
      }
    },
    getBoxLayoutById(id) {
      if (id === '::placeholder::') {
        return this.placeholder;
      }
      for (let l of this.localLayout) {
        if (l.id === id) {
          return l;
        }
      }
      return null;
    },
    getPixelPositionById(id) {
      if (this.dragging.boxLayout && this.dragging.boxLayout.id === id) {
        let pixels = this.positionToPixels(this.dragging.boxLayout.position, this.cellSize, this.margin);
        pixels.x += this.dragging.offset.x;
        pixels.y += this.dragging.offset.y;
        return pixels;
      }

      if (this.resizing.boxLayout && this.resizing.boxLayout.id === id) {
        let pixels = this.positionToPixels(this.resizing.boxLayout.position, this.cellSize, this.margin);
        pixels.w += this.resizing.offset.x;
        pixels.h += this.resizing.offset.y;
        return pixels;
      }

      var boxLayout = this.getBoxLayoutById(id);
      return this.positionToPixels(boxLayout.position, this.cellSize, this.margin);
    },
    isBoxVisible(id) {
      var boxLayout = this.getBoxLayoutById(id);
      return boxLayout && boxLayout.position && !boxLayout.hidden && this.isMounted;
    },
    arePositionsColliding(positionA, positionB) {
      if (positionA && positionB) {
        return positionA.x < (positionB.x +  positionB.w) &&
              (positionA.x +  positionA.w) > positionB.x &&
               positionA.y < (positionB.y +  positionB.h) &&
              (positionA.y +  positionA.h) > positionB.y;
      } else {
        return false;
      }
    },
    isFree(layout, position) {
      for (let i = 0; i < layout.length; i++) {
        if (this.arePositionsColliding(layout[i].position, position)) {
          return false;
        }
      }
      return true;
    },
    // moves the box to the upmost free position
    bubbleUp(layout, position) {
      do {
        position = {
          ...position,
          y: position.y - 1
        };
      } while (this.isFree(layout, position) && position.y >= 0);

      return {
        ...position,
        y: position.y + 1
      };
    },
    // updates box position to a free place in a given layout
    moveBoxToFreePlace(layout, position) {
      position = this.bubbleUp(layout, position);
      while (!this.isFree(layout, position)) {
        position = {
          ...position,
          y: position.y + 1
        };
      }
      return position;
    },
    // sort layout based on position and visibility
    sortLayout(layout) {
      return [ ...layout ].sort((a, b) => {
        if (a.hidden && !b.hidden) {
          return 1;
        }
        if (!a.hidden && b.hidden) {
          return -1;
        }
        if (a.position.y < b.position.y) {
          return -1;
        }
        if (a.position.y > b.position.y) {
          return 1;
        }
        if (a.position.x < b.position.x) {
          return -1;
        }
        if (a.position.x > b.position.x) {
          return 1;
        }
        return 0;
      });
    },
    // moves all boxes to the upmost free position
    layoutBubbleUp(layout) {
      layout = this.sortLayout(layout);

      for (let l of layout) {
        l.position = this.bubbleUp(layout, l.position);
      }
      return layout;
    },
    // get box position in pixels
    positionToPixels(position, cellSize, margin = 0) {
      return {
        x: (position.x * cellSize.w) + ((position.x) * margin) + margin,
        y: (position.y * cellSize.h) + ((position.y) * margin) + margin,
        w: (position.w * cellSize.w) + ((position.w - 1) * margin),
        h: (position.h * cellSize.h) + ((position.h - 1) * margin)
      };
    },
    // get layout bounding box
    getLayoutSize(layout) {
      return {
        w: layout.reduce((width, boxLayout) => {
          return boxLayout.hidden || !boxLayout.position
              ? width
              : Math.max(width, boxLayout.position.x + boxLayout.position.w);
        }, 0),
        h: layout.reduce((height, boxLayout) => {
          return boxLayout.hidden || !boxLayout.position
              ? height
              : Math.max(height, boxLayout.position.y + boxLayout.position.h);
        }, 0)
      };
    },
    // check if layout has collisions
    layoutHasCollisions(layout) {
      for (let i = 0; i < layout.length; i++) {
        for (let j = i + 1; j < layout.length; j++) {
          if (this.arePositionsColliding(layout[i].position, layout[j].position)) {
            return true;
          }
        }
      }
      return false;
    },
    // fix layout with collisions
    fixLayout(layout) {
      layout = this.sortLayout(layout);
      let fixedLayout = [];
      layout.forEach(boxLayout => {
        boxLayout.position = this.moveBoxToFreePlace(fixedLayout, boxLayout.position);
        fixedLayout.push(boxLayout);
      });
      return fixedLayout;
    },
    getPositionByPixel(x, y) {
      return {
        x: Math.round(x / (this.cellSize.w + this.margin)),
        y: Math.round(y / (this.cellSize.h + this.margin))
      };
    },
    updateLayout(layout) {
      // save layout to local storage if a key was provided
      if (this.localStorageKey) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(layout));
      }
      this.localLayout = layout;
      this.$emit('update:layout', layout);
    },
    doneMove() {
      this.$emit('move');
    },
    doneResize() {
      this.$emit('resize');
    },
    registerBox(box) {
      this.enableResizing(box);
      this.enableDragging(box);
      if (this.isMounted) {
        this.createBoxLayout(box.$props.boxId);
        this.updateLayout(this.fixLayout(this.localLayout));
      }
    },
    enableDragging(box) {
      var initialLayout;

      let validateTargetPosition = (targetX, targetY) => {
        if (targetX + this.dragging.boxLayout.position.w > this.maxColumnCount) {
          targetX = this.maxColumnCount - this.dragging.boxLayout.position.w;
        } else {
          if (targetX < 0) {
            targetX = 0;
          }
        }

        if (targetY < 0) {
          targetY = 0;
        }

        return {
          targetX,
          targetY
        };
      };

      box.$on('dragStart', evt => {
        var boxLayout = this.getBoxLayoutById(box.boxId);
        this.isDragging = true;

        // find box
        this.dragging.boxLayout = boxLayout;
        this.placeholder = {
          ...this.dragging.boxLayout
        };

        // clone layout
        initialLayout = this.sortLayout(this.localLayout);
      });

      box.$on('dragUpdate', evt => {
        if (!this.isDragging) {
          return;
        }
        this.dragging.offset.x = evt.offset.x;
        this.dragging.offset.y = evt.offset.y;

        var moveBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        if (!this.isFree({
          ...this.dragging.boxLayout.position,
          x: this.dragging.boxLayout.position.x + moveBy.x,
          y: this.dragging.boxLayout.position.y + moveBy.y
        })) {
          return;
        }

        let { targetX, targetY } = validateTargetPosition(
          this.dragging.boxLayout.position.x + moveBy.x,
          this.dragging.boxLayout.position.y + moveBy.y
        );

        // check if box has moved
        if (this.placeholder.position.x === targetX && this.placeholder.position.y === targetY) {
          return;
        }
        this.placeholder.position = {
          ...this.placeholder.position,
          x: targetX,
          y: targetY
        };

        var newLayout = [ this.placeholder ];
        initialLayout.forEach((boxLayout) => {
          if (boxLayout.id === this.dragging.boxLayout.id) {
            return;
          }
          newLayout.push({
            ...boxLayout,
            position: this.moveBoxToFreePlace(newLayout, boxLayout.position)
          });
        });

        this.layoutBubbleUp(newLayout);
        this.placeholder = newLayout.find((boxLayout) => {
          return boxLayout.id === this.dragging.boxLayout.id;
        });
        this.updateLayout(newLayout);
      });

      box.$on('dragEnd', evt => {
        if (!this.isDragging) {
          return;
        }
        var moveBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        if (this.isFree({
          ...this.dragging.boxLayout.position,
          x: this.dragging.boxLayout.position.x + moveBy.x,
          y: this.dragging.boxLayout.position.y + moveBy.y })) {
          let { targetX, targetY } = validateTargetPosition(
            this.dragging.boxLayout.position.x + moveBy.x,
            this.dragging.boxLayout.position.y + moveBy.y
          );

          this.placeholder.position = {
            ...this.placeholder.position,
            x: targetX,
            y: targetY
          };
        }

        this.dragging.boxLayout.position = {
          ...this.dragging.boxLayout.position,
          x: this.placeholder.position.x,
          y: this.placeholder.position.y
        };

        var newLayout = [ this.dragging.boxLayout ];
        initialLayout.forEach((boxLayout) => {
          if (boxLayout.id === this.dragging.boxLayout.id) {
            return;
          }
          newLayout.push({
            ...boxLayout,
            position: this.moveBoxToFreePlace(newLayout, boxLayout.position)
          });
        });

        this.updateLayout(this.layoutBubbleUp(newLayout));

        this.dragging.boxLayout = null;
        this.dragging.offset.x = 0;
        this.dragging.offset.y = 0;

        this.placeholder.hidden = true;
        this.isDragging = false;
        this.doneMove();
      });
    },
    enableResizing(box) {
      var initialLayout;

      let validateTargetSize = (targetW, targetH) => {
        if (this.resizing.boxLayout.position.x + targetW > this.maxColumnCount) {
          targetW = this.maxColumnCount - this.resizing.boxLayout.position.x;
        } else {
          if (targetW < 1) {
            targetW = 1;
          }
        }

        if (targetH < 1) {
          targetH = 1;
        }

        return {
          targetW,
          targetH
        };
      };

      box.$on('resizeStart', evt => {
        var boxLayout = this.getBoxLayoutById(box.boxId);
        this.isResizing = true;

        // find box
        this.resizing.boxLayout = boxLayout;
        this.placeholder = {
          ...this.resizing.boxLayout
        };

        // clone layout
        initialLayout = this.sortLayout(this.localLayout);
      });

      box.$on('resizeUpdate', evt => {
        if (!this.isResizing) {
          return;
        }
        this.resizing.offset.x = evt.offset.x;
        this.resizing.offset.y = evt.offset.y;

        var resizeBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        if (!this.isFree({
          ...this.resizing.boxLayout.position,
          w: this.resizing.boxLayout.position.w + resizeBy.x,
          h: this.resizing.boxLayout.position.h + resizeBy.y
        })) {
          return;
        }

        let { targetW, targetH } = validateTargetSize(
          this.resizing.boxLayout.position.w + resizeBy.x,
          this.resizing.boxLayout.position.h + resizeBy.y
        );

        // check if box size has changed
        if (this.placeholder.position.w === targetW && this.placeholder.position.h === targetH) {
          return;
        }
        this.placeholder.position = {
          ...this.placeholder.position,
          w: targetW,
          h: targetH
        };

        var newLayout = [ this.placeholder ];
        initialLayout.forEach((boxLayout) => {
          if (boxLayout.id === this.resizing.boxLayout.id) {
            return;
          }
          newLayout.push({
            ...boxLayout,
            position: this.moveBoxToFreePlace(newLayout, boxLayout.position)
          });
        });

        this.layoutBubbleUp(newLayout);
        this.placeholder = newLayout.find((boxLayout) => {
          return boxLayout.id === this.resizing.boxLayout.id;
        });
        this.updateLayout(newLayout);
      });

      box.$on('resizeEnd', evt => {
        if (!this.isResizing) {
          return;
        }
        var resizeBy = this.getPositionByPixel(evt.offset.x, evt.offset.y);
        if (this.isFree({
          ...this.resizing.boxLayout.position,
          w: this.resizing.boxLayout.position.w + resizeBy.x,
          h: this.resizing.boxLayout.position.h + resizeBy.y
        })) {
          let { targetW, targetH } = validateTargetSize(
            this.resizing.boxLayout.position.w + resizeBy.x,
            this.resizing.boxLayout.position.h + resizeBy.y
          );

          this.placeholder.position = {
            ...this.placeholder.position,
            w: targetW,
            h: targetH
          };
        }

        this.resizing.boxLayout.position = {
          ...this.resizing.boxLayout.position,
          w: this.placeholder.position.w,
          h: this.placeholder.position.h
        };

        var newLayout = [ this.resizing.boxLayout ];
        initialLayout.forEach((boxLayout) => {
          if (boxLayout.id === this.resizing.boxLayout.id) {
            return;
          }
          newLayout.push({
            ...boxLayout,
            position: this.moveBoxToFreePlace(newLayout, boxLayout.position)
          });
        });

        this.layoutBubbleUp(newLayout);
        this.updateLayout(newLayout);

        this.resizing.boxLayout = null;
        this.resizing.offset.x = 0;
        this.resizing.offset.y = 0;

        this.placeholder.hidden = true;
        this.doneResize();
      });
    },
    checkIfNeedsLayoutById(boxId) {
      let layout = this.getBoxLayoutById(boxId);

      // check for the existence of all position values
      if (layout &&
        layout.position &&
        layout.position.x >= 0 &&
        layout.position.y >= 0 &&
        layout.position.w >= 0 &&
        layout.position.h >= 0) {
        return false;
      } else {
        return true;
      }
    },
    createBoxLayout(...boxIds) {
      let placedNew = false;
      for (let boxId of boxIds) {
        let layout = this.getBoxLayoutById(boxId);
        if ((layout && !layout.position) || (layout && layout.position.y < 0)) {
          layout.position = this.moveBoxToFreePlace(this.localLayout, {
            x: 0,
            y: 0,
            ...this.defaultSize
          });
          placedNew = true;
        }
      }
      this.updateLayout(this.localLayout);
      if (placedNew) {
        this.$emit('placed');
      }
    }
  },
};
</script>

<style scoped>

.vuestro-grid {
  position: relative;
  overflow-x: hidden;
  flex-grow: 1;
}

.vuestro-grid .vuestro-grid-placeholder {
  border: 2px dashed var(--vuestro-outline);
  border-radius: 8px;
  background: var(--vuestro-active);
  z-index: 0;
}

/* deep-css of special case of resize-handle for placeholder */
.vuestro-grid .vuestro-grid-placeholder >>> .resize-handle {
  display: none;
}

</style>