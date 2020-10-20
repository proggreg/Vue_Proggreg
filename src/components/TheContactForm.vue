<template>
  <v-form id="contactForm" @submit.prevent>
    <v-layout column class justify-center align-center>
      <v-row>
        <v-col>
          <BaseValidationMessage :message="nameError" />
          <BaseInput v-model="name" placeholder="Name" />
        </v-col>
        <v-col>
          <BaseValidationMessage :message="emailError" />
          <BaseInput v-model="email" placeholder="Email" />
        </v-col>
      </v-row>
      <v-row style="width: 100%">
        <BaseValidationMessage :message="subjectError" />
        <BaseInput v-model="subject" id="subjectField" placeholder="Subject" />
      </v-row>
      <v-row style="width: 100%">
        <BaseValidationMessage :message="messageError" />
        <BaseTextArea v-model="message" id="messageBox" placeholder="Message">
        </BaseTextArea>
      </v-row>
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
import BaseTextArea from "./BaseTextArea";
import BaseButton from "./BaseButton";
import BaseValidationMessage from "./BaseValidationMessage";
import BaseSnackBar from "./BaseSnackbar";

export default {
  name: "TheContactForm",
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton,
    BaseValidationMessage,
    BaseSnackBar,
  },
  methods: {
    validateForm() {
      let valid = true;
      if (!this.name) {
        this.nameError = "Name is required";
        valid = false;
      } else {
        this.nameError = "";
      }
      if (!this.email) {
        this.emailError = "Email is required";
        valid = false;
      } else {
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            this.email
          )
        ) {
          this.emailError = "";
        } else {
          this.emailError = "Incorrect email format";
          valid = false;
        }
      }
      if (!this.subject) {
        this.subjectError = "Subject is required";
        valid = false;
      } else {
        this.subjectError = "";
      }
      if (!this.message) {
        this.messageError = "Message is required";
        valid = false;
      } else {
        this.messageError = "";
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
      nameError: "",
      messageError: "",
      subjectError: "",
      emailError: "",
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
<style scoped lang="scss">
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
