<template>
  <div class="login">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon large>code</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="loginForm">
              <v-text-field
                v-model="email"
                outline prepend-icon="person"
                name="email" single-line label="Email" type="email"
              ></v-text-field>
              <v-text-field
                v-model="passwordStr"
                autocomplete="off" readonly outline single-line
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                prepend-icon="lock" name="password" label="Sequence"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="reset">Reset</v-btn>
            <v-btn @click="submit" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
    >
      Wrong credentials or bad behaviour
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'login',
  components: {
  },
  data: () => ({
    email: '',
    snackbar: false,
    password: [],
    times: [],
    completed: false,
    show: true,
    normalized: false,
  }),
  methods: {
    ...mapActions([
      'fetchJWT',
    ]),
    reset() {
      this.password = [];
      this.times = [];
      this.normalized = false;
    },
    normalize() {
      const first = this.times[0];
      for (let i = 0; i < this.times.length; i += 1) {
        this.times[i] -= first;
      }
      for (let i = this.times.length - 1; i > 0; i -= 1) {
        this.times[i] -= this.times[i - 1];
      }
      this.times.shift();
      this.normalized = true;
    },
    submit() {
      if (!this.normalized) this.normalize();
      this.fetchJWT({
        email: this.email,
        password: this.password.join(''),
        times: this.times,
      }).then(() => {
        this.$router.push({ name: 'home' });
      }).catch((error) => {
        if (error.response.status === 401) {
          this.reset();
          this.snackbar = true;
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      giikerLast: 'giikerLast',
    }),
    passwordStr() {
      return this.password.join('');
    },
  },
  watch: {
    giikerLast(newMov) {
      if (!this.completed) {
        this.password.push(newMov.notation);
        this.times.push(newMov.timestamp);
      }
    },
  },
};
</script>
