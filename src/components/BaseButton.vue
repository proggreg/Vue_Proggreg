<template>
  <v-btn class="rounded-pill primary--text" :color="color" @click="click" :to="to">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    color: {
      type: String,
      default: "secondary",
    },
    to: {
      type: String,
    },
  },
  methods: {
    click(e) {
      this.$emit("click", e);
    },
  },
};
</script>
