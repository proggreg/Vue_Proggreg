<template>
  <v-btn
    class="rounded-pill primary--text"
    :color="color"
    @click="click"
    :min-width="width"
    :to="to"
  >
    <div class="title">
      {{ title }}
    </div>
    <slot></slot>
    <v-icon v-if="icon !== undefined" style="margin-left: 5px">{{
      icon
    }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    width: {
      type: String,
    },
    title: {
      type: [String, Number],
    },
    icon: {
      type: String,
    },
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
<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
