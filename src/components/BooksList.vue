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
    cart: {
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
        <button v-if="(!cart.some(cartItem => cartItem.id === book.id))" class="cart add-cart"
          title="Añadir al carrito">
          <cart-plus @click="$emit('add-to-cart', book)"></cart-plus>
        </button>
        <button v-else disabled class="cart add-cart"
          title="Añadir al carrito">
          <cart-plus @click="$emit('add-to-cart', book)"></cart-plus>
        </button>
        <button class="edit" title="Editar">
          <Pencil @click="this.$router.push(`/edit-book/${book.id}`)"></Pencil>
        </button>
        <button class="delete" title="Eliminar" @click="remove">
          <delete @click="$emit('delete-book', book)"></delete>
        
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