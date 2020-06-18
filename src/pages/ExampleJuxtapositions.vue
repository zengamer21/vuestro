<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-indigo)">
      <template #heading>Juxtapositions</template>
      <template #description>Common control juxtapositions to check fit and sizing</template>

      <vuestro-container>
        <vuestro-button size="sm" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="sm" pill>sm button</vuestro-button>
        <vuestro-pill size="14px">
          <template #value>14px pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="sm" variant="primary" value>sm button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="md" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="md" pill>md button</vuestro-button>
        <vuestro-pill size="18px">
          <template #value>18px pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="md" variant="primary" value>md button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="lg" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="lg" pill>lg button</vuestro-button>
        <vuestro-pill size="24px">
          <template #value>24px pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="lg" variant="primary" value>lg button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="xl" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="xl" pill>xl button</vuestro-button>
        <vuestro-pill size="32px">
          <template #value>32px pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="xl" variant="primary" value>xl button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field variant="outline" placeholder="outline box"></vuestro-text-field>
        <vuestro-button size="xl" rounded>xl button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="xl" rounded>Dropdown with xl button</vuestro-button>
          </template>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field variant="outline" size="sm" placeholder="outline box"></vuestro-text-field>
        <vuestro-button size="lg" rounded>lg button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="lg" rounded>Dropdown with lg button</vuestro-button>
          </template>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field variant="outline" radius="0" size="sm" no-margin placeholder="outline box"></vuestro-text-field>
        <vuestro-button size="lg" no-margin variant="primary" value>lg button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="lg" variant="info" value no-margin>Dropdown with lg button</vuestro-button>
          </template>
          <vuestro-list-button>test</vuestro-list-button>
        </vuestro-dropdown>
      </vuestro-container>

    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'ExampleJuxtapositions',
};

</script>

<style scoped>


</style>