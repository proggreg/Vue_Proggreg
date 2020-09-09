<template>
  <BaseCard class="full-width">
    <ContactForm></ContactForm>
  </BaseCard>
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