<script setup>
import { computed, reactive } from 'vue';
  let image = 'test';


  const data = reactive({
    firstName: 'John',
    lastName: 'Dou'
  })

  const fullName = computed(() => data.firstName + " " +  data.lastName)





</script>

<template>
  <img :src="image" alt="">






  <h1>{{ fullName }}</h1>








</template>

<style src="./App.css"></style>
