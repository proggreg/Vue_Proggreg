<template>
  <v-row>
    <v-col>
      <Snake />
    </v-col>
    <!-- <v-col cols="12">
      <v-row align="center" justify="center">
        <v-card
          class="ma-4 pa-8 card primary"
          hover
          v-for="project in 2"
          :key="project"
          outlined
          ripple
          min-width="20%"
        >{{project}}</v-card>
      </v-row>
    </v-col>-->
  </v-row>
</template>
<script>
import Snake from "../Projects/Snake/SnakeGame";
export default {
  name: "ProjectsGrid",
  components: {
    Snake
  },
  data() {
    return {
      projects: [
        {
          title: "Snake",
          href: "/ProjectsGrid"
        }
      ]
    };
  }
};
</script>
<style >
.card {
  text-align: center;
}

/* .itsactive {
  background-color: pink;
} */
</style>