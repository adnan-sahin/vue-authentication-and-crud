<template>
  <div id="app">
    <app-header/>
    <router-view></router-view>
  </div>
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
    ...mapActions("users", ["autoTrySignIn"])
  }
};
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>