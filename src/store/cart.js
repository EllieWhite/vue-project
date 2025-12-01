import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const basket = reactive([
        {
            id: 1,
            name: 'Blue Flower Print Crop Top',
            color: 'Yellow',
            size: 'M',
            price: 29.0,
            quantity: 2,
            imageUrl: './assets/crop-top.png',
        },
        {
            id: 2,
            name: 'Levender Hoodie',
            color: 'Levender',
            size: 'XXL',
            price: 119.0,
            quantity: 1,
            imageUrl: './assets/hoodie.png',
        },
        {
            id: 3,
            name: 'Black Sweatshirt',
            color: 'Black',
            size: 'XXL',
            price: 123.0,
            quantity: 1,
            imageUrl: './assets/sweatshirt.png',
        },
    ])

    const decreaseItemQuantity = (id) => {
        const item = basket.find(item => item.id === id)
        if (item && item.quantity > 1) {
            item.quantity--
        }
    }

    const increaseItemQuantity = (id) => {
        const item = basket.find(item => item.id === id)
        if (item) {
            item.quantity++
        }
    }

    const removeItem = (id) => {
        const itemIndex = basket.findIndex(item => item.id === id)
        if (itemIndex !== -1) {
            basket.splice(itemIndex, 1)
        }
    }

    const totalPrice = computed(() => {
        return basket.reduce((acc, item) => acc + item.price * item.quantity, 0)
    })
    

    return { decreaseItemQuantity, basket, increaseItemQuantity, removeItem, totalPrice }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
