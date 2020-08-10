<template>
  <div class="primary--text">
    <h1 class="text-center">A little about me</h1>
    <p>
      My name is Greg Field, I am a Software Developer at working at AuraQ in Malvern, UK.
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
      <br />I am currently tinkering around with a Raspberry Pi and automating some of my devices using the Home Assistant OS.
    </p>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  data() {
    return {
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
p {
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>