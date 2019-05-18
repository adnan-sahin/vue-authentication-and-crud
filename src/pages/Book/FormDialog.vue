<template>
  <v-dialog v-model="isOpen" max-width="700">
    <v-card>
      <form>
        <v-card-title class="headline grey lighten-2" primary-title>{{isEdit?'Edit':'Add'}}</v-card-title>
        <v-container>
          <div>
            <v-text-field
              label="Title"
              v-model="item.title"
              name="title"
              v-validate="'required'"
              :error-messages="errors.collect('title')"
            ></v-text-field>
            <v-text-field
              label="Genre"
              v-model="item.genre"
              name="genre"
              v-validate="'required'"
              :error-messages="errors.collect('genre')"
            ></v-text-field>
            <v-text-field
              label="Author"
              v-model="item.author"
              name="author"
              v-validate="'required'"
              :error-messages="errors.collect('author')"
            ></v-text-field>
            <v-checkbox v-model="item.read" label="Read" name="read" type="checkbox"></v-checkbox>
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
    isEdit: { type: Boolean, required: true },
    item: { type: Object, required: true }
  },
  methods: {
    ...mapActions("book", ["create", "update"]),
    closeDialog() {
      this.$validator.reset();
      this.$emit("close");
    },
    save() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.isEdit) {
            this.update(this.item).then(() => {
              this.closeDialog();
            });
          } else {
            this.create(this.item).then(() => {
              this.closeDialog();
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
