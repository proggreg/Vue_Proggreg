<template>
  <!-- TODO Make Tabs responsive (contact tab is hidden when on iphone x/xs) -->
  <!-- TODO Project Tab becomes unhighlight/active when on a project page (snake) -->
  <v-tabs v-model="tabs.title" class="tabs" fixed-tabs>
    <v-tab class="tab primary--text" :to="tab.component" :key="tab.title" v-for="tab in tabs">
      <v-icon class="primary--text">{{tab.icon}}</v-icon>
      <v-card-text
        class="text--accent-3"
        v-if="isMobile == false"
        style="width:max-content"
      >{{tab.title}}</v-card-text>
    </v-tab>
  </v-tabs>
</template>
<style scoped>
</style>
<script>
/* eslint-disable */
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [
        {
          title: "Projects",
          icon: "mdi-code-braces",
          component: "/ProjectsGrid",
        },
        {
          title: "AboutMe",
          icon: "mdi-account-circle",
          component: "/AboutMe",
        },
        {
          title: "Contact",
          icon: "mdi-at",
          component: "/Contact",
        },
      ],
      isMobile: mobilecheck(),
    };
  },
};
</script>
<style lang="scss">
.tabs {
  .tab {
    @media screen and (max-width: 600px) {
      width: 10px !important;
    }
  }
}
</style>