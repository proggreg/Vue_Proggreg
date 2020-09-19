import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import Light from "./themes/Light";

import {
  preset
} from 'vue-cli-plugin-vuetify-preset-reply/preset'

Vue.use(Vuetify);

export default new Vuetify({
  preset,
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  theme: {
    dark: false,
    themes: {
      light: Light
    },
    options: {
      customProperties: true,
    },
  },
});