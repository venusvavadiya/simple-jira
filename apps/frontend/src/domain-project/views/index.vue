<template lang="pug">
  pl-max-width(class="my-12")
    project-list(
      :loading="loadingProjects"
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

  inject: ['projectRepository'],

  data() {
    return {
      projectDialog: {
        show: false,
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

    handleProjectRename(project) {
      this.projectDialog.show = true;
      this.projectDialog.project = project;
    },

    handleProjectRenameFormCancel() {
      this.projectDialog.show = false;
      this.projectDialog.project = {};
    },

    async handleProjectRenameFormDone(project) {
      this.projectDialog.show = false;
      this.projectDialog.project = {};
      await this.projectRepository.save(project);
      await this.loadProjects();
    },
  },
});
</script>
