/* eslint-disable */
<template >
  <v-app class="primary" id="app">
    <Header />
    <v-main class>
      <div style="height: 100px">
        <ProjectsGrid />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import ProjectsGrid from "./components/ProjectsGrid";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";

export default {
  components: {
    Header,
    Tabs,
    ProjectsGrid,
    AboutMe,
    Contact
  }
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
