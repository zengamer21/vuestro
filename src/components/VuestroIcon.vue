<template>
  <icon :name="name" :scale="scale" :spin="spin" :inverse="inverse" :pulse="pulse" :flip="flip" :label="label" :title="title"></icon>
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
    scale: { type: null },
    spin: { type: Boolean, default: false },
    inverse: { type: Boolean, default: false },
    pulse: { type: Boolean, default: false },
    flip: { type: Boolean, default: false },
    label: { type: String },
    title: { type: String },
  },
};

</script>

