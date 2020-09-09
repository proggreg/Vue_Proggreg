<template>
  <v-container>
    <v-layout justify-center align-center>
      <div style="width: 201px; height: 201px" class="border">
        <canvas width="200" height="200" id="canvas" />
      </div>
    </v-layout>
    <v-layout class="mt-4" align-center justify-center>
      <v-btn
        id="startBtn"
        v-if="this.controlMessage === 'Start'"
        v-text="this.controlMessage"
        @click="start()"
        class="secondary primary--text center"
      ></v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SnakeCanvas",
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