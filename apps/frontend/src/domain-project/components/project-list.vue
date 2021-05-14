<template lang="pug">
  v-card(:loading="loading")
    v-list
      v-list-item(
        v-for="project in projects"
        :key="project.id"
      )
        v-list-item-content
          v-list-item-title {{ project.name }}

        v-list-item-action
          v-btn(
            icon
            @click="handleEditClick(project)"
          )
            v-icon {{ 'mdi-pencil' }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    loading: {
      type: Boolean,
    },

    projects: {
      required: true,
      type: Array,
    },
  },

  methods: {
    handleEditClick(project) {
      this.$emit('rename', project);
    },
  },
});
</script>
