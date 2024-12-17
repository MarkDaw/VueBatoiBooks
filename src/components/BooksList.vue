<script>
import BookItem from './BookItem.vue';
import { store } from '../store/index.js';

export default {
  name: 'BooksList',
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  components: {
    BookItem,
  },
};
</script>

<template>
  <div id="booksContainer">
    <BookItem
      v-for="(book, index) in books"
      :key="index"
      :book="book"
      @edit="$emit('edit-book', book)"
      @delete="$emit('delete-book', book)"
    />
  </div>
</template>

<style scoped>
#booksContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>