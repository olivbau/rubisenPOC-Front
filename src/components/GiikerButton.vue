<template>
  <div class="giiker-button">
    <v-btn :round="round" :light="light" :small="small" @click="connect">
      Cube Connect
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import GiiKER from 'giiker';
// import GiikerCube from '../../lib/giiker';

export default {
  name: 'giikerButton',
  components: {
  },
  props: {
    round: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations({
      setGiiker: 'SET_GIIKER',
      setLast: 'SET_LAST',
      setDisconnected: 'DISCONNECTED',
    }),
    async connect() {
      const giiker = await GiiKER.connect();
      giiker.on('move', (move) => {
        this.setLast({ notation: move.notation, timestamp: Date.now() });
      });
      giiker.on('disconnect', () => {
        this.setDisconnected();
      });
      this.setGiiker(giiker);
    },
  },
};
</script>
