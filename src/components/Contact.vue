<template>
  <v-form id="contactForm" @submit.prevent>
    <v-text-field v-model="name" placeholder="Your Name"></v-text-field>
    <v-text-field v-model="email" placeholder="Your Email"></v-text-field>
    <v-textarea placeholder="Your Message" dense auto-grow class="text-center" v-model="message"></v-textarea>
    <v-btn
      class="mr-4 primary"
      @click="validateForm()"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Send</v-btn>
  </v-form>
  <!-- TODO Add validation to form -->
  <!-- TODO Implement email feature -->
</template>

<script>
export default {
  name: "ContactForm",
  methods: {
    validateForm() {
      console.log("validate");
    },
  },
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
};
</script>

// TODO Add cache so form information is stored in local storage, this should prevent information being lost when tab switching

<style lang="scss">
#contactForm {
  /* background-color: yellow; */
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  width: 60%;
  margin: 0 auto;
}
</style>
