<template lang="pug">
  pl-max-width(class="my-12")
    project-list(
      :projects="projects"
      @rename="handleProjectRename"
    )

    pl-dialog(v-model="projectDialog.show")
      project-rename-form(
        :project="projectDialog.project"
        @cancel="handleProjectRenameFormCancel"
        @done="handleProjectRenameFormDone"
      )
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
      projectDialog: {
        show: false,
        project: {},
      },

      projects: [
        { id: 'id1', name: 'Project 1' },
        { id: 'id2', name: 'Project 2' },
      ],
    };
  },

  methods: {
    handleProjectRename(project) {
      this.projectDialog.show = true;
      this.projectDialog.project = project;
    },

    handleProjectRenameFormCancel() {
      this.projectDialog.show = false;
      this.projectDialog.project = {};
    },

    handleProjectRenameFormDone(project) {
      this.projectDialog.show = false;
      this.projectDialog.project = {};
      this.projects = this.projects.map((p) => (p.id === project.id ? project : p));
    },
  },
});
</script>
