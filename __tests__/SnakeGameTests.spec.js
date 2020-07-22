/* eslint-disable */
import {
  shallowMount,
  createLocalVue
} from "@vue/test-utils";
import SnakeGame from "../src/Projects/Snake/SnakeGame";
import Vuetify from 'vuetify';

describe('SnakeGame', () => {

  function getRandomGrid(max) {
    return (
      Math.floor(Math.random() * Math.floor(max / 20)) * 20
    )
  }


  let x = 20;
  let check = true;


  it("wooooo", () => {
    for (let i = 0; i < 100000000; i++) {
      let res = getRandomGrid(200);
      if (res > 200 || res < 0) {
        console.log(res)
        check = false;
      }
    }
    expect(check).toBe(true);
  })







})



export default {
  data() {
    return {
      message: ""
    };
  },
  created() {
    this.message = "";
  }
};