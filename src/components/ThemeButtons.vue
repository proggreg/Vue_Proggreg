<template>
  <v-row>
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
</template>

<script>
import BaseButton from "./BaseButton";

import LightTheme from "../plugins/themes/Light";
import DarkTheme from "../plugins/themes/Dark";
import BlueTheme from "../plugins/themes/Blue";
import RedTheme from "../plugins/themes/Red";
import OrangeTheme from "../plugins/themes/Orange";
import YellowTheme from "../plugins/themes/Yellow";
import GreenTheme from "../plugins/themes/Green";
export default {
  name: "ThemeButtons",
  components: {
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
  },
};
</script>

<style>
</style>