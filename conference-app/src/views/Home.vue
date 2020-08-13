<template>
  <div>
    <v-stepper v-model='stepNum'>
      <v-stepper-header>
        <v-stepper-step
        :complete="stepNum > 1"
        step='1'
        editable='true'
        edit-icon='$complete'
        >
          Step 1
        </v-stepper-step>
        <v-stepper-step
        :complete="stepNum > 2"
        step='2'
        editable='true'
        edit-icon='$complete'
        >
          Step 2
        </v-stepper-step>
        <v-stepper-step
        :complete="stepNum > 3"
        step='3'
        editable='true'
        edit-icon='$complete'
        >
          Step 3
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          {{ stepNum }}
        </v-stepper-content>
        <v-stepper-content step="2">
          {{ stepNum }}
        </v-stepper-content>
        <v-stepper-content step="3">
          {{ stepNum }}
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
