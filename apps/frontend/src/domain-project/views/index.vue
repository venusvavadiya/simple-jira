<template lang="pug">
  pl-max-width(class="my-12")
    project-list(
      :loading="loadingProjects"
      :projects="projects"
      @rename="openProjectDialog"
    )

    pl-dialog(v-model="projectDialog.isOpen")
      project-rename-form(
        :project="projectDialog.project"
        @cancel="closeProjectDialog"
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

  inject: ['projectRepository'],

  data() {
    return {
      projectDialog: {
        isOpen: false,
        project: {},
      },

      loadingProjects: false,
      projects: [],
    };
  },

  async mounted() {
    await this.loadProjects();
  },

  methods: {
    async loadProjects() {
      this.loadingProjects = true;
      this.projects = await this.projectRepository.getAll();
      this.loadingProjects = false;
    },

    async handleProjectRenameFormDone(project) {
      await this.projectRepository.save(project);
      this.closeProjectDialog();
      await this.loadProjects();
    },

    closeProjectDialog() {
      this.projectDialog.isOpen = false;
      this.projectDialog.project = {};
    },

    openProjectDialog(project) {
      this.projectDialog.isOpen = true;
      this.projectDialog.project = project;
    },
  },
});
</script>
