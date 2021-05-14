<template lang="pug">
  pl-max-width(class="my-12")
    project-list(
      :loading="isProjectsLoading"
      :projects="projects"
      @rename="openProjectDialog"
    )

    pl-dialog(v-model="projectDialog.isOpen")
      project-rename-form(
        :loading="projectDialog.isDoneLoading"
        :project="projectDialog"
        @cancel="closeProjectDialog"
        @done="handleProjectRenameFormDone"
      )
</template>

<script lang="ts">
import Vue from 'vue';
import ProjectList from '../components/project-list.vue';
import ProjectRenameForm from '../components/project-rename-form.vue';
import { Project } from '../entities/project.entity';

export default Vue.extend({
  components: {
    ProjectList,
    ProjectRenameForm,
  },

  inject: ['projectRepository'],

  data() {
    return {
      isProjectsLoading: false,

      projectDialog: {
        isDoneLoading: false,
        isOpen: false,
        project: {},
      },

      projects: [],
    };
  },

  async mounted() {
    await this.loadProjects();
  },

  methods: {
    async loadProjects() {
      this.isProjectsLoading = true;
      this.projects = await this.projectRepository.getAll();
      this.isProjectsLoading = false;
    },

    async handleProjectRenameFormDone(project: Project) {
      this.projectDialog.isDoneLoading = true;
      await this.projectRepository.save(project);
      this.projectDialog.isDoneLoading = false;
      this.closeProjectDialog();
      await this.loadProjects();
    },

    closeProjectDialog() {
      this.projectDialog.isOpen = false;
      this.projectDialog.project = {};
    },

    openProjectDialog(project: Project) {
      this.projectDialog.isOpen = true;
      this.projectDialog.project = project;
    },
  },
});
</script>
