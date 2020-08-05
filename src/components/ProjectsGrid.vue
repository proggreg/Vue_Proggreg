//TODO Add transition effects for boxes, short transition time as to be responsive and not annoying
<template>
  <v-row class="projectsGrid">
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-card
          class="ma-4 pa-12 card primary"
          hover
          v-for="project in projects"
          :key="project.title"
          outlined
          ripple
          :to="project.href"
        >
          <v-card-text class="projectTitle secondary--text" v-text="project.title"></v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "ProjectsGrid",
  components: {},
  data() {
    return {
      projects: [
        {
          title: "Snake",
          href: "/Snake",
        },
        // ,
        // {
        //   title: "TwitterBot",
        //   href: "/TwitterBot",
        // },
        // {
        //   title: "Synth",
        //   href: "/Synth",
        // },
      ],
    };
  },
  methods: {
    makeCanvas() {
      document.querySelector("");
    },
  },
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