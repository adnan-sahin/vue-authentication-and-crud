<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2">Books</v-card-title>
      <v-container>
        <v-layout>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn @click="addBook" color="primary">
            <v-icon small>add</v-icon>Add
          </v-btn>
        </v-layout>
      </v-container>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          :pagination.sync="pagination"
          :total-items="totalItems"
          :rows-per-page-items="[4,8,16]"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.genre }}</td>
            <td>{{ props.item.author }}</td>
            <td>{{ props.item.read }}</td>
            <td>
              <v-btn @click="editBook(props.item.id)" color="warning" :small="true">Edit</v-btn>
              <v-btn @click="deleteBook(props.item.id)" color="error" :small="true">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <form-dialog :is-open="dialog" :item="book" @close="dialog=false" :is-edit="isEdit"></form-dialog>
    <delete-dialog :is-open="deleteConfirm" :item="book" @close="deleteConfirm=false"></delete-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import FormDialog from "./FormDialog.vue";
import DeleteDialog from "./DeleteDialog.vue";
export default {
  components: { FormDialog, DeleteDialog },
  data() {
    return {
      book: {},
      items: [],
      totalItems: 8,
      pagination: {},
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
        { text: "Genre", value: "genre", align: "center" },
        { text: "Author", value: "author", align: "center" },
        { text: "Read", value: "read", align: "center" },
        { text: "Actions", value: "", align: "center", sortable: false }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        this.loading = true;
        this.$store
          .dispatch("book/getBooks", this.pagination)
          .then(result => {
            this.items = result.items;
            this.totalItems = result.totalItems;
            this.loading = false;
          });
      },
      deep: true
    }
  },
  computed: {
    // pagination: {
    //   get: function() {
    //     return this.$store.getters["book/pagination"];
    //   },
    //   set: function(value) {
    //     this.$store.commit("book/setPagination", value);
    //   }
    // }
  },
  // mounted() {
  //   this.$store.dispatch("book/queryItems", this.pagination).then(result => {
  //     console.log("result", result);
  //     this.items = result.items;
  //     console.log("result.totalItems", result.totalItems);
  //     this.totalItems = result.totalItems;
  //     this.loading = false;
  //   });
  // },
  methods: {
    ...mapActions("book", ["getById"]),
    addBook() {
      this.book = {};
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
    }
  }
};
</script>

<style <style scoped>
</style>


