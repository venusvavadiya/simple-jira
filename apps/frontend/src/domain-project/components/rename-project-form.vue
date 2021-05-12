<template>
  <v-card>
    <v-card-title>
      {{ 'Rename' }}
    </v-card-title>

    <v-card-text>
      <v-text-field
        outlined
        label="Name"
        hide-details="auto"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>

      <v-btn
        text
        @click="dialog = false"
      >
        {{ 'Cancel' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

};
</script>
