<template lang="pug">
  pl-max-width(class="my-12")
    project-list(:projects="projects")

    pl-dialog(v-model="dialog")
      project-rename-form(@cancel="dialog = false")
</template>

<script lang="ts">
import Vue from 'vue';
import ProjectList from '../components/project-list.vue';
import ProjectRenameForm from '../components/project-rename-form.vue';

export default Vue.extend({
  components: {
    ProjectList,
    ProjectRenameForm,
  },

  data() {
    return {
      dialog: true,

      projects: [
        { id: 'id1', name: 'Project 1' },
        { id: 'id2', name: 'Project 2' },
      ],
    };
  },
});
</script>
