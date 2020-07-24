//TODO Add transition effects for boxes, short transition time as to be responsive and not annoying
<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-card
          class="ma-4 pa-12 card primary"
          hover
          v-for="project in projects"
          :key="project.title"
          outlined
          ripple
          min-width="20%"
          min-height="150px"
          :to="project.href"
        >{{project.title}}</v-card>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
// eslint-disable-next-line vue/no-use-v-if-with-v-for

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
        {
          title: "TwitterBot",
          href: "/TwitterBot",
        },
        {
          title: "Synth",
          href: "/Synth",
        },
      ],
    };
  },
};
</script>
<style >
</style>