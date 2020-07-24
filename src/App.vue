/* eslint-disable */
<template >
  <v-app class="primary" id="app">
    <Header />
    <v-main class="primary" style="display: flex; justify-content: center; align-content: center">
      <v-container style="display:flex; height: 100%;" fluid>
        <v-layout justify-center align-center>
          <v-card height="90%" id="contentContainer" width="80%" min-height="500px" class="pa-12">
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
