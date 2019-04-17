<template>
  <v-app>
    <vue-toolbar></vue-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <vue-footer></vue-footer>
  </v-app>
</template>

<script>
import VueToolbar from '@/components/VueToolbar.vue';
import VueFooter from '@/components/VueFooter.vue';

export default {
  components: {
    VueToolbar,
    VueFooter,
  },
};
</script>


<style>
</style>
