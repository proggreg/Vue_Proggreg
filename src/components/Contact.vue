<template>
  <v-form id="contactForm" @submit.prevent>
    <v-card-text v-model="nameerror">{{nameerror}}</v-card-text>
    <v-text-field class="yourname" v-model="name" placeholder="Your Name"></v-text-field>
    <v-card-text v-model="emailerror">{{emailerror}}</v-card-text>
    <v-text-field v-model="email" placeholder="Your Email"></v-text-field>
    <v-card-text v-model="subjecterror">{{subjecterror}}</v-card-text>
    <v-text-field v-model="subject" placeholder="Subject"></v-text-field>
    <v-card-text v-model="messageerror">{{messageerror}}</v-card-text>
    <v-textarea
      color="primary"
      placeholder="Your Message"
      dense
      auto-grow
      class="myClass text-center"
      v-model="message"
    ></v-textarea>
    <v-btn
      class="mr-4 primary"
      @click="validateForm()"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Send</v-btn>
  </v-form>
</template>

<script>
const axios = require("axios");
const url = "http://" + process.env.VUE_APP_API_URL + "/email/send";

export default {
  name: "ContactForm",
  methods: {
    validateForm() {
      let valid = true;
      if (!this.name) {
        this.nameerror = "Name is required";
        valid = false;
      } else {
        this.nameerror = "";
      }
      if (!this.email) {
        this.emailerror = "Email is required";
        valid = false;
      } else {
        this.emailerror = "";
      }
      if (!this.subject) {
        this.subjecterror = "Subject is required";
        valid = false;
      } else {
        this.subjecterror = "";
      }
      if (!this.message) {
        this.messageerror = "Message is required";
        valid = false;
      } else {
        this.messageerror = "";
      }
      if (!valid) {
        return;
      } else {
        this.sendMail();
      }
    },
    sendMail() {
      let emailOptions = {
        subject: this.subject,
        msg: this.message,
        from: this.name,
        email: this.email,
      };
      axios
        .post(url, emailOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      nameerror: "",
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

  input::placeholder {
    opacity: 0.8;
  }

  textarea::placeholder {
    opacity: 0.8;
  }

  width: 60%;
  margin: 0 auto;
}
</style>
