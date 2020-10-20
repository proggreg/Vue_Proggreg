<template>
  <v-card style="display: flex">
    <v-tabs
      v-for="tab in tabs"
      :key="tab.title"
      background-color="topbar"
      icons-and-text
      grow
    >
      <v-tab class="topbar primary--text" :to="tab.component">
        {{ tab.title }}
        <v-icon class="primary--text">{{ tab.icon }}</v-icon>
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

<style scoped lang="scss" >
::v-deep .v-tabs-slider-wrapper {
  display: none;
}
</style>
