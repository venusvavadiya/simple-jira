<template>
  <v-card-title>
    {{ text }}
  </v-card-title>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      required: true,
      type: String,
    },
  },
});
</script>
