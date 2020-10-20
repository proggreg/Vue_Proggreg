/* eslint-disable */
<template >
  <v-app @preventScroll="preventScroll()" class="primary" id="app">
    <TheHeader title="Prog:greg" />
    <v-main class="background">
      <div id="model">
        <v-container class="pa-0 v-textarea--auto-grow fill-height" fluid>
          <v-layout justify-center align-center class="pa-2">
            <!-- content -->
            <router-view />
          </v-layout>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  font-family: "Exo 2", sans-serif;
  ::-webkit-scrollbar {
    display: none;
  }
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
</style>
