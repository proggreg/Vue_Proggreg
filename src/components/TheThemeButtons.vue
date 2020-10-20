<template>
  <div style="margin: 20px 20px 0 0; display: flex">
    <!-- Choose Theme -->
    <h3 style="margin-right: 5px">Pick a theme</h3>

    <BaseButton
      style="margin: 0 10px 0 0"
      width="1"
      v-for="theme in themes"
      :key="theme.name"
      :color="theme.name"
      @click="changeTheme(theme.color)"
    ></BaseButton>
  </div>
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
  data() {
    return {
      themes: [
        { color: LightTheme, name: "white" },
        { color: DarkTheme, name: "black" },
        { color: RedTheme, name: "red" },
        { color: BlueTheme, name: "blue" },
        { color: OrangeTheme, name: "orange" },
        { color: YellowTheme, name: "yellow" },
        { color: GreenTheme, name: "green" },
      ],
    };
  },
  created() {
    let cachedTheme = JSON.parse(localStorage.getItem("CurrentTheme"));
    if (!cachedTheme) {
      this.$vuetify.theme.themes.light = LightTheme;
    } else {
      this.$vuetify.theme.themes.light = cachedTheme;
    }
  },
  methods: {
    changeTheme(newTheme) {
      // Set new theme
      this.$vuetify.theme.themes.light = newTheme;
      // Store new theme in local storage
      localStorage.setItem("CurrentTheme", JSON.stringify(newTheme));
    },
  },
};
</script>

<style scoped lang="scss">
</style>