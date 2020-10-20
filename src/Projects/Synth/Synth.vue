
<template>
  <div id="synthContainer">
    <h1 class="text-center" style="width: max-content; margin: 0 auto">
      Synth
    </h1>
    <div
      @click.capture="play"
      id="whiteKey"
      :key="i.note"
      v-for="i in notes"
    ></div>
    <div
      :style="i.style"
      @click="play"
      id="blackKey"
      :key="i"
      v-for="i in sharpflats"
    ></div>
    <v-btn style="margin: 0 auto" v-on:click.native="play">Click</v-btn>
  </div>
</template>
<script>
// import { Synth } from "tone";

// TODO Finish Synth

export default {
  name: "Synth",
  methods: {
    play(event) {
      //   var synth = new Synth().toMaster();
      let vol = Math.abs(event.clientY - 255);
      //   vol = vol
      //   ?range 50 - 150 = - 150 then .abs
      console.log(vol);
      //   synth.triggerAttackRelease(event.note + "4", "8n");
    },
  },
  data() {
    return {
      notes: [
        { note: "C" },
        { note: "D" },
        { note: "E" },
        { note: "F" },
        { note: "G" },
        { note: "A" },
        { note: "B" },
      ],
      sharpflats: [
        { note: "C#", style: "" },
        { note: "D#", style: "" },
        { note: "", style: "height: 0; border: none" },
        { note: "F#", style: "" },
        { note: "G#", style: "" },
        { note: "A#", style: "" },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
#synthContainer {
  display: flex;
  #whiteKey {
    width: 20px;
    height: 100px;
    background: grey;
    border-style: solid;
    border-width: 1px;
  }
  #blackKey {
    width: 18px;
    height: 45px;
    background: black;
    z-index: 1;
    left: -130px;
    position: relative;
    margin-right: 2px;
  }
}
</style>