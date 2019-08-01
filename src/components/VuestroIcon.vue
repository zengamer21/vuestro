<template>
  <icon :name="name"></icon>
</template>

<script>

// import all icons, creates bloat, but sometimes there just no
// way to know what a user might want
import 'vue-awesome/icons';
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

