<template>
  <v-text-field
    class="primary--text"
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

<style lang="scss" >
.v-text-field--outlined fieldset {
  border-color: var(--v-primary-base);
  border-width: 2px;
}

.v-text-field {
  input {
    color: var(--v-primary-base) !important;
  }
}

.v-text-field::placeholder {
  input {
    color: var(--v-primary-base) !important;
  }
}
</style>