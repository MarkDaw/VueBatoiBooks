<script>
import BooksList from '../components/BooksList.vue';

import { useBooksStore } from '../store/books';
import { useMessagesStore } from '../store/messages';
import { mapActions, mapState } from 'pinia';

const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/';

export default {
  name: 'Home',
  components: {
    BooksList,
  },
  computed: {
    // Obtenemos los libros directamente del store
    ...mapState(useBooksStore, ['books']),
    totalBooks() {
      return this.books.length; // Contamos los libros desde el estado del store
    },
  },
  created() {
    this.loadAllData();
  },
  methods: {
    // Mapeamos las acciones del store
    ...mapActions(useMessagesStore, ['pushMessageAction']),
    ...mapActions(useBooksStore, ['deleteBook', 'addBook', 'loadAllData', 'booksWithDescriptions']),
    
  },
};
</script>

<template>
  <main>
    <BooksList :books="this.books" @delete-book="deleteBook" />
    <div class="book-count">
      <p>Total Books: {{ total }}</p>
    </div>
  </main>
</template>

<style scoped>
main {
  padding-bottom: 70px;
  padding-top: 70px;
}

.book-count {
  text-align: center;
  margin: 20px 0;
}

p {
  margin: 0;
}
</style>