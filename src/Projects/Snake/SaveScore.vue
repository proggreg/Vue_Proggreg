<template>
  <v-form class="saveScoreForm" @submit.prevent>
    <v-card-text
      style="font-size:20px"
      class="text-center font-weight-bold primary--text"
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

    <v-text-field
      style="width: max-content; margin: 0 auto;"
      class="text-center"
      v-model="username"
      placeholder="Username"
      id="username_input"
    ></v-text-field>

    <v-btn
      @click="checkName"
      id="saveBtn"
      class="mr-4 primary secondary--text"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Save</v-btn>
  </v-form>
</template>
<script>
const axios = require("axios");
const Filter = require("bad-words"),
  filter = new Filter();

export default {
  name: "SaveScore",
  data: () => ({
    username: "",
    score: 0,
    showButton: false,
    error: "",
  }),
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
    sendData() {
      var data = { username: this.username, score: this.score };
      const url = process.env.VUE_APP_API_URL + "/api/users";

      axios
        .post(url, data)
        .then(() => {
          this.$emit("getNewScores");
        })
        .catch((err) => console.log(err));
    },
    setScore(score) {
      this.showButton = true;
      this.score = score;
    },
    checkName() {
      if (!this.username) {
        this.error = "Name is required.";
      } else if (this.username.length > 30) {
        this.error = "Name must be less than 30 characters, sorry.";
      } else if (filter.isProfane(this.username)) {
        this.error = "Please don't use bad words.";
      } else {
        this.username = filter.clean(this.username);
        this.error = "";
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
      border-color: var(--v-primary-base) !important;
    }

    input::placeholder {
      opacity: 0.8;
      color: var(--v-primary-base);
    }
    input {
      text-align: center;
      color: var(--v-primary-base);
    }
  }
}
</style>