<template>
  <v-card id="aboutMeCard" class="secondary primary--text lighten-2 pt-2 pb-4">
    <v-layout column v-if="complete">
      <h1 class="text-center">A little about me</h1>
      <p>
        My name is Greg Field, I am a Software Developer working at AuraQ in Malvern, UK.
        <br />I have completed a BSc.in Audio & Music Technology at the University of the West of England in Bristol.
        <br />I have also completed a MSc. in Computer Sceience at the University of Birmingham.
        <br />
      </p>
      <h2 class="text-center">Techical Skills</h2>

      <!-- TODO better names for Tech Skills -->
      <v-layout justify-center>
        <v-list class="text-center" dense style="background:none">
          <v-list-item v-for="skill in skills" :key="skill.title">
            <v-list-item-title class="primary--text">
              <b>{{skill.title}}:</b>
              {{skill.skill}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-layout>

      <h2 class="text-center">Hobbies & Interests</h2>
      <p>
        I enjoy tech and music.
        I am currently tinkering around with a Raspberry Pi and automating some of my devices using the Home Assistant OS.
      </p>
    </v-layout>
    <v-layout align-center justify-center fill-height v-else>
      <h1>In Progress</h1>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "AboutMe",
  data() {
    return {
      complete: false,
      skills: [
        {
          title: "Languages",
          skill: "Java, Javascript, Python",
        },
        {
          title: "Database",
          skill: "Postgres, MongoDB",
        },
        {
          title: "Front-end",
          skill: "Vue Js,HTML,CSS,SCSS",
        },
        {
          title: "Project Mangemnt",
          skill: "GIT, Trello",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#aboutMeCard {
  margin: 1% 20%;
}
p {
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>