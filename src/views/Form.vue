<script>
import AddBook from '../components/AddBook.vue';

const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/';

export default {
  name: 'Home',
  components: {
    AddBook,
  }

};
</script>

<template>
  <main>
    <AddBook :id="this.$route.params.id" />

  </main>
</template>

<style scoped>
main {
  padding-bottom: 70px;
  padding-top: 70px;
}

p {
  margin: 0;
}
</style>