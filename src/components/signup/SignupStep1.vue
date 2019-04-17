<template>
    <v-stepper-content step="1">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >

        <v-text-field
          v-model="email"
          :rules="emailRules"
          type="email"
          name="email"
          v-on:keydown.enter="validate"
          label="E-mail"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="primary"
          @click="validate"
        >
          Continue
        </v-btn>
      </v-form>
    </v-stepper-content>
</template>

<script>
export default {
  name: 'SignupStepOne',
  data: () => ({
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
    ],
  }),
  props: {
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$emit('completed', this.email);
      }
    },
  },
};
</script>
