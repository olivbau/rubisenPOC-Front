<template>
  <div class="secret">
    <h1>{{secret}}</h1>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'secret',
  mounted() {
    this.refreshAccessToken();
    axios({
      url: '/secret',
      baseURL: 'http://127.0.0.1:5000',
      method: 'get',
      headers: { Authorization: `Bearer ${this.token}` },
    }).then((res) => {
      this.secret = res.data.answer;
    });
  },
  components: {
  },
  data: () => ({
    secret: null,
  }),
  methods: {
    ...mapActions({
      refreshAccessToken: 'refreshAccessToken',
    }),
  },
  computed: {
    ...mapGetters({
      giikerLast: 'giikerLast',
      token: 'token',
      isTokenValid: 'isTokenValid',
    }),
  },
};
</script>
