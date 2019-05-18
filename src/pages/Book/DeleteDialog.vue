<template>
  <div>
    <v-dialog v-model="isOpen" max-width="700">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Delete</v-card-title>
        <v-container>
          <v-card-text>
            <h5>Are you sure to delete?</h5>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="default" @click="closeDialog">No</v-btn>
            <v-btn color="error" @click="deleteBook">Yes</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: { type: Boolean, required: true },
    item: { type: Object, required: true }
  },
  methods: {
    deleteBook() {
      this.$store.dispatch("book/delete", this.item.id).then(() => {
        this.closeDialog();
      });
    },
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>
