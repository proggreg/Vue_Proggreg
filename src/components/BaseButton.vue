<template>
  <v-btn class="rounded-pill" :color="color" @click="click" :to="to">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    to: {
      type: String,
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
