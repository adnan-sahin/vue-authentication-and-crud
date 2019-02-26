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
              <v-btn @click="deleteBook(props.item._id)" color="error" :small="true">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <add-edit :is-open="dialog" :item="book" @close="closeDialog" :is-edit="isEdit"></add-edit>
    <delete :is-open="deleteConfirm" :item="book" @close="closeDialog"></delete>
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
      book: {},
      dialog: false,
      deleteConfirm: false,
      isEdit: true,
      search: "",
      loading: true,
      headers: [
        {
          text: "Title",
          value: "title",
          sortable: false
        },
        { text: "Genre", value: "genre" },
        { text: "Author", value: "author" },
        { text: "Read", value: "read" },
        { text: "Actions", value: "" }
      ]
    };
  },
  computed: {
    ...mapGetters("book", ["books"])
  },
  methods: {
    ...mapActions("book", ["getBooks", "getById"]),
    addBook() {
      this.dialog = true;
      this.isEdit = false;
    },
    editBook(id) {
      this.getById(id).then(res => {
        this.book = res;
        this.isEdit = true;
        this.dialog = true;
      });
    },
    deleteBook(id) {
      this.getById(id).then(res => {
        this.book = res;
        this.deleteConfirm = true;
      });
    },
    closeDialog() {
      this.dialog = false;
      this.isEdit = false;
      this.deleteConfirm = false;
      this.book = {};
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


