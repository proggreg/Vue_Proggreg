import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
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
    default: "light",
    themes: {
      light: {
        primary: "#fffffa",
        secondary: colors.lightBlue,
        accent: colors.lime.base,
        error: colors.red.base,
        warning: colors.yellow.base,
        info: colors.teal.base,
        success: colors.lightGreen

      },
      dark: {
        primary: colors.lightBlue,
        secondary: colors.shades.black,
        accent: colors.lime.base,
        error: colors.red.base,
        warning: colors.yellow.base,
        info: colors.teal.base,
        success: colors.lightGreen
      },
    },
    options: {
      customProperties: true,
    },
  },
});