/* eslint-disable */
<template >
  <v-app class="primary" id="app">
    <Header />
    <v-main>
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-card width="80%" min-height="500px" class="pa-12">
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
    Header
  },
  mounted() {}
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
</style>
