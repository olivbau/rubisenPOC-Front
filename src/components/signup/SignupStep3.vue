<template>
    <v-stepper-content step="3">

      <v-text-field
        label="Sequence"
        v-model="sequenceStr"
        readonly
        outline
      ></v-text-field>

      <v-btn
        @click="reset"
      >
        RESET
      </v-btn>
      <v-btn
        :disabled="!valid"
        color="primary"
        @click="validate"
      >
        Continue
      </v-btn>
    </v-stepper-content>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignupStepThree',
  props: {
  },
  data: () => ({
    sequence: [],
    completed: false,
  }),
  computed: {
    ...mapGetters({
      giikerLast: 'giikerLast',
    }),
    sequenceStr() {
      return this.sequence.join(' ');
    },
    valid() {
      return this.sequence.length >= 6;
    },
  },
  methods: {
    validate() {
      this.$emit('completed', this.sequence);
      this.completed = true;
    },
    reset() {
      this.sequence = [];
    },
  },
  watch: {
    giikerLast(newMov) {
      if (!this.completed) {
        this.sequence.push(newMov.notation);
      }
    },
  },
};
</script>


<style scoped>
</style>
