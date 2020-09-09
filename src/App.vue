/* eslint-disable */
<template >
  <v-app @preventScroll="preventScroll()" class="primary" id="app">
    <Header />
    <v-main class="primary">
      <v-container class="pa-0 v-textarea--auto-grow fill-height" fluid>
        <v-layout justify-center align-center class="pa-2">
          <v-card class="pa-6 secondary rounded-xl" id="contentContainer">
            <v-btn class="primary secondary--text" v-if="tabCheck() == false" to="/Projects">Back</v-btn>
            <!-- content -->
            <router-view />
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header,
  },
  mounted() {
    this.$router.push("/Projects");
  },
  methods: {
    // TODO could be improved to make check dynamic, possibly changed if routes are made nested
    tabCheck() {
      if (
        this.$route.name === "Projects" ||
        this.$route.name === "AboutMe" ||
        this.$route.name === "Contact"
      ) {
        return true;
      }
      return false;
    },
    preventScroll() {
      console.log("prevent scroll");
    },
  },
};
</script>

<style lang="scss">
html {
  overflow-y: unset !important;
}

html,
body,
#app {
  font-family: "Exo 2", sans-serif;
}

#contentContainer {
  @media screen and (max-width: 600px) {
    padding: 5% !important;
    width: 100% !important;
  }
  margin-top: 2%;
  min-height: 90%;
  min-width: 90%;
}
</style>
