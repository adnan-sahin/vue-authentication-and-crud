<template>
  <v-app id="app">
    <app-header/>
    <v-content>
      <v-container>
        <router-view></router-view>
        <app-notification-container/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header.vue";
import NotificationContainer from "./components/Notification/NotificationContainer.vue";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: {
    "app-header": Header,
    "app-notification-container": NotificationContainer
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
.v-error {
  color: red;
}
</style>