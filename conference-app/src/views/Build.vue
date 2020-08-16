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
                <v-file-input
                accept='.xlsx'
                @change='loadFile'
                >
                </v-file-input>
              </v-card-text>
            </v-window-item>

            <v-window-item
            :value='2'
            >
              <v-card-text>
                <v-select
                :items='colours'
                label='Select a colour'
                >
                </v-select>
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
            :loading='loading'
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
import { parseExcel } from '@/helpers/parse-excel';

export default {
  data() {
    return {
      step: 1,
      valid: false,
      jsonData: null,
      loading: false,
      colours: [
        'Blue',
        'Orange',
        'Turquoise',
        'Purple',
        'Green',
      ],
    };
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Select your Excel file for conversion';
        case 2: return 'Select your favourite color';
        default: return 'Need to define the title correctly';
      }
    },
  },
  methods: {
    async loadFile(file) {
      // Check if they've deleted a selection and return immediately
      if (!file) return;
      const reader = new FileReader();
      this.loading = true;
      reader.onload = (event) => {
        this.jsonData = parseExcel(event.target.result);
        this.loading = false;
      };
      reader.onerror = (err) => {
        // eslint-disable-next-line
        console.error(err);
      };
      await reader.readAsBinaryString(file);
    },
  },
};
</script>
<style scoped>
</style>
