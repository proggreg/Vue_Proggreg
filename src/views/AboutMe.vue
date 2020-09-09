<template>
  <BaseCard>
    <AboutMeContent></AboutMeContent>
  </BaseCard>
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

<style>
</style>