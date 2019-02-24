<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            class="form-control"
            type="email"
            v-model="email"
            name="email"
            v-validate="'required|email'"
          >
          <span class="v-error">{{errors.first('email')}}</span>
        </div>
        <div class="form-group">
          <label for="age">Your Age</label>
          <input
            class="form-control"
            type="number"
            v-model="age"
            name="age"
            v-validate="'required|numeric'"
          >
          <span class="v-error">{{errors.first('age')}}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            v-model="password"
            name="password"
            v-validate="'required|confirmed:confirmation'"
          >
          <span class="v-error">{{errors.first('password')}}</span>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            class="form-control"
            type="password"
            v-model="confirmPassword"
            name="confirmPassword"
            v-validate="'required'"
            ref="confirmation"
          >
          <span class="v-error">{{errors.first('confirmPassword')}}</span>
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <select
            class="form-control"
            id="country"
            v-model="country"
            name="country"
            v-validate="'required'"
          >
            <option value>Select</option>
            <option value="turkey">Turkey</option>
            <option value="france">France</option>
            <option value="usa">USA</option>
            <option value="netherlands">Netherlands</option>
            <option value="sweeden">Sweeden</option>
            <option value="uk">UK</option>
            <option value="italy">Italy</option>
          </select>
          <span class="v-error">{{errors.first('country')}}</span>
        </div>
        <div class="hobbies">
          <h3>Add Some Interest | Hobbies</h3>
          <button class="btn btn-success" @click="onAddHobby" type="button">Add Interest | Hobby</button>
          <div class="hobby-list" v-for="(hobbyInput, index) in hobbyInputs" :key="hobbyInput.id">
            <div class="form-group hobby">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                class="form-control"
                type="text"
                :id="hobbyInput.id"
                v-model="hobbyInput.value"
              >
              <button
                class="btn btn-danger btn-delete"
                @click="onDeleteHobby(hobbyInput.id)"
                type="button"
              >X</button>
            </div>
          </div>
        </div>
        <br>
        <div class="form-group">
          <input type="checkbox" id="terms" v-model="terms" name="terms" v-validate="'required'">
          <label for="terms">Accept Terms of Use and Conditions</label>
          <br>
          <span class="v-error inline-block" v-show="errors.has('terms')">{{errors.first('terms')}}</span>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      age: null,
      password: "",
      confirmPassword: "",
      country: "turkey",
      hobbyInputs: [],
      terms: false
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
    onSubmit() {
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
.container {
  max-width: 600px;
}
.hobby-list {
  margin-top: 30px;
}
.hobby {
  display: flex;
  flex-direction: row;
}
.btn-delete {
  height: 35px;
  margin-left: 5px;
}

.hobbies input {
  width: 90%;
}
.inline-block {
  display: inline-block;
}
</style>