<template>
  <v-card class="Header secondary">
    <v-toolbar class="myClass" extended elevation="20">
      <v-toolbar-title class="headerTitle font-weight-bold font">Prog:greg</v-toolbar-title>

      <template v-slot:extension>
        <Tabs />
      </template>
      <v-btn
        class="primary"
        style="position: absolute; right: 2%; font-size: 0.5em; padding: 5px"
        @click="godark()"
        v-if="$vuetify.theme.dark"
      >Light Mode</v-btn>
      <v-btn
        class="primary"
        style="position: absolute; right: 2%;font-size: 0.5em; padding: 5px"
        @click="godark()"
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

  .myClass {
    .v-toolbar__content {
      justify-content: center !important;
    }
  }

  .headerTitle {
    font-size: 2.5rem;
    cursor: default;
    user-select: none;
  }
}
</style>