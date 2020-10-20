<template>
  <v-card id="header" class="topbar primary--text">
    <v-layout style="justify-content: flex-end">
      <ThemeButtons />
    </v-layout>
    <v-row class="mb-4" align="center" justify="center">
      <h1>{{ title }}</h1>
    </v-row>
    <Tabs />
  </v-card>
</template>
<script>
import Tabs from "./TheTabs";
import ThemeButtons from "./TheThemeButtons";

export default {
  name: "Header",
  components: {
    Tabs,
    ThemeButtons,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  user-select: none;
}
</style>