<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <h2 style="" class="secondary--text">Score {{ score }}</h2>
      <BaseButton title="X" :style="closeBtnStyle" @click="close"></BaseButton>
    </div>
    <div style="width: 201px; height: 201px" class="border">
      <canvas width="200" height="200" id="canvas" />
    </div>
    <div style="height: 60px; width: 100%">
      <BaseButton
        style="width: 50%; margin: 5px 50px"
        @click="start()"
        v-if="this.controlMessage === 'Start'"
        >{{ controlMessage }}</BaseButton
      >
    </div>
  </div>
</template>

<script>
import BaseButton from "../../components/BaseButton";
export default {
  name: "SnakeCanvas",
  components: {
    BaseButton,
  },
  props: {
    score: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      controlMessage: "Start",
      closeBtnStyle: {
        minWidth: "0px",
        width: "25px",
        position: "relative",
        height: "25px",
        padding: "0",
        margin: "auto 0 auto auto",
        display: "flex",
      },
    };
  },
  methods: {
    start() {
      this.controlMessage = "";
      this.$emit("startGame");
      this.$store.commit("updateGameState", "running");
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.touchAction = "none";
  },
  destroyed() {
    document.documentElement.style.overflowY = "";
    document.documentElement.style.touchAction = "";
  },
};
</script>

<style scoped lang="scss">
#canvas {
  background-color: white;
  position: fixed;
}
</style>