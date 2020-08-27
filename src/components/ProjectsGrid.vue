//TODO Add transition effects for boxes, short transition time as to be responsive and not annoying
<template>
  <v-row class="projectsGrid">
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-layout align-center justify-center>
          <v-col align-self="center" v-for="project in projects" :key="project.title">
            <v-row align="center" justify="center">
              <v-card
                width="400"
                class="pa-0 ma-0 card primary rounded-xl"
                hover
                outlined
                ripple
                :to="project.href"
                style="margin: 0 !important"
              >
                <v-row>
                  <v-img
                    contain
                    class="align-center justify-center"
                    width="200"
                    height="200"
                    :src="project.img"
                  ></v-img>
                  <v-card-title
                    class="projectTitle secondary--text text-center"
                    v-text="project.title"
                  ></v-card-title>
                </v-row>
              </v-card>
            </v-row>
          </v-col>
        </v-layout>
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
          img: "snake_thumb.png",
        },

        // {
        //   title: "Synth",
        //   href: "/Synth",
        //   img: "tmp_snyth.jpeg",
        // },
        // {
        //   title: "Spotify",
        //   href: "/Spotify",
        //   img: "tmp_spotify.png",
        // },
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