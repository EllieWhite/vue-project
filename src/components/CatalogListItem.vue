<script setup>
    import { inject } from 'vue'
    const { updateBasketAmount }= inject('amountInBasket')
</script>


<template>
    товар
        <button @click="updateBasketAmount">добавить в корзину</button>
</template>