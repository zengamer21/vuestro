<template>
  <icon :name="name"></icon>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroIcon',
  components: {
    Icon,
  },
  props: {
    name: { type: String, required: true },
  },
};

</script>

