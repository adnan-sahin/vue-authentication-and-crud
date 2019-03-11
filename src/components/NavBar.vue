<template>
  <div>
    <v-navigation-drawer fixed v-model="drawer" app mobile-break-point="991" width="260">
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <!-- <v-img :src="logo" height="45" contain/> -->
          </v-list-tile-avatar>
          <v-list-tile-title class="title">Vue-Application</v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon v-if="!drawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="!drawer">Vue-Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="white">
        <span>Sign Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      logo: "@/assets/logo.png",
      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "folder", text: "Books", route: "/books" },
        { icon: "person", text: "Roles", route: "/roles" }
      ]
    };
  }
};
</script>

<style>
</style>
