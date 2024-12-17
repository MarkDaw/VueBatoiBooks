<script>
export default {
    name: 'BookItem',
    props: ['book'],
}
</script>

<template>
    <div class="book card">
        <img :src="book.photo ? book.photo : 'default.svg'" alt="Book photo">
        <h2>{{ book.moduleCode }}</h2>
        <p>Publisher: {{ book.publisher }}</p>
        <p>Price: ${{ book.price }}</p>
        <p>Pages: {{ book.pages }}</p>
        <p>Status: {{ book.status }}</p>
        <p v-if="book.comments">Comments: {{ book.comments }}</p>
        <p v-if="book.soldDate">Sold Date: {{ book.soldDate }}</p>
        <div class="bookButtons">
            <button @click="$emit('edit', book)">Edit</button>
            <button @click="$emit('delete', book)">Delete</button>
        </div>
    </div>
</template>

<style scoped>

.book {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 300px;
    box-shadow: 2px 2px 5px #ccc;
    background-color: var(--background-color);
    color: var(--text-color);
}

img {
    width: 100%;
    border-radius: 5px;
    background-color: var(--img-bg-color);
}

h2 {
    margin: 0;
    color: var(--text-color);
}

.bookButtons {
    display: flex;
    justify-content: space-around;
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    cursor: pointer;
}
</style>