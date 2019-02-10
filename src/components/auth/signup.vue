<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            class="form-control"
            type="email"
            id="email"
            @input="$v.email.$touch()"
            v-model="email"
          >
        </div>
        <div class="form-group">
          <label for="age">Your Age</label>
          <input class="form-control" type="number" id="age" v-model.number="age">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input class="form-control" type="password" id="password" v-model="password">
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            class="form-control"
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
          >
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <select class="form-control" id="country" v-model="country">
            <option value="turkey">Turkey</option>
            <option value="france">France</option>
            <option value="usa">USA</option>
            <option value="netherlands">Netherlands</option>
            <option value="sweeden">Sweeden</option>
            <option value="uk">UK</option>
            <option value="italy">Italy</option>
          </select>
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
        <div class="form-group">
          <input type="checkbox" id="terms" v-model="terms">
          <label for="terms">Accept Terms of Use and Conditions</label>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
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
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
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
      const formData = {
        email: this.email,
        age: this.age,
        password: this.password,
        confirmPassword: this.confirmPassword,
        country: this.country,
        hobbies: this.hobbyInputs.map(hobby => hobby.value),
        terms: this.terms
      };
      console.log(formData);
      this.$store.dispatch("signUp", formData);
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
</style>