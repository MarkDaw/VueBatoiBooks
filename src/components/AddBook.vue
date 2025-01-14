<template>
    <div class="add-book" v-if="!this.id">

        <h2>Add New Book</h2>
        <form @submit.prevent="addBook">
            <div>
                <label for="moduleCode">Module (Code):</label>
                <input readonly type="text" v-model="book.moduleCode" id="moduleCode" required />
            </div>
            <div>
                <label for="moduleCode">Module:</label>
                <select v-model="book.moduleCode" id="moduleCode">
                    <option value="" disabled selected>Select module code</option>
                    <option v-for="module in this.modulesCodeCliteral" :key="module.code" :value="module.code">
                        {{ module.cliteral }}
                    </option>
                </select>
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
                <select v-model="book.status" id="status" required ref="status">
                    <option value="" disabled selected>Select status</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="bad">Bad</option>
                </select>
            </div>
            <div>
                <label for="file">Upload Photo:</label>
                <input type="file" @change="handleFileUpload" id="file" ref="file" />
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
            <button type="reset" @click="resetForm">Reset</button>
        </form>
    </div>
    <div class="edit-book" v-else>

        <h2>Edit Book</h2>
        <form @submit.prevent="updateBook">
            <div>
                <label for="moduleCode">Module (Code):</label>
                <input readonly type="text" v-model="book.moduleCode" id="moduleCode" required />
            </div>
            <div>
                <label for="moduleCode">Module:</label>
                <select v-model="book.moduleCode" id="moduleCode">
                    <option value="" disabled selected>Select module code</option>
                    <option v-for="module in this.modulesCodeCliteral" :key="module.code" :value="module.code">
                        {{ module.cliteral }}
                    </option>
                </select>
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
                <select v-model="book.status" id="status" required ref="status">
                    <option value="" disabled>Select status</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="bad">Bad</option>
                </select>
            </div>
            <div>
                <label for="file">Upload Photo:</label>
                <input type="file" @change="handleFileUpload" id="file" ref="file" />
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
            <button type="submit">Update Book</button>
            <button type="reset" @click="fetchBook">Reset</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { useMessagesStore } from '../store/messages.js';
import { useBooksStore } from '../store/books.js';
import { mapActions } from 'pinia';
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

    computed: {
        modulesCodeCliteral() {
            const store = useBooksStore();
            return store.modulesCodeCliteral;
        },
        id() {
            return this.$route.params.id;
        }
    },
    async created() {
        await this.loadAllData();
        if (this.id) {
            this.fetchBook();
        }

    },
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    methods: {
        ...mapActions(useMessagesStore, ['pushMessageAction']),
        ...mapActions(useBooksStore, ['loadAllData']),
        async fetchBook() {
            try {
                const response = await axios.get(SERVER + `books/${this.id}`);
                this.book = response.data;
                if (this.book.photo) {
                    this.imgPreview = this.book.photo;
                } else {
                    this.imgPreview = '/default.svg';
                }

            } catch (error) {
                if (error.response.status === 404) {
                    this.pushMessageAction({
                        type: 'error',
                        message: `No se ha encontrado el libro con id: ${this.id}`,
                    });
                    this.$router.push('/');
                } else {
                    this.pushMessageAction({
                        type: 'error',
                        message: `Failed to fetch the book: ${this.id}. ${error}`,
                    });
                }
            }
        },
        validate() {
            console.log(this.book);
            if (!this.book.moduleCode || !this.book.publisher || !this.book.price || !this.book.pages || !this.book.status) {
                this.pushMessageAction({
                    type: 'error',
                    message: 'Please fill in all required fields.'
                });
                return false;
            }

            if (!this.modulesCodeCliteral.some(module => module.code === this.book.moduleCode)) {
                this.pushMessageAction({
                    type: 'error',
                    message: 'El modulo no existe.'
                });
                return false;
            }

            if (this.book.price <= 0 || this.book.pages <= 0) {
                this.pushMessageAction({
                    type: 'error',
                    message: 'Price and pages must be greater than 0.'
                });
                return false;
            }

            if (this.book.status !== 'new' && this.book.status !== 'used' && this.book.status !== 'bad') {
                this.pushMessageAction({
                    type: 'error',
                    message: 'Invalid status.'
                });
                return false;
            }



            return true;
        },
        async addBook() {
            this.setLastId()
                .then(async () => {
                    console.log(this.book);
                    if (!this.validate()) return;
                    console.log(this.book);

                    try {
                        await axios.post(SERVER + 'books', this.book);
                        this.pushMessageAction({
                            type: 'success',
                            message: `Book added successfully: ${this.book.id}`,
                        });

                    } catch (error) {
                        this.pushMessageAction({
                            type: 'error',
                            message: `Failed to add the book: ${this.book.id}. ${error}`,
                        });
                    }

                    this.$router.push(`/home/${this.book.id}`);
                }).catch(error => {
                    this.pushMessageAction({
                        type: 'error',
                        message: 'Failed to get the last ID.'
                    });
                });
        },
        async updateBook() {
            if (!this.validate()) return;

            try {
                await axios.put(SERVER + `books/${this.id}`, this.book);
                this.pushMessageAction({
                    type: 'success',
                    message: `Book updated successfully: ${this.book.id}`,
                });
                this.resetForm();
                this.$router.push(`/home/${this.id}`);
            } catch (error) {
                this.pushMessageAction({
                    type: 'error',
                    message: `Failed to update the book: ${this.book.id}. ${error}`,
                });
            }
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
            this.$refs.file.value = '';
            this.$refs.status.value = '';
        },
        async setLastId() {
            try {
                const response = await axios.get(SERVER + 'books');
                const ids = response.data.map(book => Number(book.id));
                this.book.id = (Math.max(...ids) + 1).toString();
            } catch (error) {
                this.pushMessageAction({
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
        },





    },
    watch: {
        id() {
            this.fetchBook();
        },
        $route(to, from) {
            this.resetForm();
        }
    }
};
</script>

<style scoped>
.add-book,
.edit-book {
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
input[readonly] {
    background-color: #f5f5f5;
    color: #4d4d4d;
    cursor: not-allowed;
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
    margin-right: 10px;
}

.preview {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
}
</style>