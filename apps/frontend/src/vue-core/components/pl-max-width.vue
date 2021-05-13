<template>
  <div>
    <div
      class="mx-auto"
      :style="{ maxWidth }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    threshold: {
      default: 'sm',
      type: String,
      validator(value) {
        return ['xs', 'sm', 'md', 'lg'].includes(value);
      },
    },
  },

  computed: {
    maxWidth() {
      const threshold = this.$vuetify.breakpoint.thresholds[this.threshold];
      return `${threshold}px`;
    },
  },
});
</script>
