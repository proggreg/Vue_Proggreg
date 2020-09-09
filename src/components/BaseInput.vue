<template>
  <v-text-field @input="input" :placeholder="placeholder" outlined></v-text-field>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["placeholder", "text"],
  methods: {
    input(event) {
      this.$emit("change", event);
    },
  },
};
</script>

<style lang="scss" >
.v-text-field--outlined fieldset {
  border-color: var(--v-secondary-base);
  border-width: 2px;
}

.v-input {
  color: red !important;
}

.v-text-field {
  input {
    color: var(--v-secondary-base);
  }
}
</style>