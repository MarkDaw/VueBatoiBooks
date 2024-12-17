<template>
    <div class="add-book">
        <h2>Add New Book</h2>
        <form @submit.prevent="addBook">
            <div>
                <label for="moduleCode">Module Code:</label>
                <input type="text" v-model="book.moduleCode" id="moduleCode" required />
            </div>
            <div>
                <label for="publisher">Publisher:</label>
                <input type="text" v-model="book.publisher" id="publisher" required />
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="number" step="0.01" min="0" v-model="book.price" id="price" required />
            </div>
            <div>
                <label for="pages">Pages:</label>
                <input type="number" step="1" v-model="book.pages" id="pages" required />
            </div>
            <div>
                <label for="status">Status:</label>
                <select v-model="book.status" id="status" required>
                    <option value="" disabled selected>Select status</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="bad">Bad</option>
                </select>
            </div>
            <div>
                <label for="file">Upload Photo:</label>
                <input type="file" @change="handleFileUpload" id="file" />
                <div v-if="imgPreview" class="preview">
                    <img :src="imgPreview" alt="Image Preview" style="max-width: 100%; height: auto;" />
                </div>
            </div>
            <div>
                <label for="comments">Comments:</label>
                <textarea v-model="book.comments" id="comments" rows="4"></textarea>
            </div>
            <div>
                <label for="soldDate">Sold Date:</label>
                <input type="date" v-model="book.soldDate" id="soldDate" />
            </div>
            <button type="submit">Add Book</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store/index.js';
const SERVER = 'http://localhost:3000/';

export default {
    name: 'AddBook',
    data() {
        return {
            book: {
                id: '',
                moduleCode: '',
                publisher: '',
                price: '',
                pages: '',
                status: '',
                photo: '',
                comments: '',
                soldDate: ''
            },
            imgPreview: '',
        };
    },
    methods: {
        validate() {
            console.log(this.book);
            if (!this.book.moduleCode || !this.book.publisher || !this.book.price || !this.book.pages || !this.book.status) {
                store.pushMessageAction({
                    type: 'error',
                    message: 'Please fill in all required fields.'
                });
                return false;
            }

            if (this.book.price <= 0 || this.book.pages <= 0) {
                store.pushMessageAction({
                    type: 'error',
                    message: 'Price and pages must be greater than 0.'
                });
                return false;
            }

            if (this.book.status !== 'new' && this.book.status !== 'used' && this.book.status !== 'bad') {
                store.pushMessageAction({
                    type: 'error',
                    message: 'Invalid status.'
                });
                return false;
            }



            return true;
        },
        async addBook() {
            this.setLastId()
                .then(() => {
                    console.log(this.book);
                    if (!this.validate()) return;
                    console.log(this.book);
                    this.$emit('add-book', this.book);
                    this.resetForm();
                }).catch(error => {
                    console.error(error);
                });
        },
        resetForm() {
            this.book = {
                id: '',
                moduleCode: '',
                publisher: '',
                price: '',
                pages: '',
                status: '',
                photo: '',
                comments: '',
                soldDate: ''
            };
            this.imgPreview = '';
        },
        async setLastId() {
            try {
                const response = await axios.get(SERVER + 'books');
                const ids = response.data.map(book => Number(book.id));
                this.book.id = (Math.max(...ids) + 1).toString();
            } catch (error) {
                store.pushMessageAction({
                    type: 'error',
                    message: 'Failed to get the last ID.'
                });
            }
        },
        // He utilizado este video como referencia. https://youtu.be/LPzG0PnOzgA?si=TnXpf5KbK9gZK6kM&t=2040
        // El único problema es que resulta algo sucio a la hora de guardar la información en el json-server. 
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.imgPreview = e.target.result;
                this.book.photo = e.target.result;
            };
            reader.readAsDataURL(file);
        }

    }
};
</script>

<style scoped>
.add-book {
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #ccc;
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: center;
}

form {
    max-width: 500px;
}

form div {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
select,
textarea {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

textarea {

    resize: vertical;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    cursor: pointer;
}

.preview {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
}
</style>