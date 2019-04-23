<template>
    <v-footer app dark color="grey darken-3">
        <v-icon>{{icon}}</v-icon> : {{cubeState}}
        <v-spacer></v-spacer>
        Do not forget to turn on Experimental Web Platform features in chrome://flags/
    </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VueFooter',
  computed: {
    ...mapGetters({
      giikerConnected: 'giikerConnected',
      getGiiker: 'giiker',
    }),
    icon() {
      return (this.giikerConnected) ? 'bluetooth' : 'bluetooth_disabled';
    },
    cubeState() {
      return (this.giikerConnected) ? 'Connected' : 'Disconnected';
    },
  },
};
</script>
