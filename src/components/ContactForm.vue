<template>
  <v-form id="contactForm" @submit.prevent>
    <v-layout column class justify-center align-center>
      <v-row>
        <v-col>
          <BaseValidationMessage :message="nameerror" />
          <BaseInput v-model="name" placeholder="Name" />
        </v-col>
        <v-col>
          <BaseValidationMessage :message="emailerror" />
          <BaseInput v-model="email" placeholder="Email" />
        </v-col>
      </v-row>
      <BaseValidationMessage :message="subjecterror" />
      <BaseInput v-model="subject" id="subjectField" placeholder="Subject" />
      <BaseValidationMessage :message="messageerror" />
      <v-textarea outlined class="messageBox" placeholder="Message" auto-grow v-model="message"></v-textarea>
      <v-layout justify-center align-center>
        <BaseButton @click="validateForm()">Send</BaseButton>
      </v-layout>
      <BaseSnackBar
        :show="this.$store.state.Contact.sent"
        message="Thanks for your message! I'll get back to you soon. 👍 😀"
      ></BaseSnackBar>
    </v-layout>
  </v-form>
</template>

<script>
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import BaseValidationMessage from "./BaseValidationMessage";
import BaseSnackBar from "./BaseSnackbar";

export default {
  name: "ContactForm",
  components: {
    BaseInput,
    BaseButton,
    BaseValidationMessage,
    BaseSnackBar,
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
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            this.email
          )
        ) {
          this.emailerror = "";
        } else {
          this.emailerror = "Invalid Email";
          valid = false;
        }
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
      this.$store.dispatch("sendEmail");
    },
  },
  data() {
    return {
      snackBar: false,
      nameerror: "",
      messageerror: "",
      subjecterror: "",
      emailerror: "",
    };
  },
  computed: {
    name: {
      get() {
        return this.$store.state.Contact.contactInfo.name;
      },
      set(value) {
        this.$store.commit("updateName", value);
      },
    },
    email: {
      get() {
        return this.$store.state.Contact.contactInfo.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      },
    },
    subject: {
      get() {
        return this.$store.state.Contact.contactInfo.subject;
      },
      set(value) {
        this.$store.commit("updateSubject", value);
      },
    },
    message: {
      get() {
        return this.$store.state.Contact.contactInfo.message;
      },
      set(value) {
        this.$store.commit("updateMessage", value);
      },
    },
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
}
</style>
