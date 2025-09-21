<script setup>
  import { provide, ref } from 'vue';
  import BaseHeader from './components/BaseHeader.vue';
  import CatalogList from './components/CatalogList.vue';
  import BaseBtn from './components/BaseBtn.vue';

  const amountInBasket = ref(22)

  const updateBasketAmount = () => {
    amountInBasket.value++
  }

  provide('amountInBasket', {
    amountInBasket,
    updateBasketAmount
  })

</script>

<template>

  <BaseHeader/>
  <CatalogList />
  <BaseBtn />




</template>

<style src="./App.css"></style>
