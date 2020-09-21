<template>
  <v-card class="topbar secondary primary--text">
    <v-col justify-center>
      <!-- Show Current Weather -->
      <Weather></Weather>
    </v-col>
    <v-row class="mb-4" align="center" justify="center">
      <h1 style="user-select: none;">{{title}}</h1>
    </v-row>
    <v-row align="center" justify="center">
      <Tabs />
    </v-row>
  </v-card>
</template>
<script>
import Tabs from "./Tabs";
import Weather from "./Weather";

export default {
  name: "Header",
  components: {
    Tabs,
    Weather,
  },
  props: ["title"],
};
</script>
<style  lang="scss">
.Header {
  position: sticky;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .headerTitle {
    font-size: 2.5rem;
    cursor: default;
    user-select: none;
  }
}
</style>