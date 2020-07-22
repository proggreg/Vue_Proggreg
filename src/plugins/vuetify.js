import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
  theme: {
    default: "light",

    themes: {
      light: {
        primary: colors.pink,
        secondary: colors.blue,
        accent: colors.green,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.orange,
        secondary: colors.blue,
        accent: colors.green,
        error: colors.red.accent3,
      },
    },
  },
});