<template>
  <v-form id="contactForm" @submit.prevent>
    <v-layout column class justify-center align-center>
      <v-row>
        <v-col>
          <v-container class="pa-0" fluid>
            <v-fade-transition>
              <v-card-text class="pa-0" v-if="nameerror" v-model="nameerror">{{nameerror}}</v-card-text>
            </v-fade-transition>
          </v-container>
          <BaseInput @change="name = $event" id="nameField" placeholder="Name" />
        </v-col>
        <v-col>
          <v-container class="pa-0">
            <v-fade-transition>
              <v-card-text class="pa-0" v-if="emailerror" v-model="emailerror">{{emailerror}}</v-card-text>
            </v-fade-transition>
          </v-container>
          <BaseInput @change="email = $event" id="emailField" placeholder="Email" />
        </v-col>
      </v-row>
      <v-row style="width: 100%;">
        <v-fade-transition>
          <v-card-text class="pa-0" v-if="subjecterror" v-model="subjecterror">{{subjecterror}}</v-card-text>
        </v-fade-transition>
        <BaseInput @change="subject = $event" id="subjectField" placeholder="Subject" />
      </v-row>
      <v-row style="width: 100%;">
        <v-col>
          <v-container class="pa-0">
            <v-fade-transition>
              <v-card-text class="pa-0" v-if="messageerror" v-model="messageerror">{{messageerror}}</v-card-text>
            </v-fade-transition>
          </v-container>
        </v-col>
      </v-row>
      <v-row style="width: 100%;">
        <v-textarea outlined class="messageBox" placeholder="Message" auto-grow v-model="message"></v-textarea>
        <v-layout justify-center align-center>
          <BaseButton @click="validateForm()">Send</BaseButton>
          
        </v-layout>
      </v-row>
    </v-layout>
  </v-form>
</template>

<script>
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";

const axios = require("axios");
const url = "http://" + process.env.VUE_APP_API_URL + "/email/send";

export default {
  name: "ContactForm",
  components: {
    BaseInput,
    BaseButton,
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
      messageerror: "",
      subjecterror: "",
      emailerror: "",
    };
  },
};
</script>

// TODO Add cache so form information is stored in local storage, this should prevent information being lost when tab switching

<style lang="scss">
#contactForm {
  .v-input {
    width: 100%;
    @media screen and (max-width: 600px) {
      width: 100% !important;
    }
  }
  @media screen and (max-width: 600px) {
    padding: 5% !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0;
  }
}
.container {
  .v-text-field > .v-input__control > .v-input__slot::before {
    border-color: var(--v-primary-base);
  }
}
#contactForm {
  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  .messageBox {
    textarea {
      color: var(--v-secondary-base);
    }
  }

  input::placeholder {
    opacity: 0.8;
    color: var(--v-secondary-base);
  }

  textarea::placeholder {
    opacity: 0.8;
    color: var(--v-secondary-base);
  }
}
</style>
