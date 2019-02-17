<template>
  <v-app id="app">
    <v-content>
      <v-container>
        <app-header/>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/header/header.vue";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: {
    "app-header": Header
  },
  created() {
    this.autoTrySignIn();
  },
  methods: {
    ...mapActions("user", ["autoTrySignIn"])
  }
};
</script>

<style>
</style>