<script>

export default {
    name: 'BookListItem',
    props: {
        book: {
            type: Object,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        }
    },


}
</script>
<template>
    <li @click="$emit('selected')" class="book">
        <div class="book-content">
            <img :src="book.photo ? book.photo : '/default.svg'" alt="Book photo">
            <div class="book-details">
                <h2>{{ book.moduleDescription }}</h2>
                <p>Price: ${{ book.price }}</p>
            </div>
        </div>
    </li>
</template>

<style scoped>
.book {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    background-color: var(--background-color);
    color: var(--text-color);
    cursor: pointer;
}

.book:hover{
    border-color: #9b9b9b;
}

.book-content {
    display: flex;
    align-items: center;
}

img {
    width: 150px;
    height: auto;
    border-radius: 5px;
    background-color: var(--img-bg-color);
    margin-right: 20px;
}

.book-details {
    flex: 1;
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
