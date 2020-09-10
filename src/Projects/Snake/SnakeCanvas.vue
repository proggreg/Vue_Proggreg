<template>
  <v-container>
    <v-layout justify-center align-center>
      <div style="width: 201px; height: 201px" class="border">
        <canvas width="200" height="200" id="canvas" />
      </div>
    </v-layout>
    <v-layout class="mt-4" align-center justify-center>
      <BaseButton @click="start()" v-if="this.controlMessage === 'Start'">{{controlMessage}}</BaseButton>
    </v-layout>
  </v-container>
</template>

<script>
import BaseButton from "../../components/BaseButton";
export default {
  name: "SnakeCanvas",
  components: {
    BaseButton,
  },
  data() {
    return {
      controlMessage: "Start",
    };
  },
  methods: {
    start() {
      this.controlMessage = "";
      this.$emit("startGame");
    },
  },
};
</script>

<style>
canvas {
  position: absolute;
}

.border {
  border: 1px;
  border-style: solid;
  border-color: var(--v-secondary-base);
  width: fit-content;
  height: fit-content;
}
</style>