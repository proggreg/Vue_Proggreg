<template>
  <v-form id="contactForm" @submit.prevent>
    <v-layout column class="text--red pa-0" style="color: red">
      <v-container class="pa-0">
        <v-fade-transition>
          <v-card-text class="pa-0" v-if="nameerror" v-model="nameerror">{{nameerror}}</v-card-text>
        </v-fade-transition>
      </v-container>
      <v-text-field class="myClass" v-model="name" placeholder="Your Name"></v-text-field>
      <v-container class="pa-0">
        <v-fade-transition>
          <v-card-text class="pa-0" v-if="emailerror" v-model="emailerror">{{emailerror}}</v-card-text>
        </v-fade-transition>
      </v-container>
      <v-text-field class="primary--text" v-model="email" placeholder="Your Email"></v-text-field>
      <v-container class="pa-0">
        <v-fade-transition>
          <v-card-text class="pa-0" v-if="subjecterror" v-model="subjecterror">{{subjecterror}}</v-card-text>
        </v-fade-transition>
      </v-container>
      <v-text-field class="pa-0" v-model="subject" placeholder="Subject"></v-text-field>
      <v-container class="pa-0">
        <v-fade-transition>
          <v-card-text class="pa-0" v-if="messageerror" v-model="messageerror">{{messageerror}}</v-card-text>
        </v-fade-transition>
      </v-container>

      <v-textarea
        style="margin-bottom:100px"
        class="messageBox"
        placeholder="Your Message"
        auto-grow
        v-model="message"
      ></v-textarea>

      <v-btn style="top: -100px" class="primary secondary--text" @click="validateForm()">Send</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
const axios = require("axios");
const url = "http://" + process.env.VUE_APP_API_URL + "/email/send";

export default {
  name: "ContactForm",
  mounted() {
    console.log(this.$vuetify.theme.themes);
  },
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
.container {
  padding: 0;
}
#contactForm {
  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  .v-text-field {
    input {
      color: var(--v-primary-base);
    }
  }

  .messageBox {
    textarea {
      color: var(--v-primary-base);
    }
  }

  input::placeholder {
    opacity: 0.8;
    color: var(--v-primary-base);
  }

  textarea::placeholder {
    opacity: 0.8;
    color: var(--v-primary-base);
  }

  width: 50%;
  margin: 0 auto;
}
</style>
