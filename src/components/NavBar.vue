<template>
  <div>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Vue-Application Sample</v-toolbar-title>
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
      drawer: false,
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
