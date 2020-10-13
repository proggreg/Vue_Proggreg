<template>
  <v-card style="display: flex">
    <v-tabs
      v-for="tab in tabs"
      :key="tab.title"
      background-color="topbar"
      icons-and-text
      grow
    >
      <v-tab :href="tab.component">
        {{ tab.title }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [
        {
          title: "Projects",
          icon: "mdi-code-braces",
          component: "/",
        },
        {
          title: "About Me",
          icon: "mdi-account-circle",
          component: "/AboutMe",
        },
        {
          title: "Contact",
          icon: "mdi-at",
          component: "/Contact",
        },
      ],
    };
  },
};
</script>

<style >
.v-tabs-slider-wrapper {
  display: none;
}
</style>
