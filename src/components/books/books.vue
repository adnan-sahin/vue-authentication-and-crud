<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="addBook" color="primary">
          <v-icon small>add</v-icon>Add
        </v-btn>
      </v-card-title>
      <v-container>
        <v-data-table :headers="headers" :items="books" :search="search" :loading="loading">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.genre }}</td>
            <td>{{ props.item.author }}</td>
            <td>{{ props.item.read }}</td>
            <td>
              <v-btn @click="editBook(props.item._id)" color="warning" :small="true">Edit</v-btn>
            </td>
            <td>
              <v-btn @click="deleteBook(props.item._id)" color="error" :small="true">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <add-edit :is-open="dialog" @close="closeDialog" :is-edit="isEdit"></add-edit>
    <delete :is-open="deleteConfirm" @close="closeDialog"></delete>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import AddEdit from "./AddEdit.vue";
import Delete from "./Delete.vue";
export default {
  components: { AddEdit, Delete },
  data() {
    return {
      dialog: false,
      deleteConfirm: false,
      isEdit: true,
      search: "",
      loading: true,
      headers: [
        {
          text: "Title",
          value: "title"
        },
        { text: "Genre", value: "genre" },
        { text: "Author", value: "author" },
        { text: "Read", value: "read" },
        { text: "", value: "edit" },
        { text: "", value: "delete" }
      ]
    };
  },
  computed: {
    ...mapGetters("book", ["books"])
  },
  methods: {
    ...mapActions("book", ["getBooks", "getBookById", "clearBook"]),
    addBook() {
      this.dialog = true;
      this.isEdit = false;
    },
    editBook(id) {
      this.dialog = true;
      this.isEdit = true;
      this.getBookById(id);
    },
    deleteBook(id) {
      this.deleteConfirm = true;
      this.getBookById(id);
    },
    closeDialog() {
      this.dialog = false;
      this.deleteConfirm = false;
      this.clearBook();
    }
  },
  async mounted() {
    await this.getBooks().then(() => {
      this.loading = false;
    });
  }
};
</script>

<style <style scoped>
</style>


