<template>
  <v-card class="Header">
    <v-toolbar color="secondary" extended elevation="20">
      <v-layout justify-center>
        <v-toolbar-title
          style="font-size: 2rem; user-select: none;"
          class="font-weight-bold absolute-center primary--text"
        >Prog:greg</v-toolbar-title>
      </v-layout>
      <v-layout style="right: 20px ;position: absolute;">
        <BaseButton
          v-for="theme in Themes"
          :key="theme.name"
          :color="theme.name"
          @click="changeTheme(theme.color)"
        ></BaseButton>
      </v-layout>
      <!-- Tabs -->
      <template v-slot:extension>
        <Tabs />
      </template>
    </v-toolbar>
  </v-card>
</template>
<script>
/*eslint-disable*/
import BaseButton from "./BaseButton";
import Tabs from "./Tabs";

import BlueTheme from "../plugins/themes/Blue";
import RedTheme from "../plugins/themes/Red";
import OrangeTheme from "../plugins/themes/Orange";
import YellowTheme from "../plugins/themes/Yellow";
import GreenTheme from "../plugins/themes/Green";

export default {
  name: "Header",
  components: {
    Tabs,
    BaseButton,
  },
  created() {
    let cachedTheme = JSON.parse(localStorage.getItem("CurrentTheme"));
    this.$vuetify.theme.themes.light = cachedTheme;
  },
  methods: {
    changeTheme(newTheme) {
      // Set new theme
      this.$vuetify.theme.themes.light = newTheme;
      // Store new theme in local storage
      localStorage.setItem("CurrentTheme", JSON.stringify(newTheme));
    },
  },
  data: () => ({
    Themes: [
      { color: RedTheme, name: "red" },
      { color: BlueTheme, name: "blue" },
      { color: OrangeTheme, name: "orange" },
      { color: YellowTheme, name: "yellow" },
      { color: GreenTheme, name: "green" },
    ],
  }),
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
}
</style>