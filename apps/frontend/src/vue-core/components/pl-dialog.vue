<template>
  <v-dialog
    :max-width="$vuetify.breakpoint.thresholds.xs"
    persistent
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-dialog>
</template>
