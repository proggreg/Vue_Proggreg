<template>
  <v-tabs v-model="tabs.title" class="projects" fixed-tabs>
    <v-tab :key="tab.title" v-for="tab in tabs">
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
          icon: "mdi-code-braces"
        },
        {
          title: "AboutMe",
          icon: "mdi-account-circle"
        },
        {
          title: "Contact",
          icon: "mdi-at"
        }
      ]
    };
  }
};
</script>
<style >
</style>