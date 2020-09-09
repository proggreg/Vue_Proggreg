<template>
  <v-btn class="rounded-pill" :color="color" @click="click">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "BaseButton",
  props: ["color"],
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>
