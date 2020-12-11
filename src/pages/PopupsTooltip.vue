<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-green)">
      <template #heading>Tooltips</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        VuestroTooltip provides a fully template-able Vue tooltip.
      </template>

      <vuestro-container space-between>
        <vuestro-tooltip min-width="200">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">top</vuestro-button>
        </vuestro-tooltip>

        <vuestro-tooltip position="left">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">left</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="right">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">right</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="bottom">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">bottom</vuestro-button>
        </vuestro-tooltip>
      </vuestro-container>

      <vuestro-container space-between>
        <vuestro-tooltip position="left">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">left</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip>
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">top</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="bottom">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">bottom</vuestro-button>
        </vuestro-tooltip>
        <vuestro-tooltip position="right">
          <template #content>
            hello this is a tooltip with components inside
            <vuestro-button>test</vuestro-button>
          </template>
          <vuestro-button ref="buttonWithTooltip">right</vuestro-button>
        </vuestro-tooltip>
      </vuestro-container>

    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip>
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="6">
      <template #description>Tooltip inside Panel</template>
      <vuestro-panel>
        <template #title>Panel</template>
        <vuestro-tooltip position="bottom">
          <template #content>Tooltip!</template>
          <vuestro-button>Test</vuestro-button>
        </vuestro-tooltip>
      </vuestro-panel>
    </vuestro-card>

    <vuestro-card cols="12">
      <template #description>Tooltip on icon</template>
      <div class="example-container">
        <vuestro-tooltip position="bottom" no-wrap>
          <template #content>Download entire log as JSON</template>
          <vuestro-button round no-border>
            <vuestro-icon name="download"></vuestro-icon>
          </vuestro-button>
        </vuestro-tooltip>
      </div>
    </vuestro-card>


  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Popups',
  components: {
    Icon,
  },
  data() {
    return {
      modalOpen1: false,
      modalOpen2: false,
      modalOpen3: false,
    };
  },
	methods: {
		onClick() {
			console.log('click');
		},
		onAfterOpen() {
		  console.log('opened');
		},
	}
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container-center {
  display: flex;
  justify-content: center;
}
.example-container.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
.example-container.dark {
  padding: 30px 20px 80px 10px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
  justify-content: space-between;
}

.example-vertical-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>