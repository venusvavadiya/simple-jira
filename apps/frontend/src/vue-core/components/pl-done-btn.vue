<template lang="pug">
  v-btn(
    color="primary"
    text
    v-bind="$attrs"
    v-on="$listeners"
  ) {{ 'Done' }}
</template>
