<template>
  <v-text-field
    content-class="primary--text"
    input=""
    @input="onInput"
    :value="value"
    :placeholder="placeholder"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    placeholder: {
      type: String,
    },
    value: {
      default: null,
    },
  },
  // computed: {
  //   onInput: function ($event) {
  //     this.$emit("input", $event);
  //   },
  // },
  methods: {
    onInput: function ($event) {
      this.$emit("input", $event);
    },
    // filters: {
    //   trim: function (value) {
    //     return value.trim();
    //   },
    // },
  },
};
</script>

<style scoped lang="scss">

::v-deep .v-input__control {
  input {
    color: var(--v-primary-base);
  }
   input::placeholder {
    color: var(--v-primary-base);
    
  }
  fieldset {
    border-color: var(--v-primary-base);
    border-width: 2px;
  }
}
</style>