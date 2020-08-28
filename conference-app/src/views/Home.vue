<template>
  <div>
    <v-container>
      <v-row
      align='center'
      justify='center'
      class='mt-4'
      >
        <v-card
        class='pa-3'
        >
          <v-card-title
          class='text-h4'
          >
            Conference Programme Creator
          </v-card-title>
          <v-card-text
          class='text-subtitle-1'
          >
           <p>
             Welcome to the Australian Institute for
             Geomechanics' conference programme creation app.
          </p>
           <p> To get started building your own conference programme click below!</p>
           <v-card-actions>
             <v-btn
             to='/build'
             >
               Get started
             </v-btn>
           </v-card-actions>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      stepNum: 1,
    };
  },
};
</script>
