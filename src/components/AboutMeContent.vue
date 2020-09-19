<template>
  <v-layout column class="primary--text">
    <h1 class="text-center">A little about me</h1>
    <p>Hi I'm Greg Field</p>

    <v-layout justify-center>
      <BaseButton @click="download($event)">Download CV</BaseButton>
    </v-layout>
  </v-layout>
</template>

<script>
import BaseButton from "./BaseButton";
import axios from "axios";

export default {
  name: "AboutMeContent",
  components: {
    BaseButton,
  },
  methods: {
    download(e) {
      e.preventDefault();
      axios
        .get("/get-file/CV")
        .then((res) => {
          var fileURL = window.URL.createObjectURL(new Blob([res.data]));

          var fileLink = document.createElement("a");

          fileLink.href = fileURL;

          fileLink.setAttribute("download", "GregFieldCV.pdf");

          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((err) => console.log(err));
    },
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