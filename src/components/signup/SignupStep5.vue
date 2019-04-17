<template>
    <v-stepper-content step="5" id="stepper">
      <v-alert
        :value="alert && success"
        outline
        type="success"
        transition="scale-transition"
      >
        Account created with success. <br>
        <router-link to="/login">Log In</router-link>
      </v-alert>
      <v-alert
        :value="alert && !success"
        outline
        type="error"
        transition="scale-transition"
      >
        An error as occurred.
      </v-alert>

    <v-btn
      v-if="!alert"
      :loading="loading"
      :disabled="loading"
      color="primary"
      @click="submit"
    >
      REGISTER
    </v-btn>

    </v-stepper-content>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupStepFive',
  data: () => ({
    loader: null,
    loading: false,
    alert: false,
    success: false,
  }),
  props: {
    email: { type: String, required: true },
    sequence: { type: Array, required: true },
    training: { type: Array, required: true },
  },
  computed: {
  },
  methods: {
    submit() {
      this.loader = 'loading';
      axios.request({
        url: '/registration',
        method: 'post',
        baseURL: 'http://127.0.0.1:5000',
        auth: {
        },
        data: {
          email: this.email,
          password: this.sequence.join(''),
          train: JSON.stringify(this.training),
        },
      }).then((res) => {
        this.loading = false;
        this.success = true;
        console.log(res);
      }).catch((e) => {
        this.loading = false;
        this.success = false;
        console.log(e.response);
      }).finally(() => {
        this.alert = true;
      });
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.loader = null;
    },
  },
};
</script>

<style scoped>
#stepper {
  text-align: center
}
</style>
