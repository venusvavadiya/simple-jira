<template lang="pug">
  v-card
    v-list
      v-list-item(
        v-for="project in projects"
        :key="project.id"
      )
        v-list-item-content
          v-list-item-title {{ project.name }}

        v-list-item-action
          v-btn(icon)
            v-icon {{ 'mdi-pencil' }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    projects: {
      required: true,
      type: Array,
    },
  },
});
</script>
