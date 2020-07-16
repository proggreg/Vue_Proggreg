<template>
  <v-form @submit.prevent>
    <v-text-field v-model="name" placeholder="Name"></v-text-field>
    <v-text-field v-model="email" placeholder="Email"></v-text-field>
    <v-textarea class="text-center" v-model="message"></v-textarea>
    <v-btn
      class="mr-4 primary"
      @click="submit"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Send</v-btn>

    <p>{{name}} {{email}} {{message}}</p>
  </v-form>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      name: "",
      email: "",
      message: ""
    };
  }
};
</script>

// Add cache so form information is stored in local storage, this should prevent information being lost when tab switching
