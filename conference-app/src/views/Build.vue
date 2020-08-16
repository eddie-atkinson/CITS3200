<template>
  <div class="build">
    <v-container>
      <v-row
      align='center'
      justify='center'
      class='mt-4'
      >
        <v-form
        v-model='valid'
        >
          <v-card
          class='pa-3 mx-auto'
          min-width='500'
          max-width='500'
          >
            <v-card-title>
              Add files and select themes
            </v-card-title>
            <v-card-text>
              <p>
                It's easy to convert your spreadsheet to a conference programme,
                simply select the excel programme you wish to convert and select your
                favourite colour for the theme.
              </p>
              <v-file-input
              label='Select your Excel file for conversion'
              accept='.xlsx'
              :rules='[validation.required, validation.fileName]'
              @change='loadFile'
              >
              </v-file-input>
              <v-select
              :items='colours'
              v-model='favouriteColour'
              :rules='[validation.required]'
              label='Select your favourite colour'
              >
              </v-select>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              :disabled='!valid'
              :loading='loading'
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { parseExcel } from '@/helpers/parse-excel';

export default {
  data() {
    return {
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
      favouriteColour: '',
      validation: {
        required: (value) => !!value || 'This field is required',
        fileName: (value) => value === undefined || value.name.endsWith('.xlsx') || 'Files must be .xlsx',
      },
    };
  },
  computed: {
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
