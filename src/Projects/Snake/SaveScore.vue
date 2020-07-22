<template>
  <v-form class="saveScoreForm" @submit.prevent="sendData()">
    <v-card-text v-if="this.error">Name is required.</v-card-text>
    <v-text-field class="text-center" v-model="username" placeholder="Username"></v-text-field>
    <v-card-text class="text-center" v-model="score">Your Score: {{score}}</v-card-text>
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
    error: false,
  }),
  methods: {
    sendData() {
      var data = { username: this.username, score: this.score };
      axios.post(API_URL, data);

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
        return this.sendData();
      }
      this.error = true;
    },
  },
};
</script>
 
<style lang="scss">
.saveScoreForm {
  .text-center {
    text-align: center;
    font-size: 1vw;
    input {
      text-align: center;
      // filter: invert(100%);
    }
  }
}
</style>