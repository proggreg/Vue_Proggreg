<template>
  <v-layout
    class="secondary--text"
    column
    justify-center
    align-center
    style="width: 100%"
  >
    <v-row style="min-width: 100%">
      <v-col align-self="center">
        <v-layout id="test" align-center justify-center class="full-width">
          <v-data-table
            height="300px"
            width="100%"
            :footer-props="{
              itemsPerPageOptions: [5],
            }"
            id="scoreTable"
            disable-sort
            class="topbar primary--text"
            :headers="scores.headers"
            :items="scores.scores"
            style="width: 90%"
          ></v-data-table>
        </v-layout>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
export default {
  name: "SnakeLeaderboard",
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
<style scoped lang="scss">
#scoreTable {
  thead {
    th {
      color: var(--v-primary-base) !important;
    }
    tr:hover {
      background: none;
    }
  }
  tbody {
    tr:hover {
      color: var(--v-primary-base);
      opacity: 0.6;
    }
  }

  .v-data-footer__select .v-select__selections .v-select__selection--comma {
    color: var(--v-primary-base);
  }
  .v-icon.v-icon {
    color: var(--v-primary-base);
  }
}
</style>