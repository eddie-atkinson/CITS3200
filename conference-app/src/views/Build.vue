<template>
  <div class="build">
    <v-container>
      <v-row
      align='center'
      justify='center'
      class='mt-4'
      >
      <v-window
      v-model='step'
      >
        <v-window-item
        :value='1'
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
                :disabled='!valid || loading'
                :loading='loading'
                @click='buildProgramme'
                >
                  Build programme
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-window-item>

        <v-window-item
        :value='2'
        >
          <v-card
            class='pa-3 mx-auto'
            min-width='500'
            max-width='500'
            >
              <v-card-title>
                Download your files
              </v-card-title>
              <v-card-text>
                <a :href='htmlBlob' :download="`${fileName}.html`">
                  <v-chip
                  class='grey--lighten-3 pa-4'
                  >
                    <v-icon
                    left
                    small
                    >
                      mdi-download
                    </v-icon>
                      {{ fileName }}
                  </v-chip>
                </a>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                @click='step--'
                >
                  Go back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                to='/'
                @click='releaseURL'
                >
                  Finish
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-window-item>
      </v-window>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { parseExcel, buildHTML } from '@/helpers/parse-excel';

export default {
  data() {
    return {
      step: 1,
      valid: false,
      jsonData: null,
      htmlBlob: null,
      fileName: '',
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
      // Strip the file extension from the file name
      this.fileName = file.name.replace(new RegExp('\\..*', 'i'), '');
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
    buildProgramme() {
      this.step += 1;
      const blob = new Blob([buildHTML(this.jsonData)], {
        type: 'text/plain',
      });
      this.htmlBlob = window.URL.createObjectURL(blob);
    },
    releaseURL() {
      window.URL.revokeObjectURL(this.htmlBlob);
    },
    getFileNames(ext) {
      return `${this.fileName}.${ext}`;
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
