<template>
  <v-form class="saveScoreForm text-center primary--text" @submit.prevent>
    <div style="display: flex">
      <v-card-text style="font-size: 150%" v-model="score"
        >Score<br />
        <div style="margin-top: 20px">
          {{ score }}
        </div>
      </v-card-text>
      <v-card-text v-model="playerRank" style="font-size: 150%">
        Rank<br />
        <div style="margin-top: 20px">
          {{ playerRank }}
        </div>
      </v-card-text>
    </div>
    <v-container style="height: 20px">
      <v-fade-transition>
        <v-card-text
          v-if="error"
          class="red--text font-weight-bold pa-0"
          v-text="this.error"
        ></v-card-text>
      </v-fade-transition>
    </v-container>
    <v-container>
      <v-layout class="mt-4" align-center justify-center>
        <BaseInput
          style="text-align: center"
          id="username_input"
          v-model="playerName"
          placeholder="Name"
        ></BaseInput>
      </v-layout>
    </v-container>
    <div style="display: flex; justify-content: space-between">
      <BaseButton id="saveGameBtn" @click="checkName" title="Save" />
      <BaseButton @click="restartGame" title="Play Again" />
    </div>
  </v-form>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";

const axios = require("axios");
const Filter = require("bad-words"),
  filter = new Filter();

export default {
  name: "PlayerScore",
  components: {
    BaseInput,
    BaseButton,
  },
  data: () => ({
    error: "",
  }),
  props: {
    score: { type: Number, required: true },
  },
  computed: {
    playerName: {
      get() {
        return this.$store.state.SnakeGame.playerName;
      },
      set(newUsername) {
        this.$store.commit("updatePlayerName", newUsername);
      },
    },
    playerRank() {
      let scores = this.$store.state.SnakeGame.scores.scores;

      let playerScore = this.score;
      let rank = null;

      // Top score
      if (playerScore > scores[0]) {
        return 1;
      }

      for (let i = 0; i < scores.length; i++) {
        let score = scores[i].score;
        rank = scores[i].index;

        if (playerScore === score || playerScore > score) {
          break;
        }
      }
      return rank;
    },
  },
  mounted() {
    // allows user to press enter to save game
    var input = document.getElementById("username_input");
    input.addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("saveGameBtn").click();
      }
    });
  },
  methods: {
    restartGame() {
      this.$emit("restartGame");
    },
    sendData() {
      var data = { username: this.playerName, score: this.score };
      const url = "/api/users";
      this.$store.commit("updateGameState", "setup");

      axios
        .post(url, data)
        .then(() => {
          this.$store.dispatch("getSnakeScores");
        })
        .catch((err) => console.log(err));
    },
    checkName() {
      if (!this.playerName) {
        this.error = "Please enter a name. 🙂";
      } else if (this.playerName.length > 30) {
        this.error = "Name must be less than 30 characters, sorry.";
      } else if (filter.isProfane(this.playerName)) {
        this.error = "Please don't use bad words.";
      } else {
        this.error = "";
        this.playerName = filter.clean(this.playerName);
        return this.sendData();
      }
    },
  },
};
</script>
 
<style scoped lang="scss">
.saveScoreForm {
  .text-center {
    .v-input__slot::before {
      border-color: var(--v-secondary-base);
    }

    input::placeholder {
      opacity: 0.8;
      color: var(--v-secondary-base);
    }
    input {
      text-align: center;
      color: var(--v-secondary-base);
    }
  }
}
</style>