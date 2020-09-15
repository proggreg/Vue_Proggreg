<template>
  <v-conainer>
    <BaseButton class="ma-4" :to="tab.component" :key="tab.title" v-for="tab in tabs">{{tab.title}}</BaseButton>
  </v-conainer>
  <!-- <v-tabs v-model="tabs.title" class="tabs rounded-pill ma-4" fixed-tabs>
    <v-tab
      class="tab secondary primary--text rounded-pill"
      icons-and-text="true"
      :to="tab.component"
      :key="tab.title"
      v-for="tab in tabs"
      style="border: none;"
    >
      {{tab.title}}
      <v-icon class="primary--text">{{tab.icon}}</v-icon>
    </v-tab>
  </v-tabs>-->
</template>
<style scoped>
</style>
<script>
import BaseButton from "./BaseButton";
/* eslint-disable */
export default {
  name: "Tabs",
  components: {
    BaseButton,
  },
  data() {
    return {
      tabs: [
        {
          title: "Projects",
          icon: "mdi-code-braces",
          component: "Projects",
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
      isMobile: mobileCheck,
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