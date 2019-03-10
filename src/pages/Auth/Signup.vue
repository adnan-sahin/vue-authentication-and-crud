<template>
  <div>
    <v-layout justify-center>
      <v-flex lg5 md6 sm8 xs12>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-text-field
              label="E-mail"
              v-model="email"
              name="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
            ></v-text-field>
            <v-text-field
              label="Age"
              v-model="age"
              name="age"
              v-validate="'required|numeric'"
              :error-messages="errors.collect('age')"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              name="password"
              v-validate="'required|confirmed:confirmation'"
              :error-messages="errors.collect('password')"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
              v-validate="'required'"
              ref="confirmation"
              :error-messages="errors.collect('confirmPassword')"
            ></v-text-field>
            <v-select
              label="Country"
              v-model="country"
              name="country"
              :items="countries"
              :item-text="'name'"
              :item-value="'id'"
              return-object
              v-validate="'selectRequired'"
              :error-messages="errors.collect('country')"
            ></v-select>
            <div class="hobbies">
              <h3>Add Some Interest | Hobbies</h3>
              <v-btn color="success" @click="onAddHobby" type="button">Add Interest | Hobby</v-btn>
              <div
                class="hobby-list"
                v-for="(hobbyInput, index) in hobbyInputs"
                :key="hobbyInput.id"
              >
                <div>
                  <label :for="hobbyInput.id">Hobby | Interest #{{ index }}</label>
                  <v-layout align-center justify-center>
                    <v-text-field :id="hobbyInput.id" v-model="hobbyInput.value"></v-text-field>
                    <v-btn
                      class="btn-delete red"
                      dark
                      small
                      fab
                      @click="onDeleteHobby(hobbyInput.id)"
                      type="button"
                    >X</v-btn>
                  </v-layout>
                </div>
              </div>
            </div>
            <v-checkbox
              label="Accept Terms of Use and Conditions"
              :v-model="terms"
              v-validate="'required'"
              name="terms"
              :error-messages="errors.collect('terms')"
            ></v-checkbox>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click.prevent="signUp">Sign Up</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Validator } from "vee-validate";
Validator.extend("selectRequired", {
  getMessage: field => "The " + field + " field is required.",
  validate: value => {
    return value.id != null;
  }
});

export default {
  data() {
    return {
      email: "",
      age: null,
      password: "",
      confirmPassword: "",
      hobbyInputs: [],
      terms: false,
      country: { id: null, name: null },
      countries: [
        { id: "1", name: "Turkey" },
        { id: "2", name: "Germany" },
        { id: "3", name: "France" },
        { id: "4", name: "Italy" },
        { id: "5", name: "Netherland6" },
        { id: "6", name: "England" }
      ]
    };
  },
  methods: {
    ...mapActions("user", ["signUp"]),
    onAddHobby() {
      const newHobby = {
        id: Math.random() * Math.random() * 1000,
        value: ""
      };
      this.hobbyInputs.push(newHobby);
    },
    onDeleteHobby(id) {
      this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id);
    },
    signUp() {
      this.$validator.validate().then(result => {
        if (result) {
          const formData = {
            email: this.email,
            age: this.age,
            password: this.password,
            confirmPassword: this.confirmPassword,
            country: this.country,
            hobbies: this.hobbyInputs.map(hobby => hobby.value),
            terms: this.terms
          };
          this.signUp(formData);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>