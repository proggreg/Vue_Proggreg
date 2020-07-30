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
    <v-btn
      @click="checkName"
      class="mr-4 primary"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Save</v-btn>
  </v-form>
</template>
<script>
const axios = require("axios");

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
      const url = "http://" + process.env.VUE_APP_API_URL + "/api/users";

      console.log(url);

      axios
        .post(url, data)
        .then((res) => {
          console.warn(res);
        })
        .catch((err) => console.log(err));

      // TODO would be better to use a promise?
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