<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">Your e-mail address:{{email}}</p>
    <p>
      <img class="logo" alt="Vue logo" src="../../assets/logo.png">
    </p>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("users", { user: "user" }),
    email() {
      return this.user ? this.user.email : false;
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapActions("users", ["getUser"])
  }
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

p {
  color: red;
}
</style>