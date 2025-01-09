<script>
import AppAbout from '@/components/AppAbout.vue';

const SERVER = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/';

export default {
  name: 'Home',
  components: {
    AppAbout,
  },
  
};
</script>

<template>
  <main>
    <AppAbout />
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