<template>
  <v-card class="topbar secondary primary--text">
    <v-row>
      <v-col justify-center>
        <!-- Show Current Weather -->
        <Weather></Weather>
      </v-col>
      <v-col justify-end>
        <v-row justify-end>
          <!-- Choose Theme -->
          <h3 style="margin-right: 20px;">Pick a theme</h3>
          <BaseButton
            v-for="theme in Themes"
            :key="theme.name"
            :color="theme.name"
            @click="changeTheme(theme.color)"
          ></BaseButton>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mb-4" align="center" justify="center">
      <h1 style="user-select: none;">Prog:greg</h1>
    </v-row>

    <v-row align="center" justify="center">
      <Tabs />
    </v-row>
  </v-card>
</template>
<script>
/*eslint-disable*/
import BaseButton from "./BaseButton";
import Tabs from "./Tabs";
import Weather from "./Weather";

import LightTheme from "../plugins/themes/Light";
import DarkTheme from "../plugins/themes/Dark";
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
    Weather,
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
      { color: LightTheme, name: "white" },
      { color: DarkTheme, name: "black" },
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