<script>
import { useBooksStore } from '../store/books';
import { useMessagesStore } from '../store/messages';
import { mapActions, mapState } from 'pinia';
import BookListItem from './BookListItem.vue';
import CartOff from 'vue-material-design-icons/CartOff.vue';
import Delete from 'vue-material-design-icons/Delete.vue';
import BookItem from './BookItem.vue';
import Check from 'vue-material-design-icons/Check.vue';
import CartPlus from 'vue-material-design-icons/CartPlus.vue';



export default {
  name: 'AppCart',
  data() {
    return {
      title: 'Carrito de la compra. Click List Items',
      selectedBook: null,
    };
  },
  components: {
    BookListItem,
    BookItem,
    CartOff,
    Check,
  },
  computed: {
    ...mapState(useBooksStore, ['cart']),
    lastCartBook() {
      return this.cart[this.cart.length - 1];
    },
    cartTotal() {
      return this.cart.reduce((acc, book) => acc + book.price, 0);
    },
  },
  methods: {
    // Mapeamos las acciones del store
    ...mapActions(useBooksStore, ['addBookToCart', 'removeBookFromCart', 'loadCart']),
    ...mapActions(useMessagesStore, ['pushMessageAction']),
    setSelectedBook(book) {
      this.selectedBook = book;
    },
    buy(){
      this.pushMessageAction('Compra realizada con éxito');
    },

  },
  created() {
    this.loadCart();
  },
};
</script>

<template>
  <div class="cart">
    <h2>{{ title }}</h2>
    <ul>
      <BookListItem @selected="setSelectedBook(book)" v-for="book in cart" :key="book.id" :book="book" :selected="true">

      </BookListItem>
      <li>
        <p>Total: {{ cartTotal }}</p>
      </li>
    </ul>
    <BookItem  v-if="selectedBook" :book="selectedBook">
      <div class="buttons">
        <button class="cart remove-cart" title="Eliminar del carrito">
          <cart-off @click="removeBookFromCart(selectedBook)"></cart-off>
        </button>
        <button class="cart add-cart" title="Añadir al carrito">
          <check @click="buy"></check>
        </button>
      </div>
    </BookItem>
    <BookItem v-else-if="lastCartBook"  :book="lastCartBook">
      <div class="buttons">
        <button class="cart remove-cart" title="Eliminar del carrito">
          <cart-off @click="removeBookFromCart(lastCartBook)"></cart-off>
        </button>
        <button class="cart add-cart" title="Añadir al carrito">
          <check @click="buy"></check>
        </button>
      </div>
    </BookItem>

  </div>
</template>

<style scoped>
.cart {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cart h2 {
  margin: 0;
  padding: 0;
  width: 100%;
}

.cart ul {
  list-style-type: none;
  padding: 0;
  width: 55%;
}

.card{
  width: 40%;
}

.buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}



</style>