<template>
  <v-card class="Header secondary">
    <v-toolbar class="myClass" extended elevation="20">
      <v-toolbar-title class="headerTitle">Prog:greg</v-toolbar-title>

      <template v-slot:extension>
        <Tabs />
      </template>
      <v-btn
        style="position: absolute; right: 2%"
        @click="$vuetify.theme.dark=!$vuetify.theme.dark"
        v-if="$vuetify.theme.dark"
      >Light Mode</v-btn>
      <v-btn
        style="position: absolute; right: 2%"
        @click="$vuetify.theme.dark=!$vuetify.theme.dark"
        v-else
      >Dark Mode</v-btn>
    </v-toolbar>
  </v-card>
</template>
<script>
import Tabs from "./Tabs";
export default {
  name: "Header",
  components: {
    Tabs
  },
  data: () => ({})
};
</script>
<style  lang="scss">
.Header {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .myClass {
    .v-toolbar__content {
      justify-content: center !important;
    }
  }

  .headerTitle {
    font-size: 2rem;
    cursor: default;
    user-select: none;
  }
}
</style>