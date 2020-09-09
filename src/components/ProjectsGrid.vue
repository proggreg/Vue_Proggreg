//TODO Add transition effects for boxes, short transition time as to be responsive and not annoying
<template>
  <v-container class="projectsGrid">
    <v-layout wrap align-center justify-center>
      <v-col cols="auto" align-self="center" v-for="project in projects" :key="project.title">
        <BaseCard class="primary" hover outlined ripple :to="project.href">
          <v-card-title class="secondary--text" v-text="project.title"></v-card-title>
          <v-row>
            <v-img
              contain
              class="align-center justify-center"
              width="200"
              height="200"
              :src="project.img"
            ></v-img>
          </v-row>
        </BaseCard>
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
import BaseCard from "./BaseCard";
export default {
  name: "ProjectsGrid",
  components: { BaseCard },
  data() {
    return {
      projects: [
        {
          title: "Snake",
          href: "/Snake",
          img: "snake_thumb.png",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss">
.projectsGrid {
  .card {
    .projectTitle {
      color: white;
      font-size: 1.5vmax;
    }
  }
}
</style>