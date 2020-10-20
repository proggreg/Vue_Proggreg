<template>
  <v-layout justify-center align-center>
    <BaseCard style="width: fit-content">
      <v-layout justify-center align-center>
        <ContactForm></ContactForm>
      </v-layout>
    </BaseCard>
  </v-layout>
</template>

<script>
import BaseCard from "../components/BaseCard";
import ContactForm from "../components/TheContactForm.vue";
export default {
  name: "ContactView",
  components: {
    BaseCard,
    ContactForm,
  },
};
</script>
<style scoped lang="scss">
</style>
