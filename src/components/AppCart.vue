<script>
export default {
  name: 'AppCart',
  data() {
    return {
      title: 'Carrito de la compra',
      cart: [],
    };
  },
};
</script>

<template>
  <div class="cart">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        //logica de carrito. Un CartItem.vue que se encargue de mostrar los items del carrito
      </li>
    </ul>
  </div>
</template>

<style scoped>

.cart {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.cart h2 {
  margin: 0;
  padding: 0;
}

.cart ul {
  list-style-type: none;
  padding: 0;
}


</style>