<template>
    <v-stepper-content step="2">
      <p class="text-xs-center">
        Cube connection :
        <v-icon small>{{(giikerConnected)?'check_circle':'cancel'}}</v-icon>
      </p>
      <v-btn
        color="primary"
        :disabled="!giikerConnected"
        @click="$emit('completed')"
      >
        Continue
      </v-btn>
    </v-stepper-content>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignupStepTwo',
  data: () => ({
  }),
  props: {
  },
  computed: {
    ...mapGetters({
      giikerConnected: 'giikerConnected',
    }),
  },
  methods: {
  },
};
</script>
