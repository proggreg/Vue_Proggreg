<template>
  <v-form class="saveScoreForm" @submit.prevent>
    <!-- TODO would be better to not have the text field move when error message is shown -->
    <v-card-text class="text-center red--text font-weight-bold" v-text="this.error"></v-card-text>
    <v-text-field
      style="width: max-content; margin: 0 auto;"
      class="text-center"
      v-model="username"
      placeholder="Username"
    ></v-text-field>
    <v-card-text class="text-center font-weight-bold" v-model="score">Your Score: {{score}}</v-card-text>
    <!-- Name should be required -->
    <v-btn
      @click="checkName"
      class="mr-4 primary"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Save</v-btn>
  </v-form>
</template>
<script>
const axios = require("axios");

const API_URL = "http://localhost:4000/api/users";

export default {
  name: "SaveScore",
  data: () => ({
    username: "",
    score: 0,
    showButton: false,
    error: "",
  }),
  methods: {
    sendData() {
      var data = { username: this.username, score: this.score };
      axios.post(API_URL, data).then((res) => {
        console.log(res);
      });

      // would be better to use a promise?
      setTimeout(() => {
        this.$emit("getNewScores", null);
      }, 100);
    },
    setScore(score) {
      this.showButton = true;
      this.score = score;
    },
    checkName() {
      if (this.username) {
        this.error = "";
        return this.sendData();
      }
      this.error = "Name is required.";
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
    input {
      text-align: center;
      // filter: invert(100%);
    }
  }
}
</style>