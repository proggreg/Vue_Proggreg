<template>
  <div style="width: fit-content" class="pa-0 ma-0">
    <BaseButton
      style="padding: 1em 4em;"
      class="ma-2"
      :to="tab.component"
      :key="tab.title"
      v-for="tab in tabs"
    >{{tab.title}}</BaseButton>
  </div>
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
      isMobile: mobileCheck,
    };
  },
};
</script>
<style lang="scss">
.tab {
  @media screen and (max-width: 600px) {
    width: 10px !important;
  }
}
</style>