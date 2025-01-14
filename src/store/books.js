import { defineStore } from "pinia";
import axios from "axios";
import { useMessagesStore } from './messages';

const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:3000/";

export const useBooksStore = defineStore("useBooksStore", {
    state: () => ({
        books: [], // Asegúrate de que 'books' esté inicialmente como un array vacío.
        modules: [],
    }),
    getters: {
        booksByModule: (state) => (moduleCode) => {
            return state.books.filter((book) => book.moduleCode === moduleCode);
        },
        modulesCodeCliteral: (state) => {
            return state.modules.map((module) => ({
                code: module.code,
                cliteral: module.cliteral,
            }));
        },
    },
    actions: {
        async loadAllData() {
            const messagesStore = useMessagesStore();
            try {
                const [booksResponse, modulesResponse] = await Promise.all([
                    axios.get(`${SERVER}books`),
                    axios.get(`${SERVER}modules`),
                ]);

                this.modules = modulesResponse.data;

                booksResponse.data.forEach((book) => {
                    const module = this.modules.find(
                        (module) => module.code === book.moduleCode
                    );
                    book.moduleDescription = module ? module.cliteral : "No asignado";
                });

                this.books = booksResponse.data; // Asegúrate de que los libros se guardan correctamente en el estado
            } catch (error) {
                console.error("Error al cargar los datos:", error);
                messagesStore.pushMessageAction({ message: 'Error loading data', type: 'error' });
            }
        },
        async addBook(book) {
            const messagesStore = useMessagesStore();
            try {
                const response = await axios.post(`${SERVER}books`, book);
                this.books.push(response.data);
                messagesStore.pushMessageAction({ message: 'Book added successfully', type: 'success' });
            } catch (error) {
                console.error("Error al agregar el libro:", error);
                messagesStore.pushMessageAction({ message: 'Error adding book', type: 'error' });
            }
        },
        async deleteBook(book) {
            const messagesStore = useMessagesStore();
            try {
                await axios.delete(`${SERVER}books/${book.id}`);
                this.books = this.books.filter((b) => b.id !== book.id);
                messagesStore.pushMessageAction({ message: 'Book deleted successfully', type: 'success' });
            } catch (error) {
                console.error("Error al eliminar el libro:", error);
                messagesStore.pushMessageAction({ message: 'Error deleting book', type: 'error' });
            }
        },

        async updateBook(book) {
            const messagesStore = useMessagesStore();
            try {
                await axios.put(`${SERVER}books/${book.id}`, book);
                const index = this.books.findIndex((b) => b.id === book.id);
                this.books[index] = book;
                messagesStore.pushMessageAction({ message: 'Book updated successfully', type: 'success' });
            } catch (error) {
                console.error("Error al actualizar el libro:", error);
                messagesStore.pushMessageAction({ message: 'Error updating book', type: 'error' });
            }
        },
    },
});
