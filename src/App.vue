/* eslint-disable */
<template >
  <v-app class="primary" id="app">
    <Header />
    <v-main class="primary">
      <v-container class="fill-height pa-0 v-textarea--auto-grow" fluid>
        <v-layout justify-center align-center>
          <v-card class="pa-6 secondary" id="contentContainer">
            <v-btn
              class="primary secondary--text"
              v-if="tabCheck() == false"
              to="/ProjectsGrid"
            >Back</v-btn>
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
    this.$router.push("/ProjectsGrid");
  },
  methods: {
    // TODO could be improved to make check dynamic, possibly changed if routes are made nested
    tabCheck() {
      if (
        this.$route.name == "ProjectsGrid" ||
        this.$route.name == "AboutMe" ||
        this.$route.name == "Contact"
      ) {
        return true;
      }
      return false;
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
  height: 100% !important;
}

#contentContainer {
  @media screen and (max-width: 600px) {
    padding: 5% !important;
    width: 100% !important;
    height: 100% !important;
  }
  height: 90%;
  width: 90%;
}
</style>
