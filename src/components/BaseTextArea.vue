<template>
  <v-textarea
    outlined
    @input="onInput"
    placeholder="Message"
    auto-grow
    v-model="message"
    width="100"
  ></v-textarea>
</template>

<script>
export default {
  name: "BaseTextArea",
  methods: {
    onInput: function ($event) {
      this.$emit("input", $event);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .v-input__control {
  textarea {
    color: var(--v-primary-base);
  }
  textarea::placeholder {
    color: var(--v-primary-base);
  }
  fieldset {
    border-color: var(--v-primary-base);
    border-width: 2px;
  }
}
</style>