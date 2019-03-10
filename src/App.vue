<template>
  <v-app id="app">
    <app-navbar></app-navbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <router-view></router-view>
            <app-notification-container/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="primary" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header.vue";
import NavBar from "./components/NavBar.vue";
import NotificationContainer from "./components/Notification/NotificationContainer.vue";
import { mapActions } from "vuex";
export default {
  name: "app",
  components: {
    "app-navbar": NavBar,
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