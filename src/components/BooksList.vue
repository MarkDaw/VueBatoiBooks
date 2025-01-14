<script>
import BookItem from './BookItem.vue';
import Delete from 'vue-material-design-icons/Delete.vue'
import CartPlus from 'vue-material-design-icons/CartPlus.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'

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
    Delete,
    CartPlus,
    Pencil,
  },

};
</script>

<template>
  <div id="booksContainer">
    <BookItem v-for="(book, index) in books" :key="index" :book="book" @delete="$emit('delete-book', book)">
      <div>
        <button class="cart add-cart" title="Añadir al carrito">
          <cart-plus></cart-plus>
        </button>
        <button class="edit" title="Editar">
          <Pencil></Pencil>
        </button>
        <button class="delete" title="Eliminar" @click="remove">
          <delete></delete>
        </button>
      </div>
  </BookItem>
  </div>
</template>

<style scoped>
#booksContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>