<template>
  <pl-max-width class="my-12">
    <v-card>
      <v-list>
        <v-list-item
          v-for="project in projects"
          :key="project.id"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ project.name }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn
              icon
              @click="dialog = true"
            >
              <v-icon>
                {{ 'mdi-pencil' }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>

    <v-dialog
      v-model="dialog"
      :max-width="$vuetify.breakpoint.thresholds.xs"
      persistent
    >
      <rename-project-form />
    </v-dialog>
  </pl-max-width>
</template>

<script lang="ts">
import Vue from 'vue';
import PLMaxWidth from '../components/pl-max-width.vue';
import RenameProjectForm from '../domain-project/components/rename-project-form.vue';

export default Vue.extend({
  components: {
    'pl-max-width': PLMaxWidth,
    RenameProjectForm,
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
