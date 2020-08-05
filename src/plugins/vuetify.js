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

    // TODO fix dark mode when mobile is set to dark mode
    themes: {
      light: {
        primary: colors.lightGreen,
        secondary: colors.green,
        accent: colors.deepPurple,
        error: colors.red.accent3,

      },
      dark: {
        primary: colors.orange,
        secondary: colors.blue,
        accent: colors.green,
        error: colors.red.accent3,
      },
      options: {
        customProperties: true,
      },
    },
  },
});