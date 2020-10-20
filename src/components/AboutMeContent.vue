<template>
  <v-layout column class="primary--text">
    <h1 class="text-center">A little about me</h1>
    <p>Hi I'm Greg Field 👋</p>
    <p>
      I made this website to learn about Web development and also as a home to
      share some projects.
    </p>
    <p>
      There may not be many at the moment but I'm hoping there will be more
      soon.
    </p>
    <v-layout justify-center>
      <BaseButton @click="downloadCV($event)">Download my CV</BaseButton>
    </v-layout>
    <BaseSnackbar :show="messageSent" :message="message"></BaseSnackbar>
  </v-layout>
</template>

<script>
import BaseButton from "./BaseButton";
import BaseSnackbar from "./BaseSnackbar";

export default {
  name: "AboutMeContent",
  components: {
    BaseButton,
    BaseSnackbar,
  },
  methods: {
    async downloadCV(e) {
      e.preventDefault();
      let link = await this.$store.dispatch("getCV");
      link.click();
      this.messageSent = true;
      this.message = "Thanks! 😀 Hope to speak to you soon";
    },
  },
  data() {
    return {
      message: "",
      messageSent: false,
    };
  },
};
</script>

<style scoped lang="scss">
#aboutMeCard {
  margin: 1% 20%;
}
p {
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>