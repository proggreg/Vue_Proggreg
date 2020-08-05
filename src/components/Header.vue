<template>
  <v-card class="Header">
    <v-toolbar color="secondary" extended elevation="20">
      <v-layout>
        <v-toolbar-title
          style="margin: 0 auto; font-size: 2em; position: relative; color: var(--v-primary-base);"
          class="font-weight-bold absolute-center primary--text"
        >Prog:greg</v-toolbar-title>

        <!-- TODO Make Button responsive -->

        <!-- Dark Mode Buttons -->

        <v-btn
          class="primary darkModeBtn"
          style
          v-if="$vuetify.theme.dark"
          @click="godark()"
        >Light Mode</v-btn>
        <v-btn class="primary darkModeBtn" @click="godark()" v-else>Dark Mode</v-btn>
      </v-layout>

      <!-- Tabs -->
      <template v-slot:extension>
        <Tabs />
      </template>
    </v-toolbar>
  </v-card>
</template>
<script>
import Tabs from "./Tabs";
export default {
  name: "Header",
  components: {
    Tabs,
  },
  methods: {
    godark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  data: () => ({}),
};
</script>
<style  lang="scss">
.Header {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .headerTitle {
    font-size: 2.5rem;
    cursor: default;
    user-select: none;
  }

  .darkModeBtn {
    position: absolute;
    right: 2%;
    top: 30%;

    @media screen and (max-width: 600px) {
      padding: 1% !important;
    }
  }
}
</style>