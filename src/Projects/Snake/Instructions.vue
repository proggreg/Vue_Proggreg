<template>
  <v-container column class="text-center">
    <!-- Mobile -->
    <div v-if="isTouchEnabled()">
      <v-card-text class="primary--text" style="font-size: 100%"
        >Swipe the screen to make the snake move.</v-card-text
      >
      <v-container style="display: flex; width: 100px">
        <v-img contain src="@/assets/swipe.png"></v-img>
      </v-container>
    </div>

    <!-- Desktop -->
    <div v-else>
      <v-card-text class="primary--text" style="font-size: 100%">
        Press arrow keys to move the snake.
      </v-card-text>

      <v-container style="width: 40%" justify-center align-center>
        <v-img contain src="@/assets/arrowkeys.png"></v-img>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Instructions",
  methods: {
    isTouchEnabled() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },
  },
};
</script>

