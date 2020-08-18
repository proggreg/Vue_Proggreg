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
        
        primary: colors.shades.white,
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