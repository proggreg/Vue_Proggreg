<template>
  <v-layout justify-center align-center>
    <BaseCard style="width: fit-content;">
      <v-layout justify-center align-center>
        <ContactForm></ContactForm>
      </v-layout>
    </BaseCard>
  </v-layout>
</template>

<script>
import BaseCard from "../components/BaseCard";
import ContactForm from "../components/ContactForm.vue";
export default {
  name: "ContactView",
  components: {
    BaseCard,
    ContactForm,
  },
  data() {
    return {
      form: ContactForm,
    };
  },
};
</script>

<style>
</style>