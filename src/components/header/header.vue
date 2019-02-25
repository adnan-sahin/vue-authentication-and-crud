<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">Vue - Application Sample</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/books">Books</router-link>
        </li>
        <li v-if="auth">
          <span class="sign-out" @click="signOut" to="/signout">Sign Out</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("user", { isAuthenticated: "isAuthenticated" }),
    auth() {
      return this.isAuthenticated;
    }
  },
  methods: {
    ...mapActions("user", { signout: "signOut" }),
    signOut() {
      this.signout();
    }
  }
};
</script>


<style scoped>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: #445ba5;
  padding: 0 20px;
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa923f;
  /* transform: scale(1.01); */
  /* box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19); */
}
.sign-out {
  cursor: pointer;
  color: white;
  border: none;
  background-color: transparent;
}
</style>