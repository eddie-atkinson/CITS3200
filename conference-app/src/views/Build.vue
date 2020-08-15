<template>
  <div class="build">
    <v-container>
      <v-row
      align='center'
      justify='center'
      class='mt-4'
      >
        <v-card
        round
        class='pa-3 mx-auto'
        min-width='500'
        max-width='500'
        >
          <v-card-title>
            {{ currentTitle }}
          </v-card-title>
          <v-window
          v-model='step'
          >
            <v-window-item
            :value='1'
            >
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Sapiente in tempora doloremque maiores molestiae,
                ad officia facilis? Fuga, fugit? Dolores ducimus
                labore rem cupiditate illum harum sunt est dicta laboriosam?
              </v-card-text>
            </v-window-item>

            <v-window-item
            :value='2'
            >
              <v-card-text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Sapiente in tempora doloremque maiores molestiae,
                ad officia facilis? Fuga, fugit? Dolores ducimus
                labore rem cupiditate illum harum sunt est dicta laboriosam?
              </v-card-text>
            </v-window-item>
          </v-window>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
            :disabled='step === 1'
            @click='step--'
            >
              Previous
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            :disabled='step === 2'
            @click='step++'
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      step: 1,
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Hello world';
        case 2: return 'Select your favourite color';
        default: return 'Need to define the title correctly';
      }
    },
  },
};
</script>
<style scoped>
</style>
