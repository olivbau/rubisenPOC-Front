<template>
  <div class="signup">
    <v-layout justify-center>
      <v-flex xs12 sm8 md5 lg4>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4" step="4"></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items class="text-left">
            <SignupStepOne
              v-on:completed="email = $event; e1 = 2;"
            ></SignupStepOne>

            <SignupStepTwo
              v-on:completed="e1 = 3"
            ></SignupStepTwo>

            <SignupStepThree
              v-on:completed="sequence = $event; e1 = 4;"
            ></SignupStepThree>

            <SignupStepFour
              :sequence="sequence"
              v-on:completed="training = $event; e1 = 5;"
            ></SignupStepFour>

            <SignupStepFive
              :email="email"
              :sequence="sequence"
              :training="training"
            ></SignupStepFive>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SignupStepOne from '@/components/signup/SignupStep1.vue';
import SignupStepTwo from '@/components/signup/SignupStep2.vue';
import SignupStepThree from '@/components/signup/SignupStep3.vue';
import SignupStepFour from '@/components/signup/SignupStep4.vue';
import SignupStepFive from '@/components/signup/SignupStep5.vue';

export default {
  name: 'signup',
  components: {
    SignupStepOne,
    SignupStepTwo,
    SignupStepFour,
    SignupStepThree,
    SignupStepFive,
  },
  data() {
    return {
      e1: 0,
      email: `test${Math.floor(Math.random() * 1000000000000)}@test.com`,
      sequence: [],
      training: [],
      // sequence: ['R', 'R\'', 'R', 'R\'', 'R', 'R\'', 'R', 'R\''],
      // eslint-disable-next-line max-len
      // training: [[164, 450, 113, 450, 225, 393, 169], [171, 390, 170, 338, 224, 564, 505], [226, 392, 113, 449, 226, 450, 225], [225, 449, 113, 449, 226, 618, 169], [168, 337, 170, 337, 225, 448, 171]],
    };
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
};
</script>
