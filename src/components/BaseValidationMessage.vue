<template>
  <v-fade-transition>
    <v-card-text :class="['pa-0', 'valMsg', color]">{{message}}</v-card-text>
  </v-fade-transition>
</template>
<script>
export default {
  name: "BaseValidationMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
    color: {
      default: "red--text",
    },
  },
};
</script>
<style scoped>
.valMsg {
  min-height: 16px;
}
</style>