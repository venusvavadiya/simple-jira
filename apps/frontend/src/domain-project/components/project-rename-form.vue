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
