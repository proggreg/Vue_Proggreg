<template>
  <v-layout justify-center align-center>
    <BaseCard style="width:fit-content; height: 90%;">
      <AboutMeContent></AboutMeContent>
    </BaseCard>
  </v-layout>
</template>

<script>
import BaseCard from "../components/BaseCard";
import AboutMeContent from "../components/AboutMeContent";

export default {
  name: "AboutMeView",
  components: {
    BaseCard,
    AboutMeContent,
  },
  data() {
    return {
      content: AboutMeContent,
    };
  },
};
</script>

<style scoped lang="scss">
</style>