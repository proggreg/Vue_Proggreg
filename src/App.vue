/* eslint-disable */
<template >
  <v-app class="primary" id="app">
    <Header />
    <v-main class="primary" style="display: flex; justify-content: center; align-content: center">
      <v-container style="display:flex; height: 100%;" fluid>
        <v-layout justify-center align-center>
          <v-card height="90%" id="contentContainer" width="80%" min-height="500px" class="pa-12">
            <v-btn class="primary" v-if="tabCheck() == false" to="/ProjectsGrid">Back</v-btn>
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

    console.log(this.$route.name);
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
  }
}
</style>
