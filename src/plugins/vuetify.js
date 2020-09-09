import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import Red from "./themes/Red";

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
      light: Red
    },
    options: {
      customProperties: true,
    },
  },
});