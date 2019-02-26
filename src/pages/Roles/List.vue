<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="addRole" color="primary">
          <v-icon small>add</v-icon>Add
        </v-btn>
      </v-card-title>
      <v-container>
        <v-data-table :headers="headers" :items="roles" :search="search" :loading="loading">
          <template slot="items" slot-scope="props">
            <td>{{props.item.name }}</td>
            <td>{{props.item.isActive }}</td>
            <td>
              <v-btn color="warning" @click="editRole(props.item.id)">Edit</v-btn>
              <v-btn color="error" @click="deleteRole(props.item.id)">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      role: {},
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Active", value: "isActive" },
        { text: "Actions", value: "" }
      ]
    };
  },
  computed: {
    ...mapGetters("role", ["roles"])
  },
  methods: {
    ...mapActions("role", ["getRoles"]),
    addRole() {},
    deleteRole() {}
  },
  mounted() {
    this.getRoles().then(() => {
      this.loading = false;
    });
  }
};
</script>

<style>
</style>
