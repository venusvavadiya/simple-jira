<template lang="pug">
  v-card
    v-card-title {{ 'Rename' }}

    v-card-text
      pl-text-field(label="Name")

    v-card-actions
      v-spacer
      pl-cancel-btn(@click="$emit('cancel')")
      pl-done-btn(@click="$emit('done')")
</template>
