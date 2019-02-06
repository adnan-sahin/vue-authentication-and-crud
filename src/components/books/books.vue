<template>
  <v-data-table :headers="headers" :items="books" class="elevation-1">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.genre }}</td>
      <td>{{ props.item.author }}</td>
      <td>{{ props.item.price }}</td>
      <td>{{ props.item.read }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Genre", value: "genre" },
        { text: "Author", value: "author" },
        { text: "Price", value: "price" },
        { text: "Read", value: "read" }
      ],
      books: [
        {
          title: "War and Peace",
          genre: "Historical Fiction",
          author: "Lev Nikolayevich Tolstoy",
          price: "10$",
          read: false
        },
        {
          title: "Les Misérables",
          genre: "Historical Fiction",
          author: "Victor Hugo",
          price: "30$",
          read: false
        },
        {
          title: "The Time Machine",
          genre: "Science Fiction",
          author: "H. G. Wells",
          price: "15$",
          read: false
        },
        {
          title: "A Journey into the Center of the Earth",
          genre: "Science Fiction",
          author: "Jules Verne",
          price: "14$",
          read: false
        },
        {
          title: "The Dark World",
          genre: "Fantasy",
          author: "Henry Kuttner",
          price: "30$",
          read: false
        },
        {
          title: "The Wind in the Willows",
          genre: "Fantasy",
          author: "Kenneth Grahame",
          price: "11$",
          read: false
        },
        {
          title: "Life On The Mississippi",
          genre: "History",
          author: "Mark Twain",
          price: "17$",
          read: false
        },
        {
          title: "Childhood",
          genre: "Biography",
          author: "Lev Nikolayevich Tolstoy",
          price: "13$",
          read: false
        }
      ]
    };
  }
};
</script>

<style <style scoped>
.elevation-1 {
  width: 90%;
  margin: 30px auto;
}
</style>


