<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

let PROJECTS = [
  { id: 'id1', name: 'Project 1' },
  { id: 'id2', name: 'Project 2' },
];

const projectRepository = {
  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PROJECTS);
      }, 2000);
    });
  },

  async save(project) {
    return new Promise((resolve) => {
      setTimeout(() => {
        PROJECTS = PROJECTS.map((p) => (p.id === project.id ? project : p));
        resolve();
      }, 2000);
    });
  },
};

export default Vue.extend({
  provide() {
    return { projectRepository };
  },
});
</script>
