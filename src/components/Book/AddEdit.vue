<template>
  <v-dialog v-model="isOpen" max-width="700">
    <v-card>
      <form>
        <v-card-title class="headline grey lighten-2" primary-title>{{isEdit?'Edit':'Add'}}</v-card-title>
        <v-container>
          <div>
            <v-text-field label="Title" v-model="book.title"></v-text-field>
            <v-text-field label="Genre" v-model="book.genre"></v-text-field>
            <v-text-field label="Author" v-model="book.author"></v-text-field>
            <v-checkbox v-model="book.read" label="Read" data-vv-name="read" type="checkbox"></v-checkbox>
          </div>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="closeDialog">Close</v-btn>
          <v-btn color="primary" type="submit" @click.prevent="save()">Save</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    isOpen: { type: Boolean, required: true },
    isEdit: { type: Boolean, required: true }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("book", { book: "currentBook" })
  },
  methods: {
    ...mapActions("book", { updateBook: "update", saveBook: "save" }),
    closeDialog() {
      this.$emit("close");
    },
    save() {
      if (this.isEdit) {
        this.updateBook(this.book).then(() => {
          this.closeDialog();
        });
      } else {
        this.saveBook(this.book).then(() => {
          this.closeDialog();
        });
      }
    }
  }
};
</script>

<style>
</style>
