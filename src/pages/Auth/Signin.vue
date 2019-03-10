<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex lg5 md6 sm8 xs12>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-text-field
              prepend-icon="email"
              label="E-mail"
              v-model="email"
              name="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              label="Password"
              v-model="password"
              type="password"
              name="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" @click.prevent="onSubmit">Sign In</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions("user", ["signIn"]),
    onSubmit() {
      console.log("dsf", "ok");
      this.$validator.validate().then(result => {
        console.log("resul sign in", result);
        if (result) {
          const formData = {
            email: this.email,
            password: this.password
          };
          this.signIn({
            email: formData.email,
            password: formData.password
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>