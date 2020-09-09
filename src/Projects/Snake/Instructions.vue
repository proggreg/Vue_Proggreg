<template>
  <v-container style="height: 100%;" class="full-width">
    <v-layout id="instructionsCard" column style="height: 80%;" justify-center align-center>
      <!-- Mobile -->
      <v-container v-if="isMobile">
        <v-card-text
          style="font-size: 1.2rem;"
          class="secondary--text pa-2 text-center"
        >Swipe the screen in the direction you want to make the snake move.</v-card-text>
        <v-img src="@/assets/swipe.png"></v-img>
      </v-container>

      <!-- Desktop -->
      <v-container v-else>
        <v-card-text
          style="font-size: 1.2rem; text-align: center; margin-bottom: 20px;"
          class="secondary--text text--center"
        >Use arrow keys to move the snake.</v-card-text>
        <v-layout justify-center align-center>
          <v-img max-width="50%" src="@/assets/arrowkeys.png"></v-img>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
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

