<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
      text
      @click='$vuetify.theme.dark=!$vuetify.theme.dark'
      >
        <v-icon
        v-show='!$vuetify.theme.dark'
        >
          mdi-lightbulb-cfl-off
        </v-icon>
        <v-icon
        v-show='$vuetify.theme.dark'
        >
          mdi-lightbulb-cfl
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        to="/"
        text
      >
        Start over
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
  methods: {
  },
};
</script>
