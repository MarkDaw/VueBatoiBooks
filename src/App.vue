<script>
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import AddBook from './components/AddBook.vue';
import AppMenu from './components/AppMenu.vue';
import AppCart from './components/AppCart.vue';
import AppAbout from './components/AppAbout.vue';

import axios from 'axios';
import { store } from './store/index.js';

const SERVER = 'http://localhost:3000/';

export default {
  name: 'App',
  components: {
    AppMessages,
    BooksList,
    AddBook,
    AppMenu,
    AppCart,
    AppAbout,
  },
  data() {
    return {
      books: [],
    };
  },
  created() {
    this.fetchBooks();
  },
  computed: {
    total: {
      get() {
        return this.books.length;
      }
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get(SERVER + 'books');
        this.books = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBook(book) {
      const confirmed = confirm(`Are you sure you want to delete the book with ID: ${book.id} and Code: ${book.moduleCode}?`);
      if (!confirmed) {
        return;
      }
      try {
        await axios.delete(SERVER + 'books/' + book.id);
        this.books = this.books.filter((b) => b.id !== book.id);
        store.pushMessageAction({
          type: 'success',
          message: `Book deleted successfully: ${book.id}`,
        });
      } catch (error) {
        store.pushMessageAction({
          type: 'error',
          message: `Failed to delete the book: ${book.id}`,

        });
      }
    },
    async addBook(book) {
      console.log('addBook', book);
      try {
        await axios.post(SERVER + 'books', book);
        store.pushMessageAction({
          type: 'success',
          message: `Book added successfully: ${book.id}`,
        });

        this.books.push(book)
      } catch (error) {
        store.pushMessageAction({
          type: 'error',
          message: `Failed to add the book: ${book.id}`,
        });
      }
    },
    showEditForm(book) {
      store.pushMessageAction({
        type: 'info',
        message: `Editing book: ${book.id}... Not supported yet.`,
      });
    },
  },
};
</script>

<template>
  <AppMenu />

  <main>
    <AppMessages />
    <BooksList :books="books" @delete-book="deleteBook" @edit-book="showEditForm" />
    <div class="book-count">
      <p>Total Books: {{ total }}</p>
    </div>
    <AddBook @add-book="addBook" />
    <AppCart />
    <AppAbout />
  </main>

  <footer>
    <p>Developed with ❤️. Marc Mollá Lillo</p>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
}

main {
  padding-bottom: 200px;
  padding-top: 50px;
}

.book-count {
  text-align: center;
  margin: 20px 0;
}

p {
  margin: 0;
}
</style>
