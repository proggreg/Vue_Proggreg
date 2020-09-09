<template>
  <v-layout column justify-center align-center>
    <v-row v-if="scores.length !== 0">
      <v-col>
        <h1 style="white-space: nowrap" class="text-center secondary--text">High Scores!</h1>
      </v-col>
    </v-row>

    <v-row style=" min-width: 100%">
      <v-col align-self="center">
        <v-layout align-center justify-center>
          <v-data-table
            :footer-props="{
            itemsPerPageOptions: [5]
            }
            "
            id="scoreTable"
            disable-sort
            class="primary lighten-2 secondary--text"
            :headers="scores.headers"
            :items="scores.scores"
            style="width: 90%;"
          ></v-data-table>
        </v-layout>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
export default {
  name: "ScoreBoard",
  props: ["score"],
  computed: {
    gameState() {
      return this.$store.state.SnakeGame.gameState;
    },
    scores() {
      return this.$store.state.SnakeGame.scores;
    },
  },
  methods: {
    playAgain() {
      this.$store.commit("resetGame");
      this.showScoreBoard = false;
    },
  },
};
</script>
