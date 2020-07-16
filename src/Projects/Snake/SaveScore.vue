<template>
  <v-form class="saveScoreForm" @submit.prevent="sendData()">
    <v-text-field class="text-center" v-model="username" placeholder="Username"></v-text-field>
    <v-card-text class="text-center" v-model="score">Your Score: {{score}}</v-card-text>
    <!-- Name should be required -->
    <v-btn
      type="submit"
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
    score: 0
  }),
  methods: {
    sendData() {
      var data = { username: this.username, score: this.score };
      axios.post(API_URL, data);

      setTimeout(() => {
        this.$emit("getNewScores", null);
      }, 20);
    },
    setScore(score) {
      this.score = score;
    }
  }
};
</script>
 
<style lang="scss">
.saveScoreForm {
  width: 50%;
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