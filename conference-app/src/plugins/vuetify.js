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
        primary: colors.blue.lighten3,
      },
    },
  },
});
