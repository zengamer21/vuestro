<template>
  <vuestro-container no-wrap shrink>
    <vuestro-card>
      <vuestro-panel scroll stretch content-padding="lg">
        <template #title>Scrolling Vuestro Panel</template>
        <template #toolbar>
          <vuestro-tooltip position="bottom">
            <template #content>Tooltip works properly</template>
            <vuestro-button round no-border>
              <vuestro-icon name="sync"></vuestro-icon>
            </vuestro-button>
          </vuestro-tooltip>
        </template>
        <p>Set the <em>scroll</em> property to enable scrolling of the content.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>Still here.</p>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

export default {
  name: 'ContainersPanelScroll',
};

</script>