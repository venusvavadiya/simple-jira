<template lang="pug">
  v-form(@submit.prevent="handleFormSubmit")
    v-card
      v-card-title {{ 'Rename' }}

      v-card-text
        pl-text-field(
          v-model="localProject.name"
          label="Name"
        )

      v-card-actions
        v-spacer
        pl-cancel-btn(@click="handleCancelBtnClick")
        pl-done-btn
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    project: {
      required: true,
      type: Object,
    },
  },

  computed: {
    localProject() {
      return { ...this.project };
    },
  },

  methods: {
    handleCancelBtnClick() {
      this.$emit('cancel');
    },

    handleFormSubmit() {
      this.$emit('done', this.localProject);
    },
  },
});
</script>
