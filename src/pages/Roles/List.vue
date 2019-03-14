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
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :loading="loading"
          :pagination.sync="pagination"
          :total-items="totalItems"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.name }}</td>
            <td>
              <v-icon v-if="props.item.isActive">done</v-icon>
              <v-icon v-else-if="!props.item.isActive">clear</v-icon>
            </td>
            <td>
              <v-btn color="warning" small @click="editRole(props.item.id)">Edit</v-btn>
              <v-btn color="error" small @click="deleteRole(props.item.id)">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import paginationMixin from "../mixins/paginationMixin";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      role: {},
      search: "",
      headers: [
        { text: "Name", value: "name", align: "center" },
        { text: "Active", value: "isActive", align: "center" },
        { text: "Actions", value: "", align: "center" }
      ]
    };
  },
  methods: {
    ...mapActions("role", { getItems: "getRoles" }),
    addRole() {},
    deleteRole() {}
  }
};
</script>

<style>
</style>
