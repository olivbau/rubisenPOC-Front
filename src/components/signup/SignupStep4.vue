<template>
    <v-stepper-content step="4">
      <v-text-field
        label="Sequence"
        v-model="sequenceStr"
        readonly
        outline
      ></v-text-field>
      <v-text-field
        :label="`Training: ${(set>sets)?`${sets}/${sets} (completed)`:`${set}/${sets}`}`"
        v-model="trainingSequenceStr"
        readonly
        outline
      ></v-text-field>

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
import _ from 'lodash';

export default {
  name: 'SignupStepFour',
  data: () => ({
    valid: false,
    trainingSequence: [],
    trainingTimes: [],
    set: 1,
    sets: 5,
  }),
  props: {
    sequence: { type: Array, required: true },
  },
  computed: {
    ...mapGetters({
      giikerLast: 'giikerLast',
    }),
    sequenceStr() {
      return this.sequence.join(' ');
    },
    trainingSequenceStr() {
      return _.map(this.trainingSequence, 'notation').join(' ');
    },
    trainingSequenceTime() {
      return _.map(this.trainingSequence, 'timestamp');
    },
  },
  watch: {
    giikerLast(newMov) {
      if (!this.valid && this.sequence !== []) {
        this.trainingSequence.push(newMov);
        if (!this.sequenceStr.startsWith(this.trainingSequenceStr)) {
          this.reset();
          return;
        }
        if (this.sequenceStr === this.trainingSequenceStr) {
          this.validateTraining();
        }
      }
    },
  },
  methods: {
    validateTraining() {
      if (this.sequenceStr === this.trainingSequenceStr) {
        this.trainingTimes.push(_.map(this.trainingSequence, 'timestamp'));
        this.set += 1;
        this.trainingSequence = [];
        if (this.set > this.sets) this.valid = true;
      }
    },
    validate() {
      if (this.valid) {
        this.normalize();
        this.$emit('completed', this.trainingTimes);
      }
    },
    normalize() {
      for (let i = 0; i < this.trainingTimes.length; i += 1) {
        const firstTimestamp = this.trainingTimes[i][0];
        for (let j = 0; j < this.trainingTimes[i].length; j += 1) {
          this.trainingTimes[i][j] -= firstTimestamp;
        }
        for (let j = this.trainingTimes[i].length - 1; j > 0; j -= 1) {
          this.trainingTimes[i][j] -= this.trainingTimes[i][j - 1];
        }
        this.trainingTimes[i].shift();
      }
    },
    reset() {
      this.trainingSequence = [];
    },
  },
};
</script>
