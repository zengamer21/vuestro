<template>
  <vuestro-container gutter="none" column content="stretch">
    <!--PARAMETER ITEMs-->
    <vuestro-geo-pattern class="vuestro-parameter-list-item"
                         v-for="(p, idx) in parameters"
                         :key="p.field"
                         :seed="`${p.type}_type`">
      <!--TITLE BAR-->
      <vuestro-container justify="space-between" gutter="none" align="center">
        <div class="vuestro-parameter-list-name">{{ p.title }}</div>
        <div class="vuestro-parameter-list-type">{{ p.type | vuestroTitleCase }}</div>
      </vuestro-container>
      <!--BODY/CONTENT-->
      <vuestro-container class="vuestro-parameter-list-body"
                         column
                         gutter="sm"
                         content="stretch">
        <div class="vuestro-parameter-list-description">{{ p.description }}</div>
        <vuestro-container v-if="p.type === 'boolean'"
                           justify="space-between"
                           gutter="sm"
                           overflow-hidden>
          <vuestro-button pill stretch no-margin
                          variant="success"
                          :value="value[p.field]"
                          @click="setField(p.field, p.type, true)">
            Yes
          </vuestro-button>
          <div style="width: 0.4em"></div>
          <vuestro-button pill stretch no-margin
                          variant="danger"
                          :value="value[p.field] === false"
                          @click="setField(p.field, p.type, false)">
            No
          </vuestro-button>
        </vuestro-container>
        <vuestro-dropdown v-else-if="p.type === 'option'"
                          stretch close-on-content-click>
          <template #button>
            <vuestro-button pill value variant="info">
              {{ value[p.field] || 'Select...' }}
            </vuestro-button>
          </template>
          <vuestro-list-button v-for="o in p.options" :key="o"
                               @click="setField(p.field, p.type, o)">
            {{ o }}
          </vuestro-list-button>
        </vuestro-dropdown>
        <vuestro-text-field v-else
                            no-margin
                            stretch
                            size="md"
                            :readonly="readonly"
                            :validate="(v) => validate(p.type, v)"
                            :value="value[p.field]"
                            @input="setField(p.field, p.type, ...arguments)">
        </vuestro-text-field>
      </vuestro-container>
    </vuestro-geo-pattern>

  </vuestro-container>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroParameterList',
  props: {
    value: { type: Object }, // the object these parameters will be set on
    readonly: { type: Boolean, default: false }, // true if parameters should be read only
    parameters: { type: Array, required: true }, // the parameter list, schema:
    //  [
    //    {
    //      title: '<the UI-friendly name>',
    //      description: '<the UI-friendly description>',
    //      field: '<the actual field name set in value object>',
    //      type: 'string|number|option|boolean',
    //      options: ['<array of strings, only for option type>'],
    //  ]
  },
  methods: {
    setField(field, type, value) {
      let newVal = _.cloneDeep(this.value);
      // coerce value
      switch (type) {
        case 'number':
          newVal[field] = parseFloat(value);
          if (isNaN(newVal[field])) {
            newVal[field] = null;
          }
          break;
        case 'boolean':
          newVal[field] = !!value;
          break;
        default:
          newVal[field] = value;
      }
      this.$emit('input', newVal);
    },
    validate(t, d) {
      // only validate number entries
      if (t === 'number') {
        if (d.length === 0 || `${d}`.match(/^[\d\.\-]+$/)) {
          return false;
        } else {
          return 'Must be a number';
        }
      }
    },
  },
};

</script>

<style scoped>

.vuestro-parameter-list-item {
  margin: 0.2em 0.2em;
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-parameter-list-name {
  padding: 0.2em 0.4em;
}
.vuestro-parameter-list-type {
  margin-left: auto;
  margin-right: 0.5em;
  font-size: 0.8em;
  font-weight: 700;
}
.vuestro-parameter-list-body {
  background-color: var(--vuestro-panel-bg);
  margin: 1px;
  border-radius: var(--vuestro-control-border-radius);
}
.vuestro-parameter-list-description {
  font-size: 0.9em;
  padding: 0.2em 0.4em;
}

</style>