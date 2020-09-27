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
                <v-text-field
                label='Conference Name'
                prepend-icon='mdi-pencil'
                id='conference-name-field'
                :rules='[validation.required]'
                v-model='formData.confName'
                data-cy='conference-name-field'
                >
                </v-text-field>
                <v-file-input
                label='Select your Excel file for conversion'
                accept='.xlsx'
                id='input-file-field'
                :rules='[validation.required, validation.fileName]'
                @change='loadFile'
                data-cy='input-file-field'
                >
                </v-file-input>
                <v-select
                :items='colours'
                v-model='formData.themeColour'
                id='colour-input-field'
                :rules='[validation.required]'
                prepend-icon='mdi-palette'
                label='Select the programme theme'
                data-cy='select-colour-input'
                >
                </v-select>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                :disabled='!valid || loading || error'
                :loading='loading'
                id='build-programme-btn'
                data-cy='build-programme-btn'
                @click='buildProgramme'
                >
                  Build programme
                </v-btn>
              </v-card-actions>
              <span v-show='error' class='error--text'> {{ errorMsg }}</span>
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
                <a :href='htmlBlob' :download="`${formData.fileName}.html`">
                  <v-chip
                  class='grey--lighten-3 pa-4 upfileName'
                  data-cy='download-html-button'
                  >
                    <v-icon
                    left
                    small
                    >
                      mdi-download
                    </v-icon>
                      {{ formData.fileName }}
                  </v-chip>
                </a>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                @click='goBack'
                data-cy='goBack-btn'
                >
                  Go back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                to='/'
                @click='releaseURL'
                data-cy='finish-btn'
                >
                  Finish
                </v-btn>
              </v-card-actions>
              <span v-show='error' class='error--text'> {{ errorMsg }}</span>
            </v-card>
        </v-window-item>
      </v-window>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import excelToHTML from '@/helpers/parse-excel';

export default {
  data() {
    return {
      step: 1,
      valid: false,
      jsonData: null,
      htmlBlob: null,
      error: false,
      errorMsg: '',
      loading: false,
      colours: [
        'Blue',
        'Orange',
        'Turquoise',
        'Green',
      ],
      formData: {
        themeColour: '',
        confName: '',
        fileName: '',
        excelData: null,
      },
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
      this.formData.fileName = file.name.replace(new RegExp('\\..*', 'i'), '');
      // Reset the error state on new file upload
      this.error = false;
      const reader = new FileReader();
      this.loading = true;
      reader.onload = (event) => {
        try {
          this.formData.excelData = event.target.result;
        } catch (err) {
          this.error = true;
          this.errorMsg = err;
        }
        this.loading = false;
      };
      reader.onerror = (err) => {
        this.error = true;
        this.loading = false;
        this.errorMsg = err;
      };
      await reader.readAsBinaryString(file);
    },
    buildProgramme() {
      this.step += 1;
      this.htmlData = excelToHTML(this.formData);
      const blob = new Blob([this.htmlData], {
        type: 'text/plain',
      });
      this.htmlBlob = window.URL.createObjectURL(blob);
    },
    releaseURL() {
      window.URL.revokeObjectURL(this.htmlBlob);
    },
    getFileNames(ext) {
      return `${this.formData.fileName}.${ext}`;
    },
    goBack() {
      this.step -= 1;
      this.releaseURL();
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
