<template>
  <v-form class="saveScoreForm" @submit.prevent>
    <v-card-text
      style="font-size:20px"
      class="text-center font-weight-bold secondary--text"
      v-model="score"
    >Your Score: {{score}}</v-card-text>
    <v-container style="height: 20px">
      <v-fade-transition>
        <v-card-text
          v-if="error"
          class="text-center red--text font-weight-bold pa-0"
          v-text="this.error"
        ></v-card-text>
      </v-fade-transition>
    </v-container>
    <v-container>
      <v-layout class="mt-4" align-center justify-center>
        <BaseInput
          style="text-align: center"
          id="username_input"
          @change="updateUsername"
          placeholder="Name"
        ></BaseInput>
      </v-layout>
    </v-container>
    <v-layout column align-center justify-center>
      <BaseButton @click="checkName">Save</BaseButton>

      <BaseButton @click="restartGame" style="margin-top: 40px;">Play Again</BaseButton>
    </v-layout>
  </v-form>
</template>
<script>
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";

const axios = require("axios");
const Filter = require("bad-words"),
  filter = new Filter();

export default {
  name: "SaveScore",
  components: {
    BaseInput,
    BaseButton,
  },
  data: () => ({
    username: "",
    showButton: false,
    error: "",
  }),
  props: ["score", "show"],
  mounted() {
    // add event listener to enter key to submit score
    var input = document.getElementById("username_input");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("saveBtn").click();
      }
    });
  },
  methods: {
    restartGame() {
      this.$store.commit("restartGame");
    },
    updateUsername(newUsername) {
      this.username = newUsername;
    },
    sendData() {
      var data = { username: this.username, score: this.score };
      const url = process.env.VUE_APP_API_URL + "/api/users";

      this.$store.commit("restartGame");

      axios
        .post(url, data)
        .then(() => {
          this.$store.dispatch("getSnakeScores");
        })
        .catch((err) => console.log(err));
    },
    checkName() {
      if (!this.username) {
        this.error = "Name is required.";
      } else if (this.username.length > 30) {
        this.error = "Name must be less than 30 characters, sorry.";
      } else if (filter.isProfane(this.username)) {
        this.error = "Please don't use bad words.";
      } else {
        this.error = "";
        this.username = filter.clean(this.username);
        return this.sendData();
      }
    },
  },
};
</script>
 
<style lang="scss">
// TODO Make font size responsive for mobile and browsers
.saveScoreForm {
  .text-center {
    text-align: center;
    font-size: 16px;
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