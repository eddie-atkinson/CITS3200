<template>
  <div class="build">
    <vue-headful
      title ="Build your Conference Programme"
      />
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
                :rules='[validation.required, validation.excelFileName]'
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
                <v-checkbox
                v-model='formData.customCSS'
                label='Add your own custom CSS file'
                >
                </v-checkbox>
                <v-file-input
                label='Select your custom CSS file'
                accept='.css'
                id='input-css-field'
                v-if='formData.customCSS'
                :rules='[validation.required, validation.cssFileName]'
                @change='loadCSS'
                data-cy='input-css-field'
                >
                </v-file-input>
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
        <vue-headful
          title ="Download Your Programme"
        />
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
        'None',
      ],
      formData: {
        themeColour: '',
        confName: '',
        fileName: '',
        excelData: null,
        customCSS: false,
        cssData: '',
      },
      validation: {
        required: (value) => !!value || 'This field is required',
        excelFileName: (value) => value === undefined || value.name.endsWith('.xlsx') || 'Files must be .xlsx',
        cssFileName: (value) => value === undefined || value.name.endsWith('.css') || 'Files must be .css',
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
      this.loading = true;
      try {
        this.htmlData = excelToHTML(this.formData);
      } catch (e) {
        this.error = true;
        this.errorMsg = e;
        this.loading = false;
        return;
      }
      const blob = new Blob([this.htmlData], {
        type: 'text/plain',
      });
      this.htmlBlob = window.URL.createObjectURL(blob);
      this.loading = false;
      this.step += 1;
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
    async loadCSS(file) {
      // Check if they've deleted a selection and return immediately
      if (!file) return;
      // Reset the error state on new file upload
      this.error = false;
      const reader = new FileReader();
      this.loading = true;
      reader.onload = (event) => {
        try {
          this.formData.cssData = event.target.result;
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
      await reader.readAsText(file);
    },
  },
};
</script>
<style scoped>
</style>
