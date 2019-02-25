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
import * as _ from "lodash";
export default {
  props: {
    isOpen: { type: Boolean, required: true },
    isEdit: { type: Boolean, required: true }
  },
  data() {
    return {};
  },
  computed: {
    book() {
      return _.cloneDeep(this.$store.state.book.selectedBook);
    }
  },
  methods: {
    ...mapActions("book", ["create", "update"]),
    closeDialog() {
      this.$emit("close");
    },
    save() {
      if (this.isEdit) {
        this.update(this.book).then(() => {
          this.closeDialog();
        });
      } else {
        this.create(this.book).then(() => {
          this.closeDialog();
        });
      }
    }
  }
};
</script>

<style>
</style>
