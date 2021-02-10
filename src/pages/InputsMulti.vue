<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#327633">
      <template #heading>Multi Select</template>
      <template #description>
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>
        <span>VuestroMultiSelect provides a templatized multi-select which allows a lot of control over the contents.
        <p>The templates are <em>title</em>, <em>item</em>, and <em>dropdown</em>
        </p>
        </span>
      </template>
      <vuestro-multi-select size="xl" :value="exampleValue" @keyup="onSearch" @clear="onClear">
        <template #title>Choices</template>
        <!--<template #item="{ item }">{{ item }}</template>-->
        <template #dropdown>
          <vuestro-container gutter="none">
            <template v-if="filtered.length > 0">
              <vuestro-pill v-for="e in filtered" :key="e.id"
                            clickable @click="onSelect(e)">
                <template #value>{{ e.value }}</template>
              </vuestro-pill>
            </template>
            <template v-else>
              <vuestro-button variant="info" value @click="onAddNew">
                Add {{ searchTerm }} as new value
              </vuestro-button>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Single Selection</template>
      <vuestro-multi-select size="xl" single :value="exampleValue" @keyup="onSearch" @clear="onClear">
        <template #title>Just one</template>
        <!--<template #item="{ item }">{{ item }}</template>-->
        <template #dropdown>
          <vuestro-container gutter="none">
            <template v-if="filtered.length > 0">
              <vuestro-pill v-for="e in filtered" :key="e.id"
                            clickable @click="onSelect(e)">
                <template #value>{{ e.value }}</template>
              </vuestro-pill>
            </template>
            <template v-else>
              <vuestro-button variant="info" value @click="onAddNew">
                Add {{ searchTerm }} as new value
              </vuestro-button>
            </template>
          </vuestro-container>
        </template>
      </vuestro-multi-select>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

/* global _ */

export default {
  name: 'InputsSpinner',
  data() {
    return {
      searchTerm: '',
      exampleDatasetWithIds: [
        {
          id: 'id0',
          value: 'Bigtax',
        },
        {
          id: 'id1',
          value: 'Daltfresh',
        },
        {
          id: 'id2',
          value: 'Pannier',
        },
        {
          id: 'id3',
          value: 'Asoka',
        },
        {
          id: 'id4',
          value: 'Bytecard',
        },
        {
          id: 'id5',
          value: 'Matsoft',
        },
      ],
      exampleValue: [],
    };
  },
  computed: {
    filtered() {
      if (this.searchTerm.length > 0) {
        let regex = new RegExp(this.searchTerm, 'i');
        return _.filter(this.exampleDatasetWithIds, (o) => {
          return regex.test(o.value);
        });
      }
      return this.exampleDatasetWithIds;
    },
  },
  methods: {
    onSelect(e) {
      this.exampleValue.push(e);
    },
    onSearch(e) {
      this.searchTerm = e.target.value;
    },
    onClear() {
      this.exampleValue = [];
    },
    onAddNew(d) {
      let newObj = {
        id: this.vuestroGenerateId(5),
        value: this.searchTerm,
      };
      this.exampleDatasetWithIds.push(newObj);
      this.exampleValue.push(newObj);
    },
  },
};

</script>