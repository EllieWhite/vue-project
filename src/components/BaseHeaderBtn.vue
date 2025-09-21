<script setup>
    import { inject } from 'vue'
    const { amountInBasket }= inject('amountInBasket')
</script>

<template>
    <button>перейти в корзину {{ amountInBasket }}</button>
</template>