<template>
  <v-card class="pa-4 primary--text secondary lighten-2">
    <v-layout column justify-center align-center>
      <v-card-title class="text-center">Controls</v-card-title>
      <v-card-text
        class="primary--text"
        v-if="isMobile"
      >Swipe the screen in the direction you want to make the snake move.</v-card-text>
      <v-card-text
        class="primary--text"
        v-else
      >Press the arrow key in the direction you want to make the snake move.</v-card-text>
    </v-layout>
  </v-card>
</template>

<script>
/* eslint-disable */
export default {
  name: "Instructions",
  data() {
    return {
      isMobile: mobileCheck(),
    };
  },
};
</script>
