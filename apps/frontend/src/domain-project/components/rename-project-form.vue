<template>
  <v-card>
    <pl-card-title text="Rename" />

    <v-card-text>
      <pl-text-field label="Name" />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <pl-cancel-btn @click="$emit('cancel')" />
      <pl-done-btn @click="$emit('done')" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import PLCancelBtn from '../../components/pl-cancel-btn.vue';
import PLCardTitle from '../../components/pl-card-title.vue';
import PLDoneBtn from '../../components/pl-done-btn.vue';
import PLTextField from '../../components/pl-text-field.vue';

export default Vue.extend({
  components: {
    'pl-done-btn': PLDoneBtn,
    'pl-cancel-btn': PLCancelBtn,
    'pl-card-title': PLCardTitle,
    'pl-text-field': PLTextField,
  },
});
</script>
