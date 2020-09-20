import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.base,
        secondary: colors.indigo.base,
        accent: colors.blue.base,
        error: colors.red.lighten1,
        warning: colors.orange.lighten1,
        info: colors.indigo.lighten1,
        success: colors.lime.lighten1,
      },
      dark: {
        primary: colors.blue,
        secondary: colors.teal.darken4,
        accent: colors.teal.accent4,
        error: colors.deepOrange.accent2,
        info: colors.grey.darken3,
        success: colors.green.accent3,
        warning: colors.amber.base,
      },
    },
  },
});
