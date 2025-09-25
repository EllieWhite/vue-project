<script setup>

import { reactive, computed } from 'vue';
import BasketTable from './components/BasketTable.vue';
const basket = reactive([
    {
      id: 1,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      size: 'M',
      price: 29.00,
      quantity: 1,
      imageUrl: '../public/assets/crop-top.png',
    },

     {
      id: 2,
      name: 'Levender Hoodie',
      color: 'Levender',
      size: 'XXL',
      price: 119.00,
      quantity: 1,
      imageUrl: '../public/assets/hoodie.png',
    },

    {
      id: 3,
      name: 'Black Sweatshirt',
      color: 'Black',
      size: 'XXL',
      price: 123.80,
      quantity: 2,
      imageUrl: '../public/assets/sweatshirt.png',
    },
  ])


  const increaseItemQuantity = (item) => {
    item.quantity++;
  }

  const decreaseItemQuantity = (item) => {
    if(item.quantity > 1) {
      item.quantity--;
    }
  }

  const removeItem = (index) => {
    basket.splice(index, 1);
  }

  const calcSum = computed(() => {
   return basket.map(item => item.price * item.quantity); 
  });

  const totalSum = computed(() => {
    return calcSum.value.reduce((total, product) => total + product, 0).toFixed(2);
  })

  const totalTax = computed(() => {
    return((totalSum.value * 0.1).toFixed(2))
  })

  const emptyCheck = computed(() => basket.length === 0)
</script>

<template>
<div class="container basket">
      <BasketTable
        :basket="basket"
        @decreanse-item-quantity="decreaseItemQuantity"
        @increase-item-quantity="increaseItemQuantity"
        @remove-item="removeItem"
       :totalSum="totalSum"
       :totalTax="totalTax"
       :emptyCheck="emptyCheck"
      />
    </div>
</template>

<style src="./App.css"></style>
