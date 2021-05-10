<template>
  <div>
    <max-width class="my-12">
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
          </v-list-item>
        </v-list>
      </v-card>
    </max-width>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MaxWidth from '../components/max-width.vue';

export default Vue.extend({
  components: { MaxWidth },

  data() {
    return {
       projects: [
        { id: 'id1', name: 'Project 1' },
        { id: 'id2', name: 'Project 2' },
      ],
    };
  },
});
</script>
