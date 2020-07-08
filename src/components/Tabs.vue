<template>
  <v-tabs v-model="tabs.title" class="projects" fixed-tabs>
    <v-tab :to="tab.component" :key="tab.title" v-for="tab in tabs">
      <v-icon>{{tab.icon}}</v-icon>
      {{tab.title}}
    </v-tab>
  </v-tabs>
</template>
<style scoped>
</style>
<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [
        {
          title: "Projects",
          icon: "mdi-code-braces",
          component: "/ProjectsGrid"
        },
        {
          title: "AboutMe",
          icon: "mdi-account-circle",
          component: "/AboutMe"
        },
        {
          title: "Contact",
          icon: "mdi-at",
          component: "/Contact"
        }
      ]
    };
  }
};
</script>
<style >
</style>