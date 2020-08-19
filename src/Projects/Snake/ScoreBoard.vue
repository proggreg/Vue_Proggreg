<template>
  <v-card style="width: 50%" class="pa-8 primary--text secondary lighten-2" id="scoreBoard">
    <v-layout column justify-center align-center>
      <v-row v-if="this.snakeScores.scores.length !== 0">
        <v-col>
          <h1 style="white-space: nowrap" class="text-center primary--text">Snake High Scores!!!</h1>
        </v-col>
      </v-row>
      <v-col align-self="center" v-if="this.snakeScores.scores.length === 0">
        <SaveScore v-on:getNewScores="getScores" :score="this.score" ref="saveScore" />
      </v-col>
      <v-row v-else style=" min-width: 100%">
        <v-col align-self="center">
          <v-layout align-center justify-center>
            <v-data-table
              disable-items-per-page
              id="scoreTable"
              disable-sort
              class="secondary lighten-2 primary--text"
              :headers="snakeScores.headers"
              :items="snakeScores.scores"
            ></v-data-table>
          </v-layout>
        </v-col>
      </v-row>
      <v-btn
        @click="playAgain"
        class="mr-4 primary secondary--text"
        style="display: flex; margin: auto auto 0 auto !important; transition-timing-function: ease-in-out; margin-top: 20px "
      >Play again</v-btn>
    </v-layout>
  </v-card>
</template>
<script>
import SaveScore from "./SaveScore";

import axios from "axios";
const url = process.env.VUE_APP_API_URL + "/api/users";
export default {
  name: "ScoreBoard",
  components: {
    SaveScore,
  },
  props: ["score"],
  methods: {
    getScores() {
      // TODO not delt with draws
      axios
        .get(url)
        .then((res) => {
          for (let index = 0; index < res.data.length; index++) {
            res.data[index].index = index + 1;
          }
          return (this.snakeScores.scores = res.data);
        })
        .then(() => {
          console.log(this.snakeScores.scores);
          this.$emit("updateScores", this.snakeScores.scores);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    playAgain() {
      this.$emit("LoadGame");
      this.showScoreBoard = false;
    },
  },
  data() {
    return {
      snakeScores: {
        headers: [
          {
            align: "end",
            text: "Rank",
            value: "index",
            width: 1,
          },
          {
            align: "start",
            text: "Name",
            value: "username",
          },
          {
            align: "center",
            text: "Score",
            value: "score",
          },
        ],
        scores: [],
      },
      start: 0,
      end: 10,
    };
  },
};
</script>
<style lang="scss">
#scoreTable {
  width: 80%;
  thead {
    th {
      color: var(--v-primary-base);
    }
  }
  tr:hover {
    background: none;
  }
  .v-data-footer__select .v-select__selections .v-select__selection--comma {
    color: var(--v-primary-base);
  }
  .v-icon.v-icon {
    color: var(--v-primary-base);
  }
  .v-text-field > .v-input__control > .v-input__slot::before {
    border-color: var(--v-primary-base);
  }
}
.navCol {
  display: flex;
  justify-content: center;
}
#scoreboard {
  display: inline-block;
  color: currentColor;
  li {
    font-size: 16px;
  }
  .title {
    filter: invert(100%);
    -webkit-backdrop-filter: invert(100%);
  }
}

form {
  font-size: 2vw;
}
</style>