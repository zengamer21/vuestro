<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-indigo)">
      <template #heading>Forms</template>
      <template #description>Common control form juxtapositions to check fit and sizing</template>

      <vuestro-container>
        <vuestro-card>
          <template #description>50/50 split between text field and dropdown</template>
        </vuestro-card>
        <vuestro-card cols="6">
          <vuestro-text-field size="md" variant="outline" placeholder="md outline box" v-model="exampleString"></vuestro-text-field>
        </vuestro-card>
        <vuestro-card cols="6">
          <vuestro-dropdown stretch click-to-open>
            <template #button>
              <vuestro-button size="md" rounded justify="flex-start">Dropdown with md button</vuestro-button>
            </template>
            <vuestro-list-button>Option 1</vuestro-list-button>
            <vuestro-list-button>Option 2</vuestro-list-button>
          </vuestro-dropdown>
        </vuestro-card>
      </vuestro-container>

      <vuestro-container>
        <vuestro-card>
          <template #description>50/50 split between dropdown and button</template>
        </vuestro-card>
        <vuestro-card cols="6">
          <vuestro-dropdown stretch>
            <template #button>
              <vuestro-button size="md" rounded justify="flex-start">Dropdown with md button</vuestro-button>
            </template>
            <vuestro-list-button>Option 1</vuestro-list-button>
            <vuestro-list-button>Option 2</vuestro-list-button>
          </vuestro-dropdown>
        </vuestro-card>
        <vuestro-card cols="6">
          <vuestro-button size="md" stretch rounded>md button</vuestro-button>
        </vuestro-card>
      </vuestro-container>

      <vuestro-container>
        <vuestro-card>
          <template #description>Text Field next to color picker</template>
        </vuestro-card>
        <vuestro-card>
          <vuestro-container>
            <vuestro-text-field size="lg" variant="outline" placeholder="lg outline box" v-model="exampleString"></vuestro-text-field>
            <vuestro-color-picker v-model="color" :colors="colorOptions"></vuestro-color-picker>
          </vuestro-container>
        </vuestro-card>
      </vuestro-container>

      <vuestro-container>
        <vuestro-card>
          <template #description>Dense arrangement of equal-sized controls</template>
        </vuestro-card>
        <vuestro-button size="sm" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="sm" pill>sm button</vuestro-button>
        <vuestro-pill size="sm">
          <template #value>sm pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="sm" variant="primary" value>sm button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-button size="sm" checkbox>Checkbox</vuestro-button>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="md" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="md" pill>md button</vuestro-button>
        <vuestro-pill size="md">
          <template #value>md pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="md" variant="primary" value>md button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-button size="md" checkbox>Checkbox</vuestro-button>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="lg" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="lg" pill>lg button</vuestro-button>
        <vuestro-pill size="lg">
          <template #value>lg pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="lg" variant="primary" value>lg button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-button size="lg" checkbox>Checkbox</vuestro-button>
      </vuestro-container>

      <vuestro-container>
        <vuestro-button size="xl" variant="info" value round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button size="xl" pill>xl button</vuestro-button>
        <vuestro-pill size="xl">
          <template #value>xl pill</template>
        </vuestro-pill>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="xl" variant="primary" value>xl button dropdown</vuestro-button>
          </template>
          <vuestro-list-button>item 1</vuestro-list-button>
          <vuestro-list-button>item 2</vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-button size="xl" checkbox>Checkbox</vuestro-button>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field size="xl" variant="outline" placeholder="xl outline box"></vuestro-text-field>
        <vuestro-button size="xl" rounded>xl button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="xl" rounded>Dropdown with xl button</vuestro-button>
          </template>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field size="lg" variant="outline" placeholder="lg outline box"></vuestro-text-field>
        <vuestro-button size="lg" rounded>lg button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="lg" rounded>Dropdown with lg button</vuestro-button>
          </template>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field size="md" variant="outline" placeholder="md outline box"></vuestro-text-field>
        <vuestro-button size="md" rounded>md button</vuestro-button>
        <vuestro-dropdown>
          <template #button>
            <vuestro-button size="md" rounded>Dropdown with md button</vuestro-button>
          </template>
        </vuestro-dropdown>
      </vuestro-container>

      <vuestro-container>
        <vuestro-text-field variant="outline" radius="0" size="lg" no-margin placeholder="outline box"></vuestro-text-field>
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
  data() {
    return {
      exampleString: '',
      color: '#ff80ab',
      colorOptions: [
        '#ff8a80',
        '#ff80ab',
        '#ea80fc',
        '#b388ff',
        '#8c9eff',
        '#82b1ff',
        '#80d8ff',
        '#84ffff',
        '#a7ffeb',
        '#b9f6ca',
        '#ccff90',
        '#f4ff81',
        '#ffff8d',
        '#ffe57f',
        '#ffd180',
        '#ff9e80',
  		],
    };
  },
};

</script>

<style scoped>


</style>