import { defineStore } from 'pinia'
const SERVER = 'http://localhost:3000'

export const useCartStore = defineStore('useCartStore', {
  state: () => ({
    cart: [],
  }),
  getters:{
    cartTotal(){
      return this.cart.reduce((total, book) => total + book.price, 0)
    }
  },
  actions: {
    addBookToCart(book) {
      this.cart.push(book)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeBookFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    emptyCart(){
        this.cart = []
        localStorage.removeItem('cart')
    },
    loadCart(){
      if(localStorage.getItem('cart')){
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    }

  }
})
