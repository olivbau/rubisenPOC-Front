<template>
    <v-toolbar app dark color="primary">
        <router-link to="/">
          <v-toolbar-title class="white--text">
          Rubisen
        </v-toolbar-title>
      </router-link>
        <v-spacer></v-spacer>
        <giiker-button light small></giiker-button>
        <v-toolbar-items v-if="!logged">
            <v-btn flat to="/login">Login</v-btn>
            <v-btn flat to="/signup">Sign Up</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-if="logged">
            <v-btn flat to="/train">Training</v-btn>
        </v-toolbar-items>
        <v-menu bottom v-if="logged">
          <template v-slot:activator="{ on }">
            <v-btn icon v-if="logged" v-on="on">
                <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logOutClicked">
              <v-list-tile-title>Log Out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar>
</template>


<script>
import GiikerButton from '@/components/GiikerButton.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'VueToolbar',
  components: {
    GiikerButton,
  },
  computed: {
    ...mapGetters([
      'logged',
    ]),
  },
  methods: {
    ...mapActions([
      'logOut',
    ]),
    logOutClicked() {
      this.logOut();
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
